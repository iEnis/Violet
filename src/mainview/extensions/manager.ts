import type { Extension, ExtensionModule } from "../../shared/extensions";
import { registry } from "./registry";
import { rpc } from "../lib/rpc";

const installed = new Map<string, Extension>();
const loaded = new Map<string, ExtensionModule>();

export async function loadAllExtensions() {
    const installedIds = (await rpc.request.native_getExtensions()).map((x) => x.id);

    await Promise.all(installedIds.map((id) => installExtension(id)));
}

export async function installExtension(id: string, install = false) {
    if (install) await rpc.request.native_installExtension({ id });

    const path = `./${id}/index.tsx`;
    const loader = registry[path];

    if (!loader) {
        throw new Error(`Extension "${id}" does not exist`);
    }

    const module = await loader();

    installed.set(id, {
        manifest: module.manifest,
        load: loader,
    });

    return module.manifest;
}

export async function uninstallExtension(id: string) {
    installed.delete(id);
    loaded.delete(id);
    await rpc.request.native_uninstallExtension({ id });
}

export async function loadExtension(id: string) {
    if (!installed.has(id)) {
        throw new Error(`Extension "${id}" is not installed`);
    }

    if (loaded.has(id)) {
        return loaded.get(id)!;
    }

    const module = await installed.get(id)!.load();

    loaded.set(id, module);

    return module;
}

export function getInstalledExtensions() {
    return [...installed.values()].map((extension) => extension.manifest);
}

export async function getExtension(id: string) {
    if (!installed.has(id)) return null;

    return loadExtension(id);
}
