import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function GameRoomLobbyGameOver({ room, leaveRoom, serverId }) {
    // mywords grabs a players words by filtering by id and destructuring first out of array.
    const [myWords] = room.players.filter((player) => serverId === player.id);
    if (myWords) {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>inside some lobby where the game ended!</p>
                    <button onClick={leaveRoom}>Leave</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={puzzle.spacer}>
                <div className={puzzle.background}>
                    <p>
                        server most likely ran into error/reset please refresh
                        page.
                    </p>
                    <button onClick={leaveRoom}>Leave</button>
                </div>
            </div>
        );
    }
}
