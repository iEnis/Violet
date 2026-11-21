import { readdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { BrowserView } from "electrobun/main";
import { extensionRPC } from "./rpc.gen";
import { isDev } from ".";
import path from "path";

import type { ExtensionType } from "../shared/extensions";
import type { AppRPC } from "../shared/rpc";

const extensionFilePath = path.join(process.env.LOCALAPPDATA!, "violet.atlic.net/extensions.json");
const extensionsJSFilesPath = path.join(process.env.LOCALAPPDATA!, "violet.atlic.net/canary/app/Resources/app/views/mainview/assets/");
const safeGetExtensions = () => (JSON.parse(readFileSync(extensionFilePath).toString() ?? "[]") ?? []) as ExtensionType[];
const rmFileSync = (id: string) => rmSync(path.join(extensionsJSFilesPath, id), { force: true });

export const rpc = BrowserView.defineRPC<AppRPC>({
    handlers: {
        requests: {
            ...extensionRPC.requests,
            native_getExtensions: async () => {
                try {
                    console.log(extensionFilePath);
                    if (!isDev) return safeGetExtensions();
                    const extensions: ExtensionType[] = [];
                    const mainPath = path.join(__dirname, "../mainview/extensions/");
                    const files = readdirSync(mainPath, { withFileTypes: true })
                        .filter((x) => x.isDirectory())
                        .map((x) => path.join(mainPath, x.name, "manifest"));
                    console.log(files);
                    for (const file of files) {
                        extensions.push((await import(file)).default);
                    }
                    return extensions;
                } catch {
                    return [] as ExtensionType[];
                }
            },
            native_installExtension: async ({ id }) => {
                if (isDev) return true;
                try {
                    const extensions = safeGetExtensions();
                    extensions.filter((x) => x.id);
                    return true;
                } catch {
                    return false;
                }
            },
            native_uninstallExtension: async ({ id }) => {
                if (isDev) return true;
                try {
                    writeFileSync(extensionFilePath, JSON.stringify(safeGetExtensions().filter((x) => x.id !== id)));
                    rmFileSync(id);
                    return true;
                } catch {
                    return false;
                }
            },
        },
        messages: {
            ...extensionRPC.messages,
        },
    },
});
