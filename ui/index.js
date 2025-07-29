import {Controller} from "./controller.js";
import {View} from "./view.js";
import {GameProxy} from "./game-proxy.js";


const view = new View();

const game = new GameProxy();

const controller = new Controller(view, game); // ✅ создаём только когда state готов

const intervalId = setInterval(() => {
    if (game.initilized) {
        controller.init()
        clearInterval(intervalId);
    }
}, 100)
