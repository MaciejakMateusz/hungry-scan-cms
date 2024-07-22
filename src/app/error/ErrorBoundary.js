import React, { Component } from 'react';
import {ErrorDialog} from "./ErrorDialog";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorDialog error={this.state.error} errorInfo={this.state.errorInfo} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;