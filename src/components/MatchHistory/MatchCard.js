import React from "react";

export default function MatchCard({ puzzle }) {
    return (
        <div>
            <p>id: {puzzle.id}</p>
            <p>description: {puzzle.description}</p>
            <p>maximum word length: {puzzle.maximum_word_length}</p>
            <p>minimum word length: {puzzle.minimum_word_length}</p>
            <p>name: {puzzle.name}</p>
            <p>number of words: {puzzle.number_of_words}</p>
            <p>rating: coming soon! {puzzle.rating}</p>
            <p>size: {puzzle.size}</p>
            <p>time: {puzzle.time}</p>
            <p>users:</p>
            <p>words:</p>
            <p>puzzle: puzzle.code lol</p>
        </div>
    );
}
