import * as React from 'react';

interface LoginComponentProps {
    heading: string;
}

class LoginComponent extends React.Component<LoginComponentProps> {
    props: { heading: string };
    render() {
        return (
            <div>
                <h2>{this.props.heading}</h2>
            </div>
        );
    }
}

export default LoginComponent;
