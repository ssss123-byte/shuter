import Game from "./game";
import { Spine } from 'pixi-spine';

export default class Enemy {
    public hitbox: PIXI.Sprite;
    public enemy: Spine;
    public game: Game;

    get visible() {
        return this.hitbox.visible;
    }

    set visible(value) {
        this.hitbox.visible = value;
    }

    constructor(game: Game, buba: Spine) {
        this.game = game;
        let e = new PIXI.Sprite(PIXI.Texture.EMPTY);

        e.width = 180;
        e.y = window.sceneHeight / 2.5

        e.visible = false;
        e.height = 250;

        this.hitbox = e;
        window.app.stage.addChild(e);

        const animation = new Spine(buba.spineData);

        animation.x = window.sceneWidth
        animation.y = e.y + 180

        animation.visible = false;
        animation.width = -animation.width
        animation.state.setAnimation(0, 'buba_go', true);
        animation.state.timeScale = 0.4;
        this.enemy = animation
        window.app.stage.addChild(animation);
    }

    start() {
        this.enemy.visible = true;
        this.hitbox.visible = true;

        
        this.game.addTween().addControl(this.hitbox)
            .do({ x: [window.sceneWidth, 0 - this.hitbox.width] }).start(3000, this.game.enemies.inField.shift, 1);

        
        this.game.addTween().addControl(this.enemy)
            .do({ x: [window.sceneWidth - this.enemy.width / 3, 0 - this.hitbox.width] }).start(3000, undefined, 1);

    }

}
