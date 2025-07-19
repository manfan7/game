

export class Controller {
    #view
    #game

    constructor(view, game) {
        this.#view = view
        this.#game = game
        this.#game.subscribe(() => {
            this.#render()
        })
        this.#view.onStart = () => {
            this.#game.startGame()
        }
    }

    init() {
        this.#game.addPlayer(1,'Igor')
        this.#render()
    }

    #render() {
        const dto = {
            status: this.#game.status,
            points: this.#game.points,
            gridsize: this.#game.settings.gridSize,
            googlePosition: this.#game.googlePosition,
            players: this.#game.getPlayers()
        }
        this.#view.render(dto)
    }
}