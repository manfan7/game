import {GameStatus} from "../constants.js";

export class View {
    render(dto) {
        const rootElement = document.getElementById('root');
        rootElement.innerHTML = '';
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')

        const field = new GridComponent()
        const gameBoard = field.render(dto)
        const headertemp = new HeaderComponent({dto,onStart:this.onStart})
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
        header.append(`Game`)

        const button = new ButtonComponent({onStart: this.#props.onStart})
        const btnStart = button.render()
        const restartButn = button.render('Press to restart game')
        p.append(`Status: ${this.#props?.dto.status} ${this.#props?.dto.points}`)
        if (this.#props.dto.status === GameStatus.pending ||this.#props. dto.status === GameStatus.Loose) {
            header.append(btnStart)
        }
        if(this.#props.dto.status===GameStatus.Win){
            header.append(restartButn)
        }
        this.#props.dto.players.forEach(player=> {
        playerContainer.append(player.name)
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
    constructor({appLayerMoove}) {
        document.addEventListener('keyup',(e)=>{
            switch (e.code){
                case 'ArrowUp':
                    appLayerMoove(1,)
            }
        })
    }
    render(dto) {
        const gameBoard = document.createElement('div');
        gameBoard.classList.add('game-board');
        gameBoard.style.setProperty('--columns', dto.gridsize.columns);
        gameBoard.style.setProperty('--rows', dto.gridsize.rows);
        for (let y = 0; y < dto.gridsize.rows; y++) {
            for (let x = 0; x < dto.gridsize.columns; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
         if(dto.googlePosition.x===x&&dto.googlePosition.y===y){
             cell.classList.add('google-image')
         }
                gameBoard.appendChild(cell);
            }
        }

        return gameBoard
    }
}