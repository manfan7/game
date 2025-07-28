import {Randomizer} from "../core/utils.js";
import {WebSocketServer} from 'ws';
import {Game, GridSize, PositionService} from "../core/game.js";

const numberUtility = new Randomizer();

const settings = new GridSize()
const positionService = new PositionService(settings, numberUtility)
const game = new Game(numberUtility, settings, positionService);
game.startGame()

function  createDto(){
    const data = {
        status: game.status,
        points: game.points,
        endpoints: game.endPoints,
        gridsize: game.settings.gridSize,
        googlePosition: game.googlePosition,
        players: game.getPlayers()
    }
    return data
}
const wss = new WebSocketServer({
    port: 3001
});

wss.on('connection', function connection(tunnel) {
game.subscribe(()=>{
    tunnel.send(JSON.stringify(createDto()))
})
    tunnel.send(JSON.stringify(createDto()))
 /*   const gameEventEmitter = game.eventEmitter;

    gameEventEmitter.on('positions-updated', () => {
        const event = {
            type: 'event',
            event: 'positions-updated'
        };

        tunnel.send(JSON.stringify(event));
    });*/

   /* tunnel.on('message', async function message(data) {
        const body = JSON.parse(data);

        const result = await game[body.procedureName]();

        const resp = {
            result,
            type: 'procedure',
            procedureName: body.procedureName
        };

        tunnel.send(JSON.stringify(resp));
    });



    tunnel.on('error', console.error);
    console.log('Connected successfully!');*/
});

