import React from 'react';


import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.update = this.update.bind(this);

		this.displayLogin = this.displayLogin.bind(this);
	}

	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	displayLogin(e) {
		e.preventDefault();
		console.log('You are logged in');
		console.log(this.state);
		this.setState({
			email: '',
			password: ''
		});
	}

	render() {
		return (
			<div className="auth">
				<form onSubmit={this.displayLogin}>
					<h2>Login to your account</h2>
					<div className="username">
						<input className="login"
							type="text"
							placeholder="Username..."
							value={this.state.email}
							onChange={this.update}
							name="email"
						/>
					</div>

					<div className="auth">
						<p><input className="login"
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
            </p>

					</div>


          <p>
          <input id="login-redirect" type="submit" value="Login" />
          </p>
          <p>
          <Link to="/register"><input className="mcButton" id="register-redirect" type="button" value="Create Account" /></Link>
          </p>
				</form>


			</div>
		);
	}
}

export default Login;