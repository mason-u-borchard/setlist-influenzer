import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import _ from 'underscore';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['https://i.picsum.photos/id/737/180/300.jpg', 'https://i.picsum.photos/id/447/300/300.jpg', 'https://i.picsum.photos/id/446/180/300.jpg',
      'https://i.picsum.photos/id/757/180/300.jpg',
      'https://i.picsum.photos/id/767/300/300.jpg',
      'https://i.picsum.photos/id/334/180/300.jpg',
      'https://i.picsum.photos/id/791/180/300.jpg',
      'https://i.picsum.photos/id/730/180/300.jpg',
      'https://i.picsum.photos/id/731/180/300.jpg', 'https://i.picsum.photos/id/367/180/300.jpg',
      'https://i.picsum.photos/id/366/180/300.jpg',
      'https://i.picsum.photos/id/336/300/300.jpg',
      'https://i.picsum.photos/id/382/180/300.jpg',
      'https://i.picsum.photos/id/182/180/300.jpg'],
      activeItemIndex: 0

    }

    this.changeActiveItem = this.changeActiveItem.bind(this)
  }


//   UNSAFE_componentWillMount() {
//     axios.get(`/carousels/${this.props.id}`).then((data) => {
//       this.setState({
//         items: data.data[0].image,
//         activeItemIndex: 0
//       })
//       }).catch(err => console.log(err));

// }


  changeActiveItem(activeItem){
    this.setState({ activeItemIndex: activeItem });
  }



  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
      <div className="contents" style={{
        width: '650px'
      }}>
        <ItemsCarousel

    enablePlaceholder={false}
    numberOfPlaceholderItems={3}
    numberOfCars={3.5}
    infiniteLoop={false}
    gutter={1}
    activePosition={'center'}
    chevronWidth={35}
    disableSwipe={false}
    alwaysShowChevrons={false}
    numberOfCards={3}
    slidesToScroll={1}
    outsideChevron={true}
    showSlither={true}
    firstAndLastGutter={false}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<div className="chevron-arrow-right"></div>}
    leftChevron={<div className="chevron-arrow-left"></div>}
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
      </div>
    );
  }
}

export default Carousel;