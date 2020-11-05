import React from "react";

export default function LeaderBoard({ players, serverId }) {
    const playerPlacements = players.sort((a, b) => {
        return a.score - b.score;
    });
    return (
        <div>
            {playerPlacements.map((player) => {
                return player.id !== serverId ? (
                    <p>
                        {player.id}: {player.score}
                    </p>
                ) : (
                    <p>
                        {player.id}(you): {player.score}
                    </p>
                );
            })}
        </div>
    );
}
