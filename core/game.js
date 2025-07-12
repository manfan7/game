import {GameStatus} from "../constants"

export class Game {
    #settings = {
        gridSize: {
            rows: 2,
            columns: 2,
        },
        googleJumpInterval: 1000
    };
    #status = GameStatus.pending;
    #player1
    #player2
    #interval = null
    #googlePosition = null
    #numberUtility

    constructor(utility) {
        this.#numberUtility = utility
        this.#player1 = new Player(this.#getPlayerPosition());
        this.#player2 = new Player(this.#getPlayerPosition([this.#player1.position]));
    }

    set settings(settings) {
        this.#settings = settings
    }
set googleJumpInterval(value){
        if(typeof value!=='number'){
            throw  new TypeError('check type of value, must be a number')
        }
        if(value<=0){
            throw  new Error('value must be positive')
        }
        this.#settings.googleJumpInterval = value
}
    get settings() {
        return this.#settings
    }

    get status() {
        return this.#status
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get googlePosition() {
        return this.#googlePosition
    }
#googleSetPosition() {
    const newPosition = {
        x: this.#numberUtility.getRandomNumber(0,this.#settings.gridSize.columns),
        y: this.#numberUtility.getRandomNumber(0,this.#settings.gridSize.rows)
    }
    if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
        return this.#googleSetPosition();
    }

    this.#googlePosition = newPosition;
    return newPosition;
}
    startGame() {
        if (this.#status !== GameStatus.pending) {
            throw new Error('You can start onlu if settings mode')
        }
        this.#status = GameStatus.inProgress
        this.#googleSetPosition()
      this.#interval= setInterval(()=>{
          this.#googleSetPosition()
        },this.#settings.googleJumpInterval)
    }
  stopGame(){
        clearInterval(this.#interval)
  }
    #getPlayerPosition(exceptionPositions = []) {
        let x;
        let y;

        do {
            x = this.#numberUtility.getRandomNumber(0,this.#settings.gridSize.columns);
            y = this.#numberUtility.getRandomNumber(0,this.#settings.gridSize.rows);
        } while (exceptionPositions.some((el) => el.x === x && el.y === y));

        return {
            x, y
        };
    }

}

export class Player {
    constructor(position) {
        this.position = position;
    }
}


