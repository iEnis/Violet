import type { RPCHandler, ExtensionRPCType } from "../../../shared/rpc";

export default {
    requests: {
        animeTracker_fetchAnime({ id }) {
            return { name: "", seasons: "" };
        },
    },
    messages: {},
} satisfies RPCHandler<RPCType>;

export type RPCType = ExtensionRPCType<
    {
        requests: {
            fetchAnime: {
                params: { id: string };
                response: { name: string; seasons: string };
            };
        };
        messages: {};
    },
    "animeTracker"
>;
