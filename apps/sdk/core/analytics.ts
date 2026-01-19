import type { AnalyticsConfig, EventPayload } from "./types";
import {
  getOrCreateClientId,
  getOrCreateSessionId,
  extractPath,
} from "./utils";

// SDK metadata
const SDK_NAME = "@ga4-clone/sdk";
const SDK_VERSION = "0.1.0";

/**
 * Analytics SDK for tracking user events
 *
 * @example
 * ```typescript
 * const analytics = new Analytics()
 * analytics.init({
 *   endpoint: 'https://api.example.com/events',
 *   projectId: '123e4567-e89b-12d3-a456-426614174000'
 * })
 *
 * analytics.track('page_view', { page: '/home', title: 'Home Page' })
 * ```
 */
export class Analytics {
  private config: AnalyticsConfig | null = null;
  private initialized = false;
  private clientId: string | null = null;
  private sessionId: string | null = null;

  /**
   * Initialize the analytics SDK with configuration
   * @param options - Configuration options
   * @throws Error if endpoint or projectId is not provided
   */
  public init(options: AnalyticsConfig): void {
    if (!options.endpoint) {
      throw new Error("Analytics: endpoint is required");
    }

    if (!options.projectId) {
      throw new Error("Analytics: projectId is required");
    }

    this.config = {
      endpoint: options.endpoint,
      projectId: options.projectId,
    };

    // Initialize client and session IDs
    this.clientId = getOrCreateClientId();
    this.sessionId = getOrCreateSessionId();

    this.initialized = true;
  }

  /**
   * Track an analytics event
   * @param eventName - Event name/type
   * @param params - Custom event parameters (optional)
   */
  public track(eventName: string, params: Record<string, any> = {}): void {
    if (!this.initialized || !this.config) {
      console.warn("Analytics: SDK not initialized. Call init() first.");
      return;
    }

    const payload = this.buildPayload(eventName, params);
    this.send(payload);
  }

  /**
   * Build the complete event payload matching backend schema
   * @param eventName - Event name
   * @param params - Custom event parameters
   * @returns Complete event payload
   */
  private buildPayload(
    eventName: string,
    params: Record<string, any>,
  ): EventPayload {
    const url = window.location.href;
    const referrer = document.referrer;

    return {
      projectId: this.config!.projectId,
      eventName,
      timestamp: Date.now(), // Unix timestamp in milliseconds
      clientId: this.clientId!,
      sessionId: this.sessionId!,
      path: extractPath(url),
      referrer: referrer || undefined,
      params: Object.keys(params).length > 0 ? params : undefined,
      sdkName: SDK_NAME,
      sdkVersion: SDK_VERSION,
    };
  }

  /**
   * Send the event payload to the analytics backend
   * Uses sendBeacon API when available for better performance
   * @param payload - Event payload to send
   */
  private send(payload: EventPayload): void {
    if (!this.config) {
      return;
    }

    const body = JSON.stringify(payload);

    // Prefer sendBeacon for non-blocking, reliable delivery
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(this.config.endpoint, blob);
      return;
    }

    // Fallback to fetch API
    this.sendViaFetch(body);
  }

  /**
   * Send event using fetch API as fallback
   * @param body - Stringified JSON payload
   */
  private async sendViaFetch(body: string): Promise<void> {
    if (!this.config) {
      return;
    }

    try {
      await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        keepalive: true, // Keep request alive even if page unloads
      });
    } catch (error) {
      // Fail silently in production to avoid disrupting user experience
      if (process.env.NODE_ENV === "development") {
        console.error("Analytics: Failed to send event", error);
      }
    }
  }

  /**
   * Check if the SDK is initialized
   * @returns true if initialized
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get current configuration
   * @returns Current configuration
   */
  public getConfig(): AnalyticsConfig | null {
    if (!this.config) {
      return null;
    }

    return {
      endpoint: this.config.endpoint,
      projectId: this.config.projectId,
    };
  }

  /**
   * Get the current client ID
   * @returns Client ID or null if not initialized
   */
  public getClientId(): string | null {
    return this.clientId;
  }

  /**
   * Get the current session ID
   * @returns Session ID or null if not initialized
   */
  public getSessionId(): string | null {
    return this.sessionId;
  }
}
