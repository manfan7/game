import {Controller} from "./controller.js";
import {View} from "./view.js";
import {GameProxy} from "./game-proxy.js";


const view = new View();

const game = new GameProxy();

const controller = new Controller(view, game);
controller.init()