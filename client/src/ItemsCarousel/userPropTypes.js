import PropTypes from 'prop-types';

export default {

  /**
   * Carousel react items.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,

  /**
   * Number of cards to show.
   */
  numberOfCards: PropTypes.number,

  /**
   * Space between carousel items.
   */
  gutter: PropTypes.number,

  /**
   * If true a slither of next item will be showed.
   */
  showSlither: PropTypes.bool,

  /**
   * If true first and last items will have twice the space
   */
  firstAndLastGutter: PropTypes.bool,

  /**
   * Enable placeholder items while data loads
   */
  enablePlaceholder: PropTypes.bool,

  /**
   * Placeholder item. Ignored if enablePlaceholder is false.
   */
  placeholderItem: PropTypes.element,

  /**
   * Number of placeholder items. Ignored if enablePlaceholder is false.
   */
  numberOfPlaceholderItems: PropTypes.number,

  /**
   * This is called when we want to change the active item.
   * Right now we will never call this unless a left or right chevrons are clicked.
   */
  requestToChangeActive: PropTypes.func.isRequired,

  /**
   * This gives you the control to change the current active item.
   */
  activeItemIndex: PropTypes.number.isRequired,

  /**
   * The active item position.
   */
  activePosition: PropTypes.oneOf([
    'left',
    'center',
    'right',
  ]),


  rightChevron: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),


  leftChevron: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),

  chevronWidth: PropTypes.number,

  outsideChevron: PropTypes.bool,


  alwaysShowChevrons: PropTypes.bool,


  slidesToScroll: PropTypes.number,


  disableSwipe: PropTypes.bool,

  springConfig: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    precision: PropTypes.number,
  }),

  onActiveStateChange: PropTypes.func,

  classes: PropTypes.shape({
    wrapper: PropTypes.string,
    itemsWrapper: PropTypes.string,
    itemsInnerWrapper: PropTypes.string,
    itemWrapper: PropTypes.string,
    rightChevronWrapper: PropTypes.string,
    leftChevronWrapper: PropTypes.string,
  }),

  infiniteLoop: PropTypes.bool,

  calculateActualTranslateX: PropTypes.func,
};
