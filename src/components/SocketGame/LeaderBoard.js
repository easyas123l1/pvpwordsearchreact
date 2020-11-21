import React from "react";

export default function LeaderBoard({ players, serverId }) {
    const playerPlacements = players.sort((a, b) => {
        return a.score - b.score;
    });
    return (
        <div>
            {playerPlacements.map((player) => {
                return player.id !== serverId ? (
                    <p key={player.name}>
                        {player.name}: {player.score}
                    </p>
                ) : (
                    <p key={player.name}>
                        {player.name}(you): {player.score}
                    </p>
                );
            })}
        </div>
    );
}
