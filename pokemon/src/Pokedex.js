import React, { Component } from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';

class Pokedex extends Component {
  render() {
    const { exp, pokemon, isWinner } = this.props;

    return (
      <div className="Pokedex">
        {isWinner && <h1 className="Pokedex-winner">Winning Hand</h1>}
        {!isWinner && <h1 className="Pokedex-loser">Losing Hand</h1>}
        <h4>Total Experience: {exp}</h4>
        <div className="Pokedex-cards">
          {pokemon.map((p) => (
            <Pokecard
              id={p.id}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Pokedex;
