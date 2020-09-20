import React from "react";
import {Square} from "./Square";

export class Board extends React.Component {
    renderSquare(i) {
        const {
            winCombination,
            onClick,
            squares,
        } = this.props;

        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                active={winCombination && winCombination.includes(i)}
            />
        );
    }

    render() {
        const squareRows = Array(3).fill(null);
        const squaresAtRow = Array(3).fill(null);

        const squares = squareRows.map((rValue, rIndex) => {
            return (
                <div key={rIndex} className="board-row">
                    {
                        squaresAtRow.map((cValue, cIndex) => (
                            this.renderSquare(rIndex * 3 + cIndex)
                        ))
                    }
                </div>
            );
        });

        return (
            <div>
                {squares}
            </div>
        );
    }
}