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
      left: 0,
      right: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  // Events
  // ===================================

  componentDidMount() {
    window.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    window.addEventListener('mouseup', (event) => this.handleMouseUp(event));
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', (event) => this.handleMouseMove(event));
    window.addEventListener('mouseup', (event) => this.handleMouseUp(event));
  }

  handleMouseDown(type) {
    this.setState({
      isMouseActive: true,
      type,
    });
  }

  handleMouseUp(event) {
    const { type } = this.state;

    if (type === 'left') {
      this.setState({
        isMouseActive: false,
        type: '',
        left: event.offsetX,
      });
    }

    if (type === 'right') {
      this.setState({
        isMouseActive: false,
        type: '',
        right: event.offsetX,
      });
    }
  }

  handleMouseMoveLeft(event) {
    this.setState({
      left: event.offsetX,
    });
  }

  handleMouseMoveRight(event) {
    const width = window.innerWidth;

    this.setState({
      right: width - (event.offsetX),
    });
  }

  handleMouseMove(event) {
    const { isMouseActive, type } = this.state;

    if (isMouseActive === true && type === 'left') {
      this.handleMouseMoveLeft(event);
    }

    if (isMouseActive === true && type === 'right') {
      this.handleMouseMoveRight(event);
    }
  }

  // Render
  // ===================================
  render() {
    // console.log(this.state);
    const { left, right } = this.state;
    return (
      <div className={styles['range-input']}>
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
