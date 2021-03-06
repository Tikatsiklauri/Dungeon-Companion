import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.demoLogin = this.demoLogin.bind(this);
    }


    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        // const user = Object.assign({}, this.state)
        this.props.login(this.state)
            .then(this.props.history.push('/profile'))
            .then(this.props.closeModal)
    }

    demoLogin(e){
        e.preventDefault();
        this.setState({username: 'DemoUser', password: 'testing'});
        setTimeout(() => this.props.login(this.state)
            .then(this.props.closeModal)
            .then(this.props.history.push('/profile')), 200)
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form className="loginForm" onSubmit={this.handleSubmit}>
                    <div className="loginField">
                        <div className="loginText">Sign In</div>
                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                            className="inputBox"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="inputBox"
                        />
                        <br />
                        <input className="submitButton" type="submit" value="Submit" />
                        <br />
                        <input className="demoButton" type="button" value="Demo Login" onClick={this.demoLogin}/>
                        {this.renderErrors()}
                        <div className="login" onClick={() => {this.props.signupForm()}}>
                            Not a member? Sign up!
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(LoginForm);