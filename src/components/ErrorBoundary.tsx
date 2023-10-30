import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<
  Record<string, ReactNode>,
  { hasError: boolean }
> {
  constructor(props: Record<string, ReactNode>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Wrong access!</h1>
          <h1>(or any other Error)</h1>
          <h2>Insert your officer code cylinder to prove your identity</h2>
          <h2> and download data!</h2>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
