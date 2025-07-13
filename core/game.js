import {GameStatus} from "../constants"


export class Game {
    #settings
    #status = GameStatus.pending;
    #player1
    #player2
    #interval = null
    #googlePosition = null
    #numberUtility
    #positionService

    constructor(utility,rows,columns,interval) {
        this.#numberUtility = utility
this.#settings = new GridSize(rows,columns,interval)
        this.players = []
        this.#player1 = new Player(this.#getPlayerPosition());
        this.#player2 = new Player(this.#getPlayerPosition([this.#player1.position]));
    }

    set settings(settings) {
        this.#settings = settings
    }

    addPlayer() {
        const position = this.#positionService.getRandomPosition(
            this.players.map(p => p.position)
        );
        this.players.push(new Player(position));
    }

    set googleJumpInterval(value) {
        if (typeof value !== 'number') {
            throw new TypeError('check type of value, must be a number')
        }
        if (value <= 0) {
            throw new Error('value must be positive')
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
get playerPosition(){
        return this.#player1.position
}
    #googleSetPosition() {
        const newPosition = {
            x: this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.columns),
            y: this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.rows)
        }
        if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
            return this.#googleSetPosition();
        }

        this.#googlePosition = newPosition;
        return newPosition;
    }

    #getPlayerPosition(exceptionPositions = []) {
        let x;
        let y;

        do {
            x = this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.columns);
            y = this.#numberUtility.getRandomNumber(0, this.#settings.gridSize.rows);
        } while (exceptionPositions.some((el) => el.x === x && el.y === y));

        return {
            x, y
        };
    }

    startGame() {
        if (this.#status !== GameStatus.pending) {
            throw new Error('You can start onlu if settings mode')
        }
        this.#status = GameStatus.inProgress
        this.#googleSetPosition()
        this.#interval = setInterval(() => {
            this.#googleSetPosition()
        }, this.#settings.googleJumpInterval)
    }

    stopGame() {
        clearInterval(this.#interval)
    }


}

export class Player {
    constructor(position) {
        this.position = position;
    }
}

class GridSize {
    constructor(rows, columns, interval) {
        this.gridSize = {
            rows: rows,
            columns: columns,
        }
            this.googleJumpInterval = interval
    }
}

export class PositionService {
    constructor(settings, numberUtility) {
        this.settings = settings;
        this.numberUtility = numberUtility;
    }

    getRandomPosition(exceptions = []) {
        let x, y;
        do {
            x = this.numberUtility.getRandomNumber(0, this.settings.gridSize.columns - 1);
            y = this.numberUtility.getRandomNumber(0, this.settings.gridSize.rows - 1);
        } while (exceptions.some(pos => pos.x === x && pos.y === y));
        return {x, y};
    }
}
