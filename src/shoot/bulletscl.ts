import Game from "./game";

export default class BulletsCl {
    public inField: PIXI.Sprite[] = [];

    private bulletsArr: PIXI.Sprite[] = [];
    private ind: number = -1;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.createBulletArr();
    }

    createBulletArr() {
        for (let i = 0; i < 4; i++) {
            let t = PIXI.Texture.from('assets/bull.png');
            let e = new PIXI.Sprite(t);

            e.width = 35;
            e.height = 35;

            e.y = this.game.player.player.height + 150
            e.x = 0;
            e.visible = false;
            window.app.stage.addChild(e);
            this.bulletsArr.push(e);
        }
    }

    current(): PIXI.Sprite {
        return this.inField[0];
    }

    newBullet() {
        let conf_bull :int = 0 

        if (mouseY > window.sceneHeight / 3) conf_bull = 100
         else conf_bull = 200

        this.ind = this.ind === 3 ? 0 : this.ind + 1;
        this.bulletsArr[this.ind].visible = true
        this.inField.push(this.bulletsArr[this.ind]);

        
        this.game.addTween().addControl(this.bulletsArr[this.ind])
            .do({ x: [this.game.player.player.x + 160, window.sceneWidth + 200] }).start(800, this.inField.shift, 1);
           
        this.game.addTween().addControl(this.bulletsArr[this.ind])
            .do({ y: [(this.game.player.player.y/1.7) + (mouseY / (this.game.player.player.y/2) * conf_bull), mouseY] }).start(800, undefined, 1);
    }
}
