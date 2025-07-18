import {Game, GridSize, PositionService} from "./game";
import {GameStatus} from "../constants";
import {Randomizer} from "./utils";

describe('description....', () => {
    test('Check game initialization', () => {
        const numberUtility = new Randomizer()
        const game = new Game(numberUtility);
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
        const numberUtility = new Randomizer()
        const game = new Game(numberUtility);

        expect(game.status).toBe(GameStatus.pending);

        await game.startGame()

        expect(game.status).toBe(GameStatus.inProgress);
    });

    test('Check google position', async () => {
        const numberUtility = new Randomizer()
        const game = new Game(numberUtility);

        expect(game.googlePosition).toBeNull()

        await game.startGame()
        for (let i = 0; i < 100; i++) {
            expect(game.googlePosition.x).toBeLessThan(game.settings.gridSize.columns)
            expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
            expect(game.googlePosition.y).toBeLessThan(game.settings.gridSize.rows)
            expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
            expect(game.status).toBe(GameStatus.inProgress);
        }

    });
    test('Check players position', () => {
        const numberUtility = new Randomizer()
        for (let i = 0; i < 50; i++) {
            const game = new Game(numberUtility);

            game.settings = {
                gridSize: {
                    rows: 4,
                    columns: 4,
                }
            }

            expect(game.player1.position).not.toEqual(game.player2.position);
            expect(game.player1.position.x).toBeLessThan(game.settings.gridSize.columns)
        }
    });
    test('Cchecknew googleposition', async () => {
        const numberUtility = new Randomizer()
        const game = new Game(numberUtility);
        game.googleJumpInterval = 1
        const delay = (ms) => new Promise(res => setTimeout(res, ms))
        await game.startGame()
        for (let i = 0; i < 50; i++) {
            const googlePos = game.googlePosition
            await delay(1)
            const newPos = game.googlePosition

            expect(googlePos).not.toEqual(newPos);
        }
    });
    test('player should move in corect direction', async () => {
        const numberUtility = new Randomizer()
        const settings = new GridSize()
        const fakeNuberUtility = {
            getRandomNumber(){
                return 3
            }
        }
        const positionService = new PositionService(settings,fakeNuberUtility)
        const game = new Game(fakeNuberUtility,4,4,1000,positionService);


game.startGame()
        game.addPlayer(1)
expect(game.settings.gridSize.rows).toBe(4)
        expect(game.playerPosition(1).x).toBeLessThan(game.settings.gridSize.columns)
        game.movePlayer(1,'RIGHT')
        expect(game.playerPosition(1)).toEqual({x:3,y:3})
        game.movePlayer(1,'LEFT')
        expect(game.playerPosition(1)).toEqual({x:2,y:3})
        game.movePlayer(1,'UP')
        expect(game.playerPosition(1)).toEqual({x:2,y:2})
        game.movePlayer(1,'DOWN')
        game.movePlayer(1,'RIGHT')
        expect(game.playerPosition(1)).toEqual({x:3,y:3})
        expect(game.googlePosition).toEqual({x:3,y:3})
        expect(game.status).toEqual(GameStatus.Win)
    });
})
