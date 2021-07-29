import "./scss/main.scss";
import * as PIXI from "pixi.js-legacy";
import Handlers from "./utils/handlers";
import Demo from "./demo/Demo";
import GameCL from "./shoot/gamecl"

initPIXI();
const handlers = new Handlers();

global.mouseY = 0
global.mouseX = 0

handlers.init();
start();

/**
 * Инициализация PIXI
 */
function start(): void {
    let ress = new GameCL()
}

function initPIXI(): void {
    window.PIXI = PIXI;
    // Проверим инициализацию библиотеки PIXI
    if (PIXI === undefined) {
        throw new Error('PIXI is undefined');
    }

    window.sceneWidth = screen.width || 800;
    window.sceneHeight = screen.height || 600;

    const app = new PIXI.Application({
        width: window.sceneWidth,
        height: window.sceneHeight,
        ///transparent: true,
        forceCanvas: true,
        backgroundColor: 0xFF0000,
        view: <HTMLCanvasElement>getElement("scene")
    });
    window.renderer = app.renderer;
    window.app = app;
    window.app.stage.interactive = true;
    window.app.stage.on('pointermove', moveM)
    getElement("sceneDiv").appendChild(app.view);
}


function moveM(e){
  mouseY = e.data.global.y
  mouseX = e.data.global.x
}

function getElement(elementName: string): HTMLElement {
    return <HTMLElement>document.getElementById(elementName);
}

document.onready = function () {
    window.sizeHandler();
};
