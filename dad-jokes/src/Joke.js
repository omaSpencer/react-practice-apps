import React, { Component } from 'react';

import './Joke.css';

class Joke extends Component {
  getVoteDetails() {
    if (this.props.votes >= 15) {
      return { color: '#4caf50', icon: 'em em-rolling_on_the_floor_laughing' };
    } else if (this.props.votes >= 12) {
      return { color: '#8bc34a', icon: 'em em-laughing' };
    } else if (this.props.votes >= 9) {
      return { color: '#cddc39', icon: 'em em-smiley' };
    } else if (this.props.votes >= 6) {
      return { color: '#ffeb3b', icon: 'em em-slightly_smiling_face' };
    } else if (this.props.votes >= 3) {
      return { color: '#ffc107', icon: 'em em-neutral_face' };
    } else if (this.props.votes >= 0) {
      return { color: '#ff9800', icon: 'em em-confused' };
    } else {
      return { color: '#f44336', icon: 'em em-angry' };
    }
  }

  render() {
    const details = this.getVoteDetails();

    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upvote}></i>
          <span className="Joke-votes" style={{ borderColor: details.color }}>
            <span className="Joke-votes-text">{this.props.votes}</span>
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downvote}></i>
        </div>
        <div className="Joke-text">{this.props.text}</div>
        <div className="Joke-smiley">
          <i className={details.icon} />
        </div>
      </div>
    );
  }
}

export default Joke;
