import React from 'react';

export const Square = ({ onClick, value, active }) => {
//     const winCombination = props.winCombination;
//     const winSquare = winCombination.find((value, index) => (value === props.key))
// console.log(winSquare)
    return (
        <button
            style={{ backgroundColor: active ? 'red' : null}}
            className="square"
            onClick={onClick}
        >
            {value}
        </button>
    );
}