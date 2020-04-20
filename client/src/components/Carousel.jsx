import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import _ from 'underscore';
import styled from "styled-components";

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 2000;
const chevronWidth = 40;

const CarouselWrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 200px;
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;



 class Carousel extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props carousel: ', this.props)
    this.state = {
      items: [ 'https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/447/300/300.jpg', 'https://i.picsum.photos/id/446/180/300.jpg',
      'https://i.picsum.photos/id/757/180/300.jpg',
      'https://i.picsum.photos/id/767/300/300.jpg',
      'https://i.picsum.photos/id/334/180/300.jpg',
      'https://i.picsum.photos/id/791/180/300.jpg',
      'https://i.picsum.photos/id/730/180/300.jpg',
      'https://i.picsum.photos/id/731/180/300.jpg', 'https://i.picsum.photos/id/367/180/300.jpg',
      'https://i.picsum.photos/id/366/180/300.jpg',
      'https://i.picsum.photos/id/336/300/300.jpg',
      'https://i.picsum.photos/id/382/180/300.jpg',
      'https://i.picsum.photos/id/182/180/300.jpg'
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
      <CarouselWrapper>
        <ItemsCarousel
          gutter={12}
          numberOfCards={noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={<button>{'>'}</button>}
          leftChevron={<button>{'<'}</button>}
          chevronWidth={chevronWidth}
          outsideChevron

        >
        {Array.from(new Array(14)).map((_, i) =>
  <div className = 'carousel-img'
    key={i}
    style={{
      height: 300,
      width: 180,
      background: `url(${this.state.items[i]})` || `url(https://i.picsum.photos/id/63${Math.floor(Math.random() * 9)}/180/300.jpg)`
    }}
  />
)}
</ItemsCarousel>
      </CarouselWrapper>
    );
  }
}

export default Carousel;