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
      right: 0,
      width: 100,
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

  calculatePercentage(value, width) {
    return (value * 100) / (width);
  }

  handleMouseDown(type) {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
    });
  }

  handleMouseUp() {
    const { type } = this.state;

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
      });
    }

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMagnet(percentage) {
    const { spaces } = this.props;
    const step = 100 / spaces;
    const rounded = (Math.round(percentage / step)) * step;
    return rounded;
  }

  handleMouseMoveLeft(event) {
    const { right } = this.state;
    const { width, left } = this.inputRangeRef.current.getBoundingClientRect();
    const value = event.clientX - left;
    const percentage = this.calculatePercentage(value, width);
    const magnetValue = this.handleMagnet(percentage);

    if (percentage <= 0 || percentage > 100) {
      return;
    }

    if ((percentage + right) >= 100) {
      return;
    }

    this.setState({
      left: magnetValue,
      width: 100 - (magnetValue + right),
    });
  }

  handleMouseMoveRight(event) {
    const { left } = this.state;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = (event.clientX - (bounds.left + bounds.width)) * -1;
    const percentage = this.calculatePercentage(value, bounds.width);
    const magnetValue = this.handleMagnet(percentage);

    if (percentage <= 0 || percentage > 100) {
      return;
    }

    if ((percentage + left) >= 100) {
      return;
    }

    this.setState({
      right: magnetValue,
      width: 100 - (magnetValue + left),
    });
  }

  handleBarMove(event) {
    const { left, right, width } = this.state;
    const { spaces } = this.props;
    const step = 100 / spaces;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const rounded = (
      (Math.round(
        (((event.clientX - bounds.left) * 100) / bounds.width)
        / step,
      )) * step
    );

    if (left <= 0 || rounded <= 0) {
      this.setState({
        left: 0,
        right: 100 - width,
      });
    }

    if (right <= 0 || rounded <= 0) {
      this.setState({
        right: 0,
        left: 100 - width,
      });
    }

    this.setState(() => ({
      left: rounded - step,
      right: 100 - width - left,
    }));
  }

  handleMouseMove(event) {
    const {
      isMouseActive, type, left, right,
    } = this.state;

    if (isMouseActive && type === 'left') {
      this.handleMouseMoveLeft(event);
    }

    if (isMouseActive && type === 'right') {
      this.handleMouseMoveRight(event);
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
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState({
      isMouseActive: true,
      type,
    });
  }

  // Render
  // ===================================
  render() {
    // console.log(this.state);
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
