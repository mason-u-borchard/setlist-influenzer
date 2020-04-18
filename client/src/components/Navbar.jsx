import React from "react";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentNav: 'Home'
    };
    // this.clicked = this.clicked.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     currentNav: 'Home'
  //   })
  // }

  clicked(that) {
      // The click handler will update the state with
      // the ind of the currentNav menu entry
      // console.log('e', e.target.className);
      // console.log('this.props', this.props)
      console.log('that', that)

      this.setState({
        navInd: that,
        currentNav: this.props.navItems[that]
      })
  }
  render() {
    var that = this;
      // Here we will read the navItems property, which was passed
      // as an attribute when the component was created
      // The map method will loop over the array of menu entries,
      // and will return a new array with <li> elements.
      return (
          <div>
              <ul>
                { this.props.navItems.map((item, i) => {
                    // Notice the use of the bind() method. It makes the
                    // ind available to the clicked function:
                    return <li className={item} key={i} onClick={this.clicked.bind(that, i)}>{item}</li>;
                  })
                }
              </ul>
              <p>Selected: {this.props.navItems[this.state.navInd]}</p>
          </div>
      );
  }
};

export default Navbar
