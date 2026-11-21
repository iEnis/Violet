import type { RPCRequestsSchema, RPCMessagesSchema } from "../../.hutch/devkit/api/shared/rpc";
import type { ElectrobunRPCSchema } from "electrobun/view";
import type { ExtensionType } from "./extensions";

import type { ExtensionRPC as BunExtensionRPC } from "../bun/rpc.gen";
import type { ExtensionRPC as WebviewExtensionRPC } from "../mainview/lib/rpc.gen";

type DefineRPCSchema<T extends ElectrobunRPCSchema> = T;

export type ExtensionRPCTypeDeclaration = {
    requests?: RPCRequestsSchema;
    messages?: RPCMessagesSchema;
};

declare const rpcPrefix: unique symbol;

type EnforcePrefix<P extends string, T, Entry> = {
    [K in keyof T]: K extends `${P}_${string}` ? Entry : never; // `RPC "${K & string}" must be prefixed with "${P}_"`
};

export type PrefixedRPCTypeDeclaration<P extends string, T extends ExtensionRPCTypeDeclaration> = {
    requests?: EnforcePrefix<P, NonNullable<T["requests"]>, RPCRequestsSchema[string]>;
    messages?: EnforcePrefix<P, NonNullable<T["messages"]>, unknown>;
};

export type ExtensionRPCType<P extends string, T extends ExtensionRPCTypeDeclaration & PrefixedRPCTypeDeclaration<P, T>> = T & {
    readonly [rpcPrefix]: { prefix: P };
};

export type RPCHandler<T extends ExtensionRPCTypeDeclaration & { readonly [rpcPrefix]: { prefix: string } }> = {
    requests: {
        [K in keyof NonNullable<T["requests"]>]: NonNullable<T["requests"]>[K] extends { params: infer Params; response: infer Response }
            ? (params: Params) => Response | Promise<Response>
            : never;
    };
    messages: {
        [K in keyof NonNullable<T["messages"]>]: NonNullable<T["messages"]>[K];
    };
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
