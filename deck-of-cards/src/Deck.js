import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';

import './Deck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor() {
    super();

    this.state = {
      deck: null,
      drawn: [],
      isLoading: false,
      gameOver: false,
    };

    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);

    this.setState({ deck: deck.data });
  }

  async getCard() {
    const deck_id = this.state.deck.deck_id;

    try {
      this.setState({ isLoading: true });

      const cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      const cardRes = await axios.get(cardUrl);

      if (!cardRes.data.success) {
        this.setState({ isLoading: false, gameOver: true });
        throw new Error('No card remaining');
      }

      const card = cardRes.data.cards[0];

      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} of ${card.value}`,
          },
        ],
        isLoading: false,
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map((c) => (
      <Card name={c.name} image={c.image} key={c.id} />
    ));

    let btnTitle;
    if (this.state.isLoading) {
      btnTitle = 'Loading...';
    } else if (this.state.gameOver) {
      btnTitle = 'Game Over';
    } else {
      btnTitle = 'Get Card';
    }

    return (
      <div className="Deck">
        <h1>
          <span role="img" aria-label="diamond">
            💎
          </span>{' '}
          Card Dealer{' '}
          <span role="img" aria-label="diamond">
            💎
          </span>
        </h1>
        <h2>
          <span role="img" aria-label="diamond">
            💎
          </span>{' '}
          A little demo made with React{' '}
          <span role="img" aria-label="diamond">
            💎
          </span>
        </h2>
        <button
          onClick={this.getCard}
          disabled={this.state.isLoading || this.state.gameOver}
        >
          {btnTitle}
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
