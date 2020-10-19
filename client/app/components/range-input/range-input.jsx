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
  // add type to set the state and know which button you pressed
  handleMouseDown(type) {
    this.setState({
      isMouseActive: true,
      type,
    });
  }

  handleMouseUp() {
    this.setState({
      isMouseActive: false,
      type: '',
    });
  }

  handleMouseMoveLeft(valueX) {
    this.setState({
      left: valueX,
    });
  }

  handleMouseMoveRight(valueX) {
    const width = window.innerWidth;

    this.setState({
      right: width - valueX,
    });
  }

  handleMouseMove(valueX) {
    const { isMouseActive, type } = this.state;
    // console.log(this.state);

    if (isMouseActive === true && type === 'left') {
      this.handleMouseMoveLeft(valueX);
    }

    if (isMouseActive === true && type === 'right') {
      this.handleMouseMoveRight(valueX);
    }
  }

  // Render
  // ===================================
  // add width to Bar
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
          onMouseUp={this.handleMouseUp}
          onMouseMove={(valueX) => this.handleMouseMove(valueX)}
        />
        <Toggle
          right={right}
          type="right"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={(valueX) => this.handleMouseMove(valueX)}
        />
      </div>
    );
  }
}

export default RangeInput;
