import React from 'react';
import { Paper, Text } from '@mantine/core';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 可扩展：上报错误日志
    // console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper p="xl" radius="sm" withBorder>
          <Text c="red" ta="center" size="lg">
            出现了意外错误：{this.state.error?.message || '未知错误'}
          </Text>
        </Paper>
      );
    }
    return this.props.children;
  }
} 