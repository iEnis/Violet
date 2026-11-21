import type { RPCRequestsSchema } from "../../.hutch/devkit/api/shared/rpc";
import type { ElectrobunRPCSchema } from "electrobun/view";
import type { ExtensionType } from "./extensions";

import type { ExtensionRPC as BunExtensionRPC } from "../bun/rpc.gen";
import type { ExtensionRPC as WebviewExtensionRPC } from "../mainview/lib/rpc.gen";

type DefineRPCSchema<T extends ElectrobunRPCSchema> = T;

export type ExtensionRPCTypeDeclaration = {
    requests?: RPCRequestsSchema;
    messages?: RPCMessagesSchema;
};

export type ExtensionRPCType<T extends ExtensionRPCTypeDeclaration> = T;

export type RPCHandler<T extends ExtensionRPCTypeDeclaration> = {
    requests: {
        [K in keyof NonNullable<T["requests"]>]: (
            params: NonNullable<T["requests"]>[K]["params"],
        ) => NonNullable<T["requests"]>[K]["response"] | Promise<NonNullable<T["requests"]>[K]["response"]>;
    };
    messages: {};
};

export type AppRPC = DefineRPCSchema<{
    bun: {
        requests: NonNullable<
            BunExtensionRPC["requests"] & {
                native_getExtensions: {
                    params: undefined;
                    response: ExtensionType[];
                };
                native_installExtension: {
                    params: { id: string };
                    response: boolean;
                };
                native_uninstallExtension: {
                    params: { id: string };
                    response: boolean;
                };
            }
        >;
        messages: NonNullable<BunExtensionRPC["messages"] & {}>;
    };

    webview: {
        requests: NonNullable<WebviewExtensionRPC["requests"] & {}>;
        messages: NonNullable<WebviewExtensionRPC["messages"] & {}>;
    };
}>;
