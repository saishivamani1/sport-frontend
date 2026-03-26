import React, { Component } from 'react';
import Button from './Button';
import Card from './Card';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
        <div className="max-w-md w-full animate-fadeIn">
          <Card className="p-12 text-center space-y-8 border-red-500/20 shadow-2xl shadow-red-500/5">
            <div className="space-y-4">
               <span className="text-6xl block mb-6 animate-pulse">⚠️</span>
               <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                  Critical Exception
               </div>
               <h1 className="text-3xl font-bold text-white tracking-tight leading-tight uppercase">
                  Runtime Failure
               </h1>
               <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  An unexpected synchronization error occurred. The regional hub has been notified.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Button variant="secondary" className="flex-1" onClick={() => window.location.reload()}>
                  Reload State
               </Button>
               <Button className="flex-1" onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}>
                  Hub Origin
               </Button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 text-left bg-black border border-neutral-800 rounded-xl p-4 overflow-auto max-h-40">
                <code className="text-[10px] text-red-400 leading-tight block whitespace-pre-wrap font-mono uppercase font-bold">
                  {this.state.error.toString()}
                </code>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }
}
