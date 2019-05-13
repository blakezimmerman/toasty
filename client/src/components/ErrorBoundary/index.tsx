import React from "react";
import { DefaultFallback } from "./DefaultFallback";

interface IProps {
  fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface IState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: undefined };
  }

  public static getDerivedStateFromError(error: Error): IState {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Call onError when an error is caught
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  public render() {
    if (this.state.error) {
      // Render a fallback UI
      if (this.props.fallback instanceof Function) {
        return this.props.fallback(this.state.error);
      } else if (this.props.fallback) {
        return this.props.fallback;
      } else {
        return <DefaultFallback />;
      }
    }

    // No errors. Business as usual
    return this.props.children;
  }
}
