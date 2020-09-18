import React, { Component } from 'react';
import { choice } from './helpers';
import './Box.css';

class Box extends Component {
  state = {
    color: choice(this.props.colors),
  };

  pickColor() {
    let newColor;

    do {
      newColor = choice(this.props.colors);
    } while (newColor === this.state.color);

    this.setState({ color: newColor });
  }

  handleClick = () => {
    this.pickColor();
  };

  render() {
    return (
      <div
        className="Box"
        onClick={this.handleClick}
        style={{ backgroundColor: this.state.color }}
      >
        {this.state.color}
      </div>
    );
  }
}

export default Box;
