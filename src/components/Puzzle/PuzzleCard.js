import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPuzzle } from "../../store/actions/puzzleAction";
import puzzle from "../../styles/puzzle.module.scss";

const PuzzleCard = ({
  puzzle: { id, name, code, description },
  getPuzzle,
  words,
}) => {
  const history = useHistory();
  const playPuzzle = (e) => {
    e.preventDefault();
    getPuzzle(id);
    history.push("/playPuzzle");
  };

  return (
    <div className={puzzle.puzzleCard}>
      <p className={puzzle.cardP}>Puzzle Name: {name}</p>
      <p className={puzzle.cardP}>
        Puzzle Size: {Math.sqrt(code.length)}x{Math.sqrt(code.length)}
      </p>
      <p className={puzzle.cardDescription}>Description: {description}</p>
      <div className={puzzle.buttonDiv}>
        <button onClick={playPuzzle} className={puzzle.playPuzzle}>
          Play Puzzle
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    words: state.puzzleReducer.playPuzzleWords,
  };
}

export default connect(mapStateToProps, { getPuzzle })(PuzzleCard);
