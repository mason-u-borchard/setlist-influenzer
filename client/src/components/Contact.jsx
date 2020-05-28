import React from 'react';
import styled from 'styled-components';


const ContactWrapper = styled.section`
background: yellow;
`;

const Contact = (props) => {
  console.log('props contact', props);
  return (
    <ContactWrapper>
      <h1>Contact</h1>
    </ContactWrapper>
  );
};
export default Contact;
