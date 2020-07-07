import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPuzzles } from "../../store/actions/puzzleAction";
import PuzzleCard from "./PuzzleCard";
import puzzle from "../../styles/puzzle.module.scss";
import { Circle } from "react-spinners-css";
import Footer from "../Footer/Footer";

const AllPuzzles = ({ getPuzzles, puzzles }) => {
  useEffect(() => {
    if (puzzles.length === 0) {
      getPuzzles();
    }
  }, [getPuzzles, puzzles.length]);

  if (puzzles.length === 0) {
    return (
      <div className={puzzle.spacer}>
        <div className={puzzle.background}>
          <h1>Retrieving puzzles!</h1>
          <Circle color="blue" size={200} />
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={puzzle.spacer}>
        <div className={puzzle.background}>
          <div className={puzzle.allPuzzle}>
            {puzzles.map((puzzle) => {
              return <PuzzleCard key={puzzle.id} puzzle={puzzle} />;
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    puzzles: state.puzzleReducer.puzzles,
  };
};

export default connect(mapStateToProps, { getPuzzles })(AllPuzzles);
