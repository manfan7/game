


export class GameProxy {
#observers=[]
#socket = null
    #statecashe = null
    constructor(utility, settings, positionService) {
 /*       this.#numberUtility = utility

        this.#settings = settings
        this.#positionService = positionService
        this.players = []*/
        this.#socket = new WebSocket('ws://localhost:3001')
        this.#socket.addEventListener('message', (e) => {
            console.log(e.data)
            this.#statecashe = JSON.parse(e.data)
            this.#notify()
        })
    }

get initilized(){
    return this.#statecashe!==null
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
get Players(){
    return this.#statecashe?.players ?? [];
}
    set googleJumpInterval(value) {

    }

    get settings() {
return this.#statecashe.gridsize
    }

    get status() {
return this.#statecashe.status
    }

    get points() {
        return this.#statecashe.points
    }
get endPoints() {
    return this.#statecashe.endPoints

}
    set points(value) {

    }

    incrementPoints() {


    }

    get googlePosition() {
return this.#statecashe.googlePosition
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
