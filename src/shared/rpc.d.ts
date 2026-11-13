import type { ElectrobunRPCSchema } from "electrobun/view";
import type { ExtensionType } from "./extensions";

type DefineRPCSchema<T extends ElectrobunRPCSchema> = T;

export type AppRPC = DefineRPCSchema<{
    bun: {
        requests: {
            getExtensions: {
                params: undefined;
                response: ExtensionType[];
            };
            installExtension: {
                params: { id: string };
                response: boolean;
            };
            uninstallExtension: {
                params: { id: string };
                response: boolean;
            };
        };
        messages: {};
    };

    webview: {
        requests: {};
        messages: {};
    };
}>;
