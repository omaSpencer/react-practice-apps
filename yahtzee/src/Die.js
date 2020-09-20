import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
  static defaultProps = {
    numberWords: ['one', 'two', 'three', 'four', 'five', 'six'],
  };

  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };

  render() {
    const { locked, val, numberWords, disabled, rolling } = this.props;

    let classes = `Die${' '}`;
    if (locked) classes += 'Die-locked';
    if (rolling) classes += 'Die-rolling';

    return (
      <button
        className={classes}
        onClick={this.handleClick}
        disabled={disabled}
      >
        <i
          className={`fas fa-dice-${numberWords[val - 1]} fa-5x`}
          style={{ color: 'white' }}
        ></i>
      </button>
    );
  }
}

export default Die;
