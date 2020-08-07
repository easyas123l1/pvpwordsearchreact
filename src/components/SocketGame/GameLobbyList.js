import React from "react";

export default function GameLobbyList({ room, joinGame }) {
    return (
        <div>
            <p>{room.name}</p>
            <button id={room.id} onClick={joinGame}>
                Join
            </button>
        </div>
    );
}
