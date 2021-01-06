import React from "react";
import Puzzle from "./Puzzle";

export default function PuzzleView({ puzzle, leavePuzzle, email }) {
    return (
        <div>
            <button onClick={leavePuzzle}>leave puzzle view</button>
            <Puzzle
                words={puzzle.words}
                name={puzzle.name}
                code={puzzle.code}
                users={puzzle.users}
                time={puzzle.time}
                email={email}
            />
        </div>
    );
}
