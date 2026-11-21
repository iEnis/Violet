import type { RPCRequestsSchema } from "../../.hutch/devkit/api/shared/rpc";
import type { ElectrobunRPCSchema } from "electrobun/view";
import type { ExtensionType } from "./extensions";

type DefineRPCSchema<T extends ElectrobunRPCSchema> = T;

export type PrefixRPC<T, Prefix extends string> = {
    requests: {
        [K in keyof NonNullable<T["requests"]> as `${Prefix}_${string & K}`]: NonNullable<T["requests"]>[K];
    };
    messages: {
        [K in keyof NonNullable<T["messages"]> as `${Prefix}_${string & K}`]: NonNullable<T["messages"]>[K];
    };
};

export type ExtensionRPCTypeDeclaration = {
    requests?: RPCRequestsSchema;
    messages?: RPCMessagesSchema;
};

export type ExtensionRPCType<T extends ExtensionRPCTypeDeclaration, Prefix extends string> = PrefixRPC<T, Prefix>;

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
