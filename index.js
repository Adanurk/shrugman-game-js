const prompt = require('prompt-sync')({ sigint: true });


class Game {
    constructor(type) {
        this.books = ["blindness", "harry potter and philosophers stone", "les miserables", "killing the mockingbird"];
        this.films = ["lord of the rings", "titanic", "citizen kane", "shining"];
        this.quotes = ["practice makes perfect", "time is money"];
        this.type = type;
        this.previousGuesses = [];
        this.previousScores = [];
    }

    play() {
        //my variables----------------------------------------------------
        let shrugman = ["¯", "\\", "_", "(", ":", "/", ")", "_", "/", "¯"];
        let actualShrugman = [];
        let actual = [];
        let guessedChar;
        let counter = 0;
        let repeat = false;

        //random answer according to type---------------------------------
        if (this.type === "film") {
            let num = Math.floor(Math.random()*this.films.length);
            this.answer = this.films[num];
        } else if (this.type === "book") {
            let num = Math.floor(Math.random()*this.books.length);
            this.answer = this.books[num];
        } else if (this.type === "quote"){
            let num = Math.floor(Math.random()*this.quotes.length);
            this.answer = this.quotes[num];
        }

        //loop for masked answer display----------------------------------
        for (let i = 0; i < this.answer.length; i++) {
            if (this.answer[i] === " ") {
                actual.push(" ");
            } else {
                actual.push("_");
            }
        }

        //Game starts-----------------------------------------------------
        while (actualShrugman.length < shrugman.length + 1 && actual.join("") !== this.answer) {
            console.clear();
            repeat && console.log("You already tried this, guess new one; ");
            repeat = false;
            console.log(actual.join(""));
            console.log(actualShrugman.join(""));
            guessedChar = prompt("Guess a letter: ");
            if (actualShrugman.join("") === shrugman.join("")) {
                console.clear();
                console.log(`You lost, the answer is "${this.answer}"`);
                this.previousScores.push(`${this.answer} - loss`);
                this.printResults();
                break
            } else {
                if (this.previousGuesses.join("").includes(guessedChar)) {
                    //if it is same with previous ones---- 
                    repeat = true;
                }
                else if (this.answer.includes(guessedChar)) {
                    //if it is right:----------------------
                    for (const index in this.answer) {
                        if (this.answer[index] === guessedChar) {
                            actual.splice(index, 1, this.answer[index]);
                        }
                    }
                    this.previousGuesses.push(guessedChar);
                } else {
                    //if it is wrong:----------------------
                    actualShrugman.push(shrugman[counter]);
                    counter++;
                    this.previousGuesses.push(guessedChar);
                }
            }
            console.log(actual.join(""));
            console.log(actualShrugman.join(""));
        }
        if (actual.join("") === this.answer) {
            console.clear();
            console.log(`You won, the answer is ${this.answer}`);
            this.previousScores.push(`${this.answer} - Win`);
            this.printResults();
        }
    }

    printResults(){
        for (let i = 0; i < this.previousScores.length; i++) {
            console.log(`${i+1}. ${this.previousScores[i]}`);
        }
    }
}


let categories = ["book", "film", "quote"];
console.log(`${categories[0]} - ${categories[1]} - ${categories[2]}`);
let category = prompt("Which category do you want to play?: ");
let myGame = new Game(category);
myGame.play();
for (let i = 0; i < 10; i++) {
    cont = prompt("Do you want to play another round in this category? ");
    if(cont === "yes"){
        myGame.previousGuesses = [];
        myGame.play();
    }else{
        console.clear();
        console.log("Your last scores: ");
        myGame.printResults();
        break
    }
}