import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

export default function GameRoomLobbyGameOver({ room, leaveRoom, serverId }) {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <div>inside some lobby where the game ended!</div>
            </div>
        </div>
    );
}
