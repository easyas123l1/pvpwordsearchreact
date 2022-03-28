import React from "react";
import puzzle from "../../styles/puzzle.module.scss";
import Footer from "../Footer/Footer";

const LandingPage = () => {
    return (
        <div className={puzzle.spacer}>
            <div className={puzzle.background}>
                <img
                    className={puzzle.image}
                    src="books.jpg"
                    alt="Word Search Logo"
                />
                <div className={puzzle.landingPage}>
                    <div className={puzzle.features}>
                        <h1>Create Puzzles With Our Puzzle Generator</h1>
                        <div className={puzzle.featureDescription}>
                            <p>Sign in simply with a Google account.</p>
                            <p>
                                Find a puzzle join and compete against others!
                            </p>
                            <p>
                                Compete against others in randomly generated
                                word search puzzles!
                            </p>
                        </div>
                    </div>
                    <div className={puzzle.features}>
                        <h1>Play Puzzles You & Others Create Safely</h1>
                        <div className={puzzle.featureDescription}>
                            <p>
                                Safety is very important to us: With our child
                                safe word filter that we carefully monitor and
                                keep updated you can trust our games to be the
                                safest wordsearch games on the internet!
                            </p>
                            <p>
                                View your puzzle history and see how you compare
                                to others! Coming Soon Leaderboards and new game
                                modes + more features!
                            </p>
                            <p>
                                Share us with friends and family and compete
                                against each other to see who is the ultimate
                                word search solver!
                            </p>
                        </div>
                    </div>
                    <div className={puzzle.features}>
                        <h1>World Record Puzzle</h1>
                        <div className={puzzle.featureDescription}>
                            <p>
                                Creating and solving puzzles is a ton of fun,
                                but if you're looking for a real challenge try
                                checking out our World Record Puzzle!
                            </p>
                            <p style={{ color: "yellow" }}>
                                *WARNING* Loading World Record Puzzle may take
                                some time *WARNING*
                            </p>
                            <p>
                                View our{" "}
                                <a href="/worldRecord">
                                    World Record Puzzle Here!
                                </a>{" "}
                                The puzzle 500x500 with 14,994 words!
                            </p>
                            <p>
                                View all 14,994 words here{" "}
                                <a href="/worldRecordWords">
                                    World Record Words To Find!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
