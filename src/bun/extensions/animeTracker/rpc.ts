import type { RPCHandler, ExtensionRPCType } from "../../../shared/rpc";

export default {
    requests: {
        animeTracker_fetchAnime({ id }: { id: string }) {
            return { name: "", seasons: "" };
        },
    },
    messages: {
        animeTracker_test: "test",
    },
} satisfies RPCHandler<RPCType>;

export type RPCType = ExtensionRPCType<
    "animeTracker",
    {
        requests: {
            animeTracker_fetchAnime: {
                params: { id: string };
                response: { name: string; seasons: string };
            };
        };
        messages: {
            animeTracker_test: string;
        };
    }
>;
