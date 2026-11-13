import { Electroview } from "electrobun/view";
import type { AppRPC } from "../../shared/rpc";

export const rpc = Electroview.defineRPC<AppRPC>({
    handlers: {
        requests: {},
        messages: {},
    },
});

new Electroview({ rpc });
