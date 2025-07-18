import {directions, GameStatus} from "../constants.js"


export class Game {
    #settings
    #status = GameStatus.pending;
    #player1
    #player2
    #interval = null
    #googlePosition = null
    #numberUtility
    #positionService
    #observers = []

    constructor(utility, settings, positionService) {
        this.#numberUtility = utility

        this.#settings = settings
        this.#positionService = positionService
        this.players = []
    }

    subscribe(observer) {
        this.#observers.push(observer)
    }

    #notify() {
        this.#observers.forEach(observer => observer())
    }

    set settings(settings) {
        this.#settings = settings
        this.#notify()
    }

    addPlayer(id) {
        const position = this.#positionService.getRandomPosition(
            this.players.map(p => p.position)
        );

        this.players.push(new Player(position, id));
        this.#notify()
    }

    set googleJumpInterval(value) {
        if (typeof value !== 'number') {
            throw new TypeError('check type of value, must be a number')
        }
        if (value <= 0) {
            throw new Error('value must be positive')
        }
        this.#settings.googleJumpInterval = value
        this.#notify()
    }

    get settings() {
        return this.#settings
    }

    get status() {
        return this.#status
    }

    get googlePosition() {
        return this.#googlePosition
    }

    playerPosition(id) {
        const player = this.players.find(item => item.id === id)
        if (player) {
            return player.position
        }
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
        const winplayer = this.players.find(item => item.position.x === this.googlePosition.x && item.position.y === this.googlePosition.y)
        if (winplayer) {
            this.#status = GameStatus.Win
            clearInterval(this.#interval)
        }

        return newPosition;
    }

    startGame() {
        if (this.#status !== GameStatus.pending) {
            throw new Error('You can start onlu if settings mode')
        }
        this.#status = GameStatus.inProgress
        this.#notify()
        this.#googleSetPosition()
        this.#interval = setInterval(() => {
            this.#googleSetPosition()
            this.#notify()
        }, this.#settings.googleJumpInterval)
    }

    stopGame() {
        clearInterval(this.#interval)
    }

    movePlayer(playerNumber, moveDirection) {
        const player = this.players.find(item => item.id === playerNumber);
        if (!player) return false; // Игрок не найден

        const otherPlayers = this.players.filter(item => item.id !== playerNumber);

        // 2. Создаем новую позицию
        const newPosition = {...player.position};

        // 3. Обновляем координаты
        switch (moveDirection) {
            case directions.UP:
                newPosition.y -= 1;
                break;
            case directions.DOWN:
                newPosition.y += 1;
                break;
            case directions.LEFT:
                newPosition.x -= 1;
                break;
            case directions.RIGHT:
                newPosition.x += 1;
                break;
        }

        // 4. Проверка границ поля
        if (newPosition.x < 0 || newPosition.x >= this.settings.gridSize.columns ||
            newPosition.y < 0 || newPosition.y >= this.settings.gridSize.rows) {
            return false; // Выход за границы
        }

        // 5. Проверка на занятость позиции другими игроками
        const isPositionOccupied = otherPlayers.some(otherPlayer =>
            otherPlayer.position.x === newPosition.x &&
            otherPlayer.position.y === newPosition.y
        );

        if (isPositionOccupied) {

            return false; // Позиция занята
        }

        // 6. Обновляем позицию игрока
        player.position = newPosition;
        this.#notify()
        // 7. Проверка на победу
        if (this.#googlePosition &&
            newPosition.x === this.#googlePosition.x &&
            newPosition.y === this.#googlePosition.y) {
            this.#status = GameStatus.Win;
            this.#notify()
            clearInterval(this.#interval);
            return true;
        }

        return true; // Успешное перемещение
    }

}

export class Player {
    constructor(position, id) {
        this.position = position;
        this.id = id
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
