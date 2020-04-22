import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fullname: '',
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
		console.log('You have successfully registered');
		console.log(this.state);
		this.setState({
			fullname: '',
			email: '',
			password: ''
		});
	}

	render() {
		return (
			<div className="auth">
				<form onSubmit={this.displayLogin}>
					<h2>Register</h2>

					<p>
						<input className="login"
							type="text"
							placeholder="Full Name"
							name="fullname"
							value={this.state.fullname}
							onChange={this.update}
						/>
					</p>

					<div className="email">
						<input className="login"
							type="text"
							placeholder="Enter your email"
							name="email"
							value={this.state.email}
							onChange={this.update}
						/>
					</div>


          <p>
						<input
            className="login"
							type="password"
							placeholder="Password"
							name="password"
							value={this.state.password}
							onChange={this.update}
						/>
            </p>


            <p>
						<input className="login" type="password" placeholder="Confirm Password" name="password1" />
            </p>
          <Link  to="/" ><input id="register-redirect" type="submit" value="Create Account" /></Link>
				</form>


			</div>
		);
	}
}

export default Register;