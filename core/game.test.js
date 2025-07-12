import {Game} from "./game";
import {GameStatus} from "../constants";

describe('description....', ()=>{
    test('Check game initialization', () => {
        const game = new Game();
        game.settings = {
            gridSize: {
                rows: 2,
                columns: 2,
            }
        }

        const {gridSize} = game.settings;

        expect(gridSize.rows).toBe(2);
        expect(gridSize.columns).toBe(2);
    });

    test('Check start game', async () => {
        const game = new Game();

        expect(game.status).toBe(GameStatus.pending);

        await game.startGame()

        expect(game.status).toBe(GameStatus.inProgress);
    });

    test('Check google position', async () => {
        const game = new Game();

        expect(game.googlePosition).toBeNull()

        await game.startGame()

        expect(game.googlePosition.x).toBeLessThan(game.settings.gridSize.columns)
        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
        expect(game.googlePosition.y).toBeLessThan(game.settings.gridSize.rows)
        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
        expect(game.status).toBe(GameStatus.inProgress);
    });
    test('Check players position', () => {
        for(let i = 0; i < 50; i++){
            const game = new Game();

            game.settings = {
                gridSize: {
                    rows: 4,
                    columns: 4,
                }
            }

            expect(game.player1.position).not.toEqual(game.player2.position);
        }
    });
})
