import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import _ from 'underscore';
import styled from "styled-components";

const noOfItems = 6;
const noOfCards = 1;
const autoPlayDelay = 2000;
const chevronWidth = 40;

// const CarouselWrapper = styled.div`
//   padding: 0 ${chevronWidth}px;
//   max-width: 1000px;
//   margin: 0 auto;
// `;

// const SlideItem = styled.div`
//   height: 500;
//   width: 800;
//   background: #EEE;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 20px;
//   font-weight: bold;
// `;



 class Carousel extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props carousel: ', this.props)
    this.state = {
      items: ['http://userserve-ak.last.fm/serve/50/342437.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/jrad1280x835.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/concert4.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/concert1.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/abgt2.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/concert3.jpg',
      'https://sdc-bucket-9999999.s3-us-west-1.amazonaws.com/concert4.jpg'
    ],
      activeItemIndex: 0

    }

    this.tick = this.tick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick () {
    this.setState(prevState => ({
      activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems-noOfCards + 1),
    }));
  }

  onChange(value){
    this.setState({ activeItemIndex: value });
  }

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;
    return (

        <ItemsCarousel
          gutter={10}
          numberOfCards={1}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={<button>{''}</button>}
          leftChevron={<button>{''}</button>}
          chevronWidth={chevronWidth}
          outsideChevron

        >
        {Array.from(new Array(7)).map((_, i) =>
  <div className = 'carousel-img'
    key={i}
    style={{
      height: 500,

      background: `url(${this.state.items[i]})` ||  `url(https://i.picsum.photos/id/63${Math.floor(Math.random() * 9)}/800/500.jpg)`
    }}
  />
)}
</ItemsCarousel>

    );
  }
}

export default Carousel;