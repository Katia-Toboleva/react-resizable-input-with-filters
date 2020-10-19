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
  //add type to set the state and know which button you pressed
  handleMouseDown() {
    this.setState({
      isMouseActive: true,
    });
  }

  handleMouseUp() {
    this.setState({
      isMouseActive: false,
    });
  }

  handleMouseMoveLeft(value) {
    this.setState({
      left: value,
    });
  }

  handleMouseMoveRight(value) {
    this.setState({
      right: value,
    });
  }

  handleMouseMove() {
    const { type } = this.props;

    const { isMouseActive } = this.state;

    if (isMouseActive === true && type === 'left') {
      this.handleMouseMoveLeft();
    }

    if (isMouseActive === true && type === 'right') {
      this.handleMouseMoveRight();
    }
  }

  // Render
  // ===================================
  // add width to Bar
  render() {
    console.log(this.state);
    const { left, right } = this.state;
    return (
      <div className={styles['range-input']}>
        <Bar left={left} right={right} />
        <Toggle
          type="left"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={(value) => this.handleMouseMoveLeft(value)}
        />
        <Toggle
          type="right"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={(value) => this.handleMouseMoveRight(value)}
        />
      </div>
    );
  }
}

export default RangeInput;
