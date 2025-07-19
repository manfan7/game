export class Controller {
    #view
    #game

    constructor(view, game) {
        this.#view = view
        this.#game = game
        this.#game.subscribe(()=>{
            this.#render()
        })
        this.#view.onStart = ()=>{
            this.#game.startGame()

        }
    }

    init() {
       this.#render()
    }
    #render(){
        const dto = {
            status: this.#game.status,
            settings: this.#game.settings,
points: this.#game.points
        }
        this.#view.render(dto)
    }
}