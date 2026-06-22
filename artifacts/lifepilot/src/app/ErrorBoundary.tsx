import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[LifePilot ErrorBoundary]", error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground"
        >
          <div className="max-w-md w-full text-center space-y-4">
            <div className="text-5xl" aria-hidden="true">✈️</div>
            <h1 className="text-2xl font-bold">Turbulence encountered</h1>
            <p className="text-muted-foreground">
              The app hit an unexpected error. Your data is safe — it's stored
              offline on this device.
            </p>
            {this.state.error && (
              <details className="text-left text-xs text-muted-foreground bg-muted rounded-lg p-3">
                <summary className="cursor-pointer font-medium">
                  Error details
                </summary>
                <pre className="mt-2 whitespace-pre-wrap break-all">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
              data-testid="button-error-reset"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
