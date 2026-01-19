export { Analytics } from "./analytics";
export type { AnalyticsConfig, EventPayload } from "./types";
export {
  generateUUID,
  getOrCreateClientId,
  getOrCreateSessionId,
} from "./utils";

// Default singleton instance for convenience
import { Analytics } from "./analytics";
export const analytics = new Analytics();
