import React from "react";

export default function MatchCard({ puzzle, viewPuzzle }) {
    return (
        <div>
            <p>id: {puzzle.id}</p>
            <p>description: {puzzle.description}</p>
            <p>maximum word length: {puzzle.maximum_word_length}</p>
            <p>minimum word length: {puzzle.minimum_word_length}</p>
            <p>name: {puzzle.name}</p>
            <p>number of words: {puzzle.number_of_words}</p>
            <p>rating: coming soon! {puzzle.rating}</p>
            <p>
                size: {puzzle.size}x{puzzle.size}
            </p>
            <p>time: {puzzle.time}</p>
            <p>users:</p>
            {puzzle.users.map((user) => {
                return <p key={user.games_users_id}>{user.name}</p>;
            })}
            <p>words:</p>
            {puzzle.words.map((word) => {
                return <p key={word.id}>{word.word}</p>;
            })}
            <p>puzzle: puzzle.code lol</p>
            <button onClick={() => viewPuzzle(puzzle)}>Click</button>
        </div>
    );
}
