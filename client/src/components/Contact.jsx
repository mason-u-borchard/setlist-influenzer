import React from 'react';
import styled from 'styled-components';


const ContactWrapper = styled.section`
background: yellow;
`;

class Contact extends React.Component {



  render() {
    return (
      <ContactWrapper>
    <h1>Contact</h1>
    </ContactWrapper>
      )
  }
}
export default Contact