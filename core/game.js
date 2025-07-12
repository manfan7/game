import { GameStatus } from "../constants"

export class Game {
    #settings = {
        gridSize: {
            rows: 2,
            columns: 2,
        }
    };
    #status = GameStatus.pending;
    #player1
    #player2

    constructor() {
        this.#player1 = new Player(this.#getPlayerPosition());
        this.#player2 = new Player(this.#getPlayerPosition([this.#player1.position]));
    }

    set settings(settings) {
        this.#settings = settings
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
    startGame() {
        this.#status = GameStatus.inProgress
    }

    #getPlayerPosition(exceptionPositions = []) {
        let x;
        let y;

        do {
            x = this.#getRandomNumber(this.#settings.gridSize.columns);
            y = this.#getRandomNumber(this.#settings.gridSize.rows);
        } while (exceptionPositions.some((el)=> el.x === x && el.y === y));

        return {
            x, y
        };
    }

    #getRandomNumber(min = 2, max= 2) {
        return Math.floor(Math.random() * max + 1);
    }
}

export class Player {
    constructor(position) {
        this.position = position;
    }
}

// #getRandomPosition() {
//     let newX = NumberUtil.getRandomNumber(this.#settings.gridSize.x);
//     let newY = NumberUtil.getRandomNumber(this.#settings.gridSize.y);
//
//     if (newX === this.#player1.position.x && newY === this.#player1.position.y) {
//         return this.#getRandomPosition();
//     }
//
//     return { x: newX, y: newY };
// }