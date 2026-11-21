import type { ExtensionExport } from "../../../shared/extensions";
import AnimeTracker from "./routes";
import manifest from "./manifest";

export default {
    manifest,
    routes: {
        "/animeTracker": AnimeTracker,
    },
} satisfies ExtensionExport;
