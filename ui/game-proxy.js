


export class GameProxy {
#observers=[]
    constructor(utility, settings, positionService) {
 /*       this.#numberUtility = utility

        this.#settings = settings
        this.#positionService = positionService
        this.players = []*/
    }

    subscribe(observer) {
        this.#observers.push(observer)
    }

    #notify() {
        this.#observers.forEach(observer => observer())
    }

    set settings(settings) {

    }

    addPlayer(id,name) {

    }
getPlayers(){

}
    set googleJumpInterval(value) {

    }

    get settings() {

    }

    get status() {

    }

    get points() {

    }
get endPoints() {

}
    set points(value) {

    }

    incrementPoints() {


    }

    get googlePosition() {

    }





    startGame() {

    }

    stopGame() {

    }

    movePlayer(playerNumber, moveDirection) {
    }

}

export class Player {
    constructor(position, id,name) {
        this.position = position;
        this.id = id
        this.name = name;
    }
}

export class GridSize {
    constructor(rows = 4, columns = 4, interval = 1000) {
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
            x = this.numberUtility.getRandomNumber(0, this.settings.gridSize.columns);
            y = this.numberUtility.getRandomNumber(0, this.settings.gridSize.rows);
        } while (exceptions.some(pos => pos.x === x && pos.y === y));
        return {x, y};
    }
}
