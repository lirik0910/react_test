import React from "react";
import css from "../../index.module.css";
import {Board} from "../Board";

// export const Game = (history) => {
//
// }

export default class Game extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            sortDesc: false,
            winCombination: null,
            winner: null,
        };
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.winCombination) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    calculateWinner = () => {
        const {
            stepNumber,
            history,
        } = this.state;

        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const { squares } = history[stepNumber] || {};

        if (!squares) return;

        let winCombination = null;
        let winner = null;

        for (let i = 0; i < combinations.length; i++) {
            const [a, b, c] = combinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                winCombination = combinations[i]
                winner = squares[a];
                break;
            }
        }

        this.setState({winCombination, winner})
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    sortMoves() {
        const currentSort = this.state.sortDesc;

        this.setState({
            sortDesc: !currentSort,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.stepNumber !== this.state.stepNumber) {
            this.calculateWinner();
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.state.winner;
        const sortingByDesc = this.state.sortDesc;
        const winCombination = this.state.winCombination;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to step #' + move :
                'Go to start';

            return (
                <tr className={move === this.state.stepNumber ? css.active : undefined} key={move}>
                    <td>{move}</td>
                    <td onClick={() => this.jumpTo(move)}>{desc}</td>
                </tr>
            );
        }).sort((a, b) => {
            return sortingByDesc
                ? b.key - a.key
                : a.key - b.key;
        });

        let status;

        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = !current.squares.includes(null)
                ? 'It`s a draw!'
                : 'Next step for ' + (this.state.xIsNext ? 'X' : 'O');

        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winCombination={winCombination}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <table>
                        <tbody>
                        <tr>
                            <th onClick={() => this.sortMoves()}>Move</th>
                            <th>Desc</th>
                        </tr>
                        {moves}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}