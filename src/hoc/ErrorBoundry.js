import React, { Component } from "react";

class ErrorBoundry extends Component {
    state = {
        hasError: false,
        error: null
    }

    static getDerivedStateFromError(error) {
        return {hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Error boundry');
        console.log(error);
        console.log('Error info');
        console.log(errorInfo);
    }
    render() {
        if(this.state.hasError) {
            return <div className="alert alert-danger">Coś poszło nie tak: { this.state.error.toString() }</div>
        }

        return this.props.children
    }
}

export default ErrorBoundry;