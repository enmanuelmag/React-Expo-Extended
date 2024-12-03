import { Text, YStack } from 'tamagui';
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Logger } from '@utils/log';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Logger.error('Uncaught error:', error, errorInfo);

    this.setState({ hasError: true });
    //crashlytics().recordError(error, error.name);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <YStack className="cd-h-full cd-w-full" gap="$4" justifyContent="center" padding="$6">
          <Text className="cd-text-center cd-text-lg">Something went wrong</Text>
          <Text className="cd-text-center cd-text-base cd-text-gray-500">
            Our team has been notified, please restart the app
          </Text>
        </YStack>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
