import {GameStatus} from "../constants.js";


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
        this.#view.onPlayerMoove = (id,direction) => {
            if(this.#game.status===GameStatus.inProgress){
                this.#game.movePlayer(id,direction)
            }

        }
        this.#view.addPlayer = (name)=>{
            this.#game.addPlayer(2,name)
        }
        if(this.#game.status){
            this.#view.status = this.#game.status
        }

    }

    init() {
        this.#render()
    }

    #render() {

        const dto = {
            status: this.#game.status,
            points: this.#game.points,
            endpoints: this.#game.endPoints,
            gridsize: this.#game.settings,
            googlePosition: this.#game.googlePosition,
            players: this.#game.Players??[{position:{x:1,y:1},id:1,name:'Igor'}]
        }

        this.#view.render(dto)
    }

}