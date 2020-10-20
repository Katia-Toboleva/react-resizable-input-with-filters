import React from 'react';
import Toggle from '../toggle';
import Bar from '../bar';
import styles from './range-input.scss';

class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseActive: false,
      type: '',
      left: 8,
      right: 8,
    };

    this.inputRangeRef = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  // componentDidMount() {
  //   const nodeRef = this.inputRangeRef.current;

  //   const className = styles['range-input'];

  //   window.setTimeout(() => {
  //     const node = document.querySelector(`.${className}`);

  //     console.dir(node);
  //   }, 1000);

  //   console.dir(nodeRef);
  // }

  // Events
  // ===================================

  getPercentage() {
    const { left, right } = this.state;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const selectedWidth = bounds.width - (left + right);

    return (selectedWidth * 100) / bounds.width;
  }

  calculatePercentage() {
    const { left, right } = this.state;
    const { width } = this.inputRangeRef.current.getBoundingClientRect();
    const selectedArea = width - ((left + right) - 16);

    const percentage = (selectedArea * 100) / width;

    return percentage;
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

    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMoveLeft(event) {
    const { right } = this.state;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = event.clientX - bounds.left;

    if (value <= 8 || value >= bounds.width - 20) {
      return;
    }

    if ((value + right + 16) >= bounds.width) {
      return;
    }

    this.setState({
      left: value,
    });
  }

  handleMouseMoveRight(event) {
    const { left } = this.state;
    const bounds = this.inputRangeRef.current.getBoundingClientRect();
    const value = (event.clientX - (bounds.left + bounds.width)) * -1;

    if (value <= 8 || value >= bounds.width - 20) {
      return;
    }

    if ((value + left + 16) >= bounds.width) {
      return;
    }

    this.setState({
      right: value,
    });
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

    const values = {
      left,
      right,
      percentage: this.getPercentage(),
    };

    this.props.onChange(values);
  }

  // Render
  // ===================================
  render() {
    // console.log(this.state);
    const { left, right } = this.state;
    return (
      <div className={styles['range-input']} ref={this.inputRangeRef}>
        <Bar left={left} right={right} />
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
      </div>
    );
  }
}

export default RangeInput;
