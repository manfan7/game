


export class GameProxy {
#observers=[]
#socket = null
    #statecashe = null
    #readyCallback = null;
    constructor() {
        this.#socket = new WebSocket('ws://localhost:3001');
        this.#socket.addEventListener('message', (e) => {
            this.#statecashe = JSON.parse(e.data);
            this.#notify();

            // ✅ первый раз получили данные — вызываем инициализацию
            if (this.#readyCallback) {
                this.#readyCallback();
                this.#readyCallback = null; // Чтобы не вызывать дважды
            }
        });
    }

    onReady(callback) {
        if (this.initilized) {
            callback(); // если уже готов — сразу
        } else {
            this.#readyCallback = callback;
        }
    }

    get initilized() {
        return this.#statecashe !== null;
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
    return this.#statecashe?.players??[{position:{x:1,y:1},id:1,name:'Igor'}] ;
}
    set googleJumpInterval(value) {

    }

    get settings() {
        return this.#statecashe?.settings ?? new GridSize();
    }

    get status() {
        return this.#statecashe?.status ?? 'pending';
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
        const action = {type: 'start'};
this.#socket.send(JSON.stringify(action));
    }

    stopGame() {

    }

    movePlayer(playerNumber, moveDirection) {
const action = {type: 'move', playerNumber, moveDirection};
this.#socket.send(JSON.stringify(action));
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
