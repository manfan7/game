import {GameStatus} from "../constants.js";

export class View {
    render(dto) {
        const rootElement = document.getElementById('root');
        rootElement.innerHTML = '';
        const wrapper = document.createElement('div')
        const gameBoard = document.createElement('div');
        const cell = document.createElement('div');
        const header = document.createElement('header')
        const p = document.createElement('p')
        const button = document.createElement('button')
        button.classList.add('gamestart')
        button.append('Press button to start game')
        button.addEventListener('click', () => {
            this.onStart?.()
        })
        cell.classList.add('cell')
        gameBoard.classList.add('game-board');
        gameBoard.append(cell)
        wrapper.classList.add('wrapper')

        p.append(`Status: ${dto.status} ${dto.points}`)
        header.append(`Game`)
        header.append(p)
        if (dto.status === GameStatus.pending) {
            header.append(button)
        }
        wrapper.append(header, gameBoard)
        rootElement.append(wrapper)


    }
}
