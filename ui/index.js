import {Controller} from "./controller.js";
import {View} from "./view.js";
import {Game, PositionService, GridSize} from "../core/game.js";
import {Randomizer} from '../core/utils.js'


const view = new View();
const numberUtility = new Randomizer();

const settings = new GridSize()
const positionService = new PositionService(settings, numberUtility)
const game = new Game(numberUtility, settings, positionService);
const controller = new Controller(view, game);
controller.init()