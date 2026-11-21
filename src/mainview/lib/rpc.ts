import { Electroview } from "electrobun/view";
import type { AppRPC } from "../../shared/rpc";
import { extensionRPC } from "./rpc.gen";

export const rpc = Electroview.defineRPC<AppRPC>({
    handlers: {
        requests: {
            ...extensionRPC.requests,
        },
        messages: {
            ...extensionRPC.messages,
        },
    },
});

new Electroview({ rpc });
