import {directions, GameStatus} from "../constants.js";

export class View {
    constructor() {
        document.addEventListener('keyup',(e)=>{

               const directionMap = {
                   'ArrowUp': directions.UP,
                   'KeyW': directions.UP,
                   'ArrowDown': directions.DOWN,
                   'KeyS': directions.DOWN,
                   'ArrowLeft': directions.LEFT,
                   'KeyA': directions.LEFT,
                   'ArrowRight': directions.RIGHT,
                   'KeyD': directions.RIGHT
               };
               const direction = directionMap[e.code];
               if(direction){
                   this?.onPlayerMoove(1,direction)
                   this?.onPlayerMoove(2,direction)
               }



        })
    }
    render(dto) {
        const rootElement = document.getElementById('root');
        rootElement.innerHTML = '';
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')

        const field = new GridComponent()
        const gameBoard = field.render(dto)
        const headertemp = new HeaderComponent({dto,onStart:this?.onStart,onAdd:this?.addPlayer})
        const header = headertemp.render()

        wrapper.append(header, gameBoard)
        rootElement.append(wrapper)


    }
}
class HeaderComponent{
    #props
    constructor(props) {
        this.#props = props;
    }
    render(){
        const header = document.createElement('header')
        const p = document.createElement('p')
        const input = document.createElement('input')
        const addButton = document.createElement('button')
        const playerContainer = document.createElement('div')
        playerContainer.classList.add('player')
        header.classList.add('header')
        input.classList.add('header-input')
        addButton.classList.add('add-button')
        addButton.textContent = 'Add Player'
        addButton.addEventListener('click',()=>{
            const name = input.value
            if(!this.#props.dto.players.find(item=>item.id===2)&&this.#props.dto.status===GameStatus.pending){
                this.#props.onAdd(name)
            }
        })
        header.append(`Game`)

        const button = new ButtonComponent({onStart: this.#props.onStart})
        const btnStart = button.render()
        const restartButn = button.render('Press to restart game')
        p.append(`Points from start: ${this.#props?.dto.points}`)
        if (this.#props.dto.status === GameStatus.pending ||this.#props. dto.status === GameStatus.Loose) {
            header.append(btnStart)
        }
        if(this.#props.dto.status===GameStatus.Win){
            header.append(restartButn)
        }
        this.#props.dto.players.forEach(player=> {
        playerContainer.innerHTML+=`<div>${player.name}</div>`
        })
        header.append(p,input,addButton,playerContainer)
        return header
    }
}
class ButtonComponent {
    #props

    constructor(props) {
        this.#props = props
    }

    render(text='Press button to start game') {
        const button = document.createElement('button')
        button.classList.add('gamestart')
        button.append(text)
        button.addEventListener('click', () => {
            this.#props?.onStart()
        })
        return button
    }
}

class GridComponent {

    render(dto) {
        const gameBoard = document.createElement('div');
        gameBoard.classList.add('game-board');
        gameBoard.style.setProperty('--columns', dto.gridsize.columns);
        gameBoard.style.setProperty('--rows', dto.gridsize.rows);
        const winner = new WinnerComponent()
        const winnerboard= winner.render(dto)
        const player1 =  dto.players.find(item=>item.id===1)
        const player2 =  dto.players.find(item=>item.id===2)||undefined
        for (let y = 0; y < dto.gridsize.rows; y++) {
            for (let x = 0; x < dto.gridsize.columns; x++) {

                const cell = document.createElement('div');
                cell.classList.add('cell');
         if(dto.googlePosition.x===x&&dto.googlePosition.y===y){
             cell.classList.add('google-image')
         }
         else if(player1.position.x===x&&player1.position.y===y){
             cell.classList.add('player1')
         } else if(player2&&player2.position.x===x&&player2.position.y===y){
             cell.classList.add('player2')
         }
                gameBoard.appendChild(cell);
            }
        }
gameBoard.append(winnerboard)
        return gameBoard
    }
}
class WinnerComponent{
    render(dto) {
        const winnerboard=document.createElement('div')
        winnerboard.classList.add('winnerboard')
        console.log(dto.endpoints,dto.points)
        const text = dto.status===GameStatus.Win?`Your Score is ${dto.endpoints-dto.points}`: `You are looser.Try again`
        console.log()
        if(dto.status===GameStatus.Loose||dto.status===GameStatus.Win){
            setTimeout(() => winnerboard.classList.add('show'));
            winnerboard.append(text)
        }


        return winnerboard
    }
}