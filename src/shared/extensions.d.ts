import type { ComponentType, JSX } from "react";

export type ExtensionType = Omit<ExtensionManifest, "description">;

export type ExtensionManifest = {
    id: string;
    name: string;
    version: string;
    description?: string;
};

export type ExtensionModule = {
    manifest: ExtensionManifest;
    routes?: Record<string, ComponentType>;
};

export type ExtensionLoader = () => Promise<ExtensionModule>;

export type Extension = {
    manifest: ExtensionManifest;
    load: ExtensionLoader;
};

export type ExtensionExport = {
    manifest: ExtensionManifest;
    routes: {
        [x: `/${string}`]: () => JSX.Element;
    };
};
