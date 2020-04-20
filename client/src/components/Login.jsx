import React from 'react';
import styled from 'styled-components';


const LoginWrapper = styled.section`
background: yellow;
`;

class Login extends React.Component {



  render() {
    return (
      <LoginWrapper>
    <h1>Login</h1>
    </LoginWrapper>
      )
  }
}
export default Login