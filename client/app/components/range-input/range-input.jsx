import React from 'react';
import Toggle from '../toggle';
import Bar from '../bar';
import Scale from '../scale';
import styles from './range-input.scss';

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

  // Events
  // ===================================

  getPercentage() {
    const { left, right } = this.state;
    const selectedWidth = 100 - (left + right);
    return selectedWidth;
  }

  getMagnetValue(percentage) {
    const { spaces } = this.props;
    const step = 100 / spaces;
    const rounded = (Math.round(percentage / step)) * step;

    return rounded;
  }

  calculatePercentage(value, width) {
    return (value * 100) / (width);
  }

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
    const { sticky } = this.props;
    const { width, left } = this.inputRangeRef.current.getBoundingClientRect();
    const value = event.clientX - left;
    const percentage = this.calculatePercentage(value, width);
    const magnetValue = this.getMagnetValue(percentage);

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
      left: newLeft,
      width: 100 - (newLeft + right),
    });
  }

  handleToggleRightMove(event) {
    const { left } = this.state;
    const { sticky } = this.props;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = (event.clientX - (bounds.left + bounds.width)) * -1;
    const percentage = this.calculatePercentage(value, bounds.width);
    const magnetValue = this.getMagnetValue(percentage);

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
      right: newRight,
      width: 100 - (newRight + left),
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
      left: newLeftPosition,
      right: newRightPosition,
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

    if (type !== 'bar') {
      this.handleToggleMove(event);
    }

    if (isMouseActive && type === 'bar') {
      this.handleBarMove(event);
    }

    const values = {
      left: Math.round(left),
      right: Math.round(right),
      percentage: Math.round(this.getPercentage()),
    };

    this.props.onChange(values);
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
    console.log(this.state);
    const { left, right, width } = this.state;
    const { spaces } = this.props;
    return (
      <div className={styles['range-input']} ref={this.inputRangeRef}>
        <Bar left={left} right={right} type="bar" width={width} onMouseDown={this.handleBarMouseDown} />
        <Toggle
          left={left}
          type="left"
          onMouseDown={this.handleMouseDown}
        />
        <Toggle
          right={right}
          type="right"
          onMouseDown={this.handleMouseDown}
        />
        <br />
        <Scale spaces={spaces} />
      </div>
    );
  }
}

export default RangeInput;
