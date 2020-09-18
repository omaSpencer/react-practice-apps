import React, { Component } from 'react';
import Coin from './Coin';
import { choice } from './helpers';

class CoinContainer extends Component {
  static defaultProps = {
    coins: [
      {
        side: 'heads',
        imgSrc:
          'https://random-ize.com/coin-flip/us-dollar/us-dollar-coin-front.jpg',
      },
      {
        side: 'tails',
        imgSrc:
          'https://random-ize.com/coin-flip/us-dollar/us-dollar-coin-back.jpg',
      },
    ],
  };

  state = {
    currCoin: null,
    nFlips: 0,
    nHeads: 0,
    nTails: 0,
  };

  flipCoin() {
    const newCoin = choice(this.props.coins);

    this.setState((currState) => {
      return {
        currCoin: newCoin,
        nFlips: currState.nFlips + 1,
        nHeads: currState.nHeads + (newCoin.side === 'heads' ? 1 : 0),
        nTails: currState.nTails + (newCoin.side === 'tails' ? 1 : 0),
      };
    });
  }

  handleClick = (e) => {
    this.flipCoin();
  };

  render() {
    return (
      <div className="CoinContainer">
        <h2>Let's Flip A Coin!</h2>
        {this.state.currCoin && <Coin info={this.state.currCoin} />}
        <button onClick={this.handleClick}>Flipp A Coin!</button>
        <p>
          Out of {this.state.nFlips} flips, there have been {this.state.nHeads}{' '}
          and {this.state.nTails} tails.
        </p>
      </div>
    );
  }
}

export default CoinContainer;
