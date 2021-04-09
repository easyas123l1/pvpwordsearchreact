import React from "react";
import puzzles from "../../styles/puzzle.module.scss";

export default function MatchCard({ puzzle, viewPuzzle }) {
    const handleClick = () => {
        viewPuzzle(puzzle);
    };
    return (
        <div className={puzzles.matchHistory}>
            <p>Name: {puzzle.name}</p>
            <p>description: {puzzle.description}</p>
            <p>maximum word length: {puzzle.maximum_word_length}</p>
            <p>minimum word length: {puzzle.minimum_word_length}</p>
            <p>Mumber of words: {puzzle.number_of_words}</p>
            <p>Rating: coming soon! {puzzle.rating}</p>
            <p>
                Size: {puzzle.size}x{puzzle.size}
            </p>
            <p>Time: {puzzle.time}</p>
            <p>Users: {puzzle.users.length}</p>
            {/* {puzzle.users.map((user) => {
                return <p key={user.games_users_id}>{user.name}</p>;
            })} */}
            {/* <p>Words:</p>
            {puzzle.words.map((word) => {
                return <p key={word.id}>{word.word}</p>;
            })} */}
            {/* <p>puzzle: puzzle.code lol</p> */}
            <button onClick={handleClick}>View Match</button>
        </div>
    );
}
