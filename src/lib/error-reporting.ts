type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type CaptureHook = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: ErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __errorReporter?: CaptureHook;
  }
}

export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const hook = window.__errorReporter;
  if (hook?.captureException) {
    hook.captureException(
      error,
      {
        source: "react_error_boundary",
        route: window.location.pathname,
        ...context,
      },
      {
        mechanism: "react_error_boundary",
        handled: false,
        severity: "error",
      },
    );
    return;
  }
  // Fallback: log to console so nothing is silently swallowed.
  console.error("[error-reporting]", error, context);
}
