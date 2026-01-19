/**
 * Configuration options for initializing the Analytics SDK
 */
export interface AnalyticsConfig {
  /** API endpoint URL for sending analytics events */
  endpoint: string;
  /** Project ID (UUID) - Required for tracking */
  projectId: string;
}

/**
 * Event payload structure sent to the analytics backend
 * Matches the backend Event schema
 */
export interface EventPayload {
  /** Project ID (UUID) */
  projectId: string;
  /** Optional event ID (UUID) - auto-generated if not provided */
  eventId?: string;
  /** Event name/type */
  eventName: string;
  /** Unix timestamp in milliseconds */
  timestamp: number;
  /** Client ID - persistent identifier for the user */
  clientId: string;
  /** Session ID - identifier for the current session */
  sessionId: string;
  /** Current page path */
  path?: string;
  /** Referrer URL */
  referrer?: string;
  /** Custom event parameters/data */
  params?: Record<string, any>;
  /** SDK name identifier */
  sdkName?: string;
  /** SDK version */
  sdkVersion?: string;
}
