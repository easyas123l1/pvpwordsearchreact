import React from "react";

export default function PuzzleView({ puzzleView, leavePuzzle }) {
    console.log(puzzleView);
    return (
        <div>
            <p>the puzzzlllllleeee</p>
            <button onClick={leavePuzzle}>leave puzzle view</button>
        </div>
    );
}
