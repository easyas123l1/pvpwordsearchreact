import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  return (
    <div className={puzzle.spacer}>
      <div className={puzzle.background}>
        <img className={puzzle.image} src="books.jpg" alt="Word Search Logo" />
        <div className={puzzle.landingPage}>
          <div className={puzzle.features}>
            <h1>Create Puzzles With Our Puzzle Generator</h1>
            <div className={puzzle.featureDescription}>
              <p>
                <a href="/register">Register</a> an account with us and create
                your own custom word search puzzle!
              </p>
              <p>
                With our language filter safely let students create their own
                word search with peace of mind knowing it will be school
                friendly!
              </p>
              <p>Save your puzzle and share it with your friends and family!</p>
            </div>
          </div>
          <div className={puzzle.features}>
            <h1>Play Puzzles You & Others Create</h1>
            <div className={puzzle.featureDescription}>
              <p>
                Play from our user created puzzles{" "}
                <a href="/allPuzzles">view puzzles</a>! All of our puzzles are
                child friendly!
              </p>
              <p>
                Print out any puzzle to be done away from the computer or in the
                classroom!
              </p>
              <p>
                Play against classmates to see who can get the fastest time!!
              </p>
            </div>
          </div>
          <div className={puzzle.features}>
            <h1>World Record Puzzle</h1>
            <div className={puzzle.featureDescription}>
              <p>
                Creating and solving puzzles is a ton of fun, but if you're
                looking for a real challenge try checking out our World Record
                Puzzle!
              </p>
              <p>
                View our{" "}
                <a href="/worldRecord">Guinesses World Record Puzzle Here!</a>{" "}
                The puzzle 500x500 with 14,994 words!
              </p>
              <p>
                View all 14,994 words here{" "}
                <a href="/worldRecordWords">
                  Guinesses World Record Words To Find!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
