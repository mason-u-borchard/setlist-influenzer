import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  displayLogin(e) {
    e.preventDefault();
    console.log("You are logged in");
    console.log(this.state);
    this.setState({
      email: "",
      password: "",
      loggedIn: true,
    });
  }

  clickButton(e) {
    e.preventDefault();
    console.log("You are logged in");
    console.log(this.state);
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    return (
      <div className="auth">
        <form onSubmit={this.clickButton}>
          <h2>
            {this.state.loggedIn === true
              ? "Welcome Back, \n" + this.state.email + "!"
              : "Login To Your Account"}
          </h2>
          <div className="username">
            <input
              className="login"
              type="text"
              placeholder="Username..."
              value={this.state.email}
              onChange={this.update}
              name="email"
            />
          </div>

          <div className="auth">
            <p>
              <input
                className="login"
                type="password"
                placeholder="Password..."
                value={this.state.password}
                onChange={this.update}
                name="password"
              />
            </p>
          </div>

          <p>
            {/* <button
              id="login-redirect"
              onClick={() => this.loginWithRedirect()}
            >
              Log In
            </button> */}
            <input
              id="login-redirect"
              type="submit"
              value="Login"
              onClick={this.update}
            />
          </p>
          <p>
            <Link to="/register">
              <input
                className="mcButton"
                id="register-redirect"
                type="button"
                value="Create Account"
              />
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
