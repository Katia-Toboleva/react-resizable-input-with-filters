import React from 'react';
import Toggle from '../toggle';
import Bar from '../bar';
import Scale from '../scale';
import Tooltip from '../tooltip';
import styles from './range-input.scss';

const getCoordinates = (props) => {
  const { minPrice, maxPrice, values } = props;

  if (!values) {
    return {};
  }

  const [left, right] = values;

  const fullRangeValue = maxPrice - minPrice;
  const leftPercent = ((left - minPrice) * 100) / fullRangeValue;
  const rightPercent = ((maxPrice - right) * 100) / fullRangeValue;
  const widthPercent = 100 - (leftPercent + rightPercent);

  return {
    left: leftPercent,
    right: rightPercent,
    width: widthPercent,
  };
};

const getMagnetValue = (percentage, spaces) => {
  const step = 100 / spaces;
  const magnetValue = (Math.round(percentage / step)) * step;

  return magnetValue;
};

const calculatePercentage = (value, width) => (value * 100) / (width);

class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseActive: false,
      type: '',
      left: 0,
      lastLeftPosition: 0,
      right: 0,
      width: 100,
      mouseDistance: 0,
    };

    this.inputRangeRef = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleBarMouseDown = this.handleBarMouseDown.bind(this);
  }

  // Lifecycle
  // // =====================================
  static getDerivedStateFromProps(props, state) {
    const { values, sticky, spaces } = props;
    const { left, right, width } = getCoordinates(props);

    const haveCoordinatesChanged = (
      left !== state.left ||
      right !== state.right
    );

    const newLeft = sticky ? getMagnetValue(left, spaces) : left;
    const newRight = sticky ? getMagnetValue(right, spaces) : right;
    const newWidth = sticky ? (100 - (newLeft + newRight)) : width;

    if (
      Array.isArray(values) &&
      values.length &&
      haveCoordinatesChanged &&
      !state.isMouseActive
    ) {
      return {
        left: newLeft,
        right: newRight,
        width: newWidth,
      };
    }

    return null;
  }

  // Events
  // ===================================

  handleMouseUp() {
    const { type, left } = this.state;

    if (type === 'left') {
      this.setState({
        isMouseActive: false,
        type: '',
      });
    }

    if (type === 'right') {
      this.setState({
        isMouseActive: false,
        type: '',
      });
    }

    if (type === 'bar') {
      this.setState({
        isMouseActive: false,
        type: '',
        mouseDistance: 0,
        lastLeftPosition: left,
      });
    }

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(type) {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
    });
  }

  handleToggleLeftMove(event) {
    const { right } = this.state;
    const { sticky, spaces } = this.props;
    const { width, left } = this.inputRangeRef.current.getBoundingClientRect();
    const value = event.clientX - left;
    const percentage = calculatePercentage(value, width);
    const magnetValue = getMagnetValue(percentage, spaces);

    const newLeft = sticky ? magnetValue : percentage;

    const isExceedingThresholds = (
      percentage < 0 ||
      percentage > 100 ||
      (percentage + right) > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    this.setState({
      left: Math.round(newLeft),
      width: Math.round(100 - (newLeft + right)),
    });
  }

  handleToggleRightMove(event) {
    const { left } = this.state;
    const { sticky, spaces } = this.props;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = (event.clientX - (bounds.left + bounds.width)) * -1;
    const percentage = calculatePercentage(value, bounds.width);
    const magnetValue = getMagnetValue(percentage, spaces);

    const newRight = sticky ? magnetValue : percentage;

    const isExceedingThresholds = (
      percentage < 0 ||
      percentage > 100 ||
      (percentage + left) > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    this.setState({
      right: Math.round(newRight),
      width: Math.round(100 - (newRight + left)),
    });
  }

  handleBarMove(event) {
    const { width, mouseDistance, lastLeftPosition } = this.state;
    const { spaces, sticky } = this.props;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const spaceWidth = 100 / spaces;
    const newMouseDistance = mouseDistance + event.movementX;
    const mouseDistanceInPercentage = (newMouseDistance / bounds.width) * 100;
    let newLeftPosition = lastLeftPosition + mouseDistanceInPercentage;
    let newRightPosition = 100 - width - newLeftPosition;

    const isExceedingThresholds = (
      newLeftPosition < 0 ||
      newRightPosition < 0 ||
      newLeftPosition + width > 100 ||
      newRightPosition + width > 100
    );

    if (isExceedingThresholds) {
      return;
    }

    if (sticky) {
      newLeftPosition = Math.round(newLeftPosition / spaceWidth) * spaceWidth;
      newRightPosition = Math.round(newRightPosition / spaceWidth) * spaceWidth;
    }

    this.setState({
      mouseDistance: newMouseDistance,
      left: Math.round(newLeftPosition),
      right: Math.round(newRightPosition),
    });
  }

  handleToggleMove(event) {
    const { type } = this.state;

    if (type === 'left') {
      this.handleToggleLeftMove(event);
    } else {
      this.handleToggleRightMove(event);
    }
  }

  handleMouseMove(event) {
    const {
      isMouseActive, type, left, right,
    } = this.state;
    const { onChange } = this.props;

    if (type !== 'bar') {
      this.handleToggleMove(event);
    }

    if (isMouseActive && type === 'bar') {
      this.handleBarMove(event);
    }

    const values = {
      left,
      right,
    };

    onChange(values);
  }

  handleBarMouseDown(type) {
    const { left } = this.state;
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
      mouseDistance: 0,
      lastLeftPosition: left,
    });
  }

  // Render
  // ===================================
  render() {
    // console.log('rendered state of Range:', this.state);

    const {
      left,
      right,
      width,
      isMouseActive,
      type,
    } = this.state;

    const {
      spaces,
      values,
    } = this.props;

    const [leftValue, rightValue] = values;

    return (
      <div className={styles['range-input-container']}>
        <div className={styles['range-input']} ref={this.inputRangeRef}>
          <Bar
            left={left}
            right={right}
            type="bar"
            width={width}
            onMouseDown={this.handleBarMouseDown}
          />

          <Toggle
            left={left}
            type="left"
            onMouseDown={this.handleMouseDown}
          >
            <Tooltip type="left" text={leftValue} active={isMouseActive && type !== 'right'} />
          </Toggle>

          <Toggle
            right={right}
            type="right"
            onMouseDown={this.handleMouseDown}
          >
            <Tooltip type="right" text={rightValue} active={isMouseActive && type !== 'left'} />
          </Toggle>
          <br />
          <Scale spaces={spaces} />
          <br />
        </div>
      </div>
    );
  }
}

export default RangeInput;
