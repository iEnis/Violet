import { readdirSync, writeFileSync } from "fs";
import { join, relative, sep } from "path";

function getFiles(dir: string): string[][] {
    return readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
            const path = join(dir, entry.name);

            return getAllFiles(path);
        });
}

function getAllFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);

        if (entry.isFile() && entry.name === "files.json") return [];
        return entry.isDirectory() ? getAllFiles(path) : [path];
    });
}

export default function generateExtensions() {
    const extensionPath = join(import.meta.dirname, "./src/mainview/extensions/");
    const extensions = getFiles(extensionPath);
    for (const extension of extensions) {
        const result = extension.map((x) => relative(extensionPath, x));
        const manifestPath = extension.find((x) => x.endsWith("manifest.ts"))!.replace("manifest.ts", "");
        writeFileSync(join(manifestPath, "files.json"), JSON.stringify(result));
        console.log(result);
    }
}
