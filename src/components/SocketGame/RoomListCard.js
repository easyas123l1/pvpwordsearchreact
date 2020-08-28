import React from "react";

export default function RoomListCard({ room, joinGame }) {
    return (
        <div>
            <p>{room.name}</p>
            <button id={room.id} onClick={joinGame}>
                Join
            </button>
        </div>
    );
}
