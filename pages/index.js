import React, { Component } from 'react';
import Modes from '../components/Modes';
import Challenge from '../components/Challenge';
import HandList from '../components/HandList';
import Result from '../components/Result';

const hands = {
  rock: {
    wins: ['scissors'],
  },
  paper: {
    wins: ['rock'],
  },
  scissors: {
    wins: ['paper'],
  },
};

const modes = {
  vs: {
    label: 'PLAYER VS COMPUTER',
    player1Label: 'PLAYER',
    player2Label: 'COMPUTER',
  },
  simulate: {
    label: 'PLAYER VS PLAYER',
    player1Label: 'PLAYER 1',
    player2Label: 'PLAYER 2',
  },
};

const modeKeys = Object.keys(modes);
const handKeys = Object.keys(hands);

export const getRandomHand = () => {
  return handKeys[(handKeys.length * Math.random()) << 0];
};

export const getWinner = (hand1, hand2) => {
  if (hand1 === hand2) return 0;
  return hands[hand1].wins.some((wins) => wins === hand2) ? 1 : 2;
};

const initialState = {
  mode: modeKeys[0],
  player1: {
    loading: false,
    hand: null,
    score: 0,
  },
  player2: {
    loading: false,
    hand: null,
    score: 0,
  },
  winner: null,
};

class Game extends Component {
  state = initialState;

  play(hand) {
    const hand1 = hand || getRandomHand();
    const hand2 = getRandomHand();
    const simulateMode = this.state.mode === modeKeys[1];

    this.setState({
      player1: {
        ...this.state.player1,
        hand: hand1,
        ...(simulateMode ? { loading: true } : {}),
      },
      player2: {
        ...this.state.player2,
        hand: hand2,
        loading: true,
      },
    });

    setTimeout(() => {
      this.setResult();
    }, 500 + Math.random() * 500);
  }

  setResult() {
    const winner = getWinner(this.state.player1.hand, this.state.player2.hand);

    this.setState({
      player1: {
        ...this.state.player1,
        ...(winner === 1 ? { score: this.state.player1.score + 1 } : {}),
        loading: false,
      },
      player2: {
        ...this.state.player2,
        ...(winner === 2 ? { score: this.state.player2.score + 1 } : {}),
        loading: false,
      },
      winner,
    });
  }

  restart() {
    this.setState({
      player1: {
        ...this.state.player1,
        hand: initialState.player1.hand,
      },
      player2: {
        ...this.state.player2,
        hand: initialState.player2.hand,
      },
      winner: initialState.winner,
    });
  }

  reset() {
    this.setState(initialState);
  }

  toggleMode() {
    const mode = this.state.mode;
    this.reset();
    this.setState({ mode: mode === modeKeys[0] ? modeKeys[1] : modeKeys[0] });
  }

  render() {
    const { player1Label, player2Label } = modes[this.state.mode];
    const loading = this.state.player1.loading || this.state.player2.loading;
    return (
      <div className="Game">
        <h1>ROCK-PAPER-SCISSORS GAME</h1>

        <div className="modes">
          <Modes
            onClickMode={() => this.toggleMode()}
            label={modes[this.state.mode].label}
          />
        </div>

        <div className="challenge">
          <Challenge
            player1={{ ...this.state.player1, label: player1Label }}
            player2={{ ...this.state.player2, label: player2Label }}
          />
        </div>

        <div className="footer">
          {this.state.winner === null &&
            !loading &&
            this.state.mode === modeKeys[0] && (
              <HandList
                hands={handKeys}
                onClickHand={(hand) => this.play(hand)}
              />
            )}

          {(this.state.winner !== null ||
            loading ||
            this.state.mode === modeKeys[1]) && (
            <Result
              player1Label={player1Label}
              player2Label={player2Label}
              winner={this.state.winner}
              loading={loading}
              onClickPlay={() =>
                this.state.mode === modeKeys[1] ? this.play() : this.restart()
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Game;
