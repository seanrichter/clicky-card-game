import React, {Component} from "react";
import "./Grid.css";
import femmeBlocks from "../../playingCards.json";
import Card from "../Card";
import Header from "../Header/Header";


class Grid extends Component {
    state = {
        playingCards: femmeBlocks,
        score: 0
    }

    resetGame = () => {
        this.setState({
            score: 0,
            playingCards: femmeBlocks
        })      
    }

    handleCorrect = newplayingCards => {
        this.setState({
            playingCards: this.shuffleArray(newplayingCards), 
            score: this.state.score +1,
        });
        
        if (this.state.score === 11) {
            this.resetGame();
            console.log("You won!");
        }

    };

    handleWrong = () => {
        this.resetGame();
    };

    handleClick = name => {
        let guessedCorrect = false;
        const newplayingCards = this.state.playingCards.map(femme => {
           const newPic = {...femme};
           if (newPic.name === name) {
               if(!newPic.clicked){
                   console.log("Already guessed------------");
                   newPic.clicked = true;
                   guessedCorrect = true;
               }
               
           }
           return newPic;
       })       
       console.log("GUESSED CORRECT: ", guessedCorrect)
       guessedCorrect ? this.handleCorrect(newplayingCards) : this.handleWrong(newplayingCards)
    };

    shuffleArray = playingCards => {
        for (let i = playingCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playingCards[i], playingCards[j]] = [playingCards[j], playingCards[i]];
        }
        return (playingCards);
    };

    render() {
        return(
            <div>
                <Header score={this.state.score}/>
                <div className="gridWrapper">
                    <div className="grid">
                    {this.state.playingCards.map(femme => {
                            return (<Card 
                            name={femme.name}
                            key={femme.name} 
                            handleClick={this.handleClick}
                            src={femme.image} 
                            alt={femme.name}  
                        />)
                        })}
                    </div>
                </div>
            </div> 
        );
    }
};

export default Grid;