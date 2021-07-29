import Game from "./game";
import Enemy from "./Enemycl";
import { Spine } from 'pixi-spine';


export default class Enemies {

    public inField: Enemy[] = [];

    private enemies: Enemy[] = [];
    private ind: number = -1;
    private game: Game;

    constructor(game: Game, buba: Spine) {
        this.game = game;
        for (let i = 0; i < 4; i++) {
            this.enemies.push(new Enemy(this.game, buba));
        }
    }

    current(): Enemy {
        return this.inField[0];
    }

    newEnen() {
        this.ind = this.ind === 3 ? 0 : this.ind + 1;
        this.inField.push(this.enemies[this.ind]);
        this.enemies[this.ind].start();

    }
}
