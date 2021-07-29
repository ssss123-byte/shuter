import { Spine } from 'pixi-spine';

export default class PlayerGG {

    public player: Spine;
    public hitbx: PIXI.Sprite;
    public lives: PIXI.Sprite[] = [];

    public livesSprite: PIXI.Container = new PIXI.Container()
    public livesNum: number = 3

    constructor(player: Spine) {
        this.player = player;
        window.app.stage.addChild(player);
        this.player.visible = false

        this.createHitbox();
        this.createLives();

        this.livesSprite.visible = false;
    }

    createHitbox() {
        let hitbx = new PIXI.Sprite(PIXI.Texture.EMPTY);

        hitbx.x = this.player.x - this.player.width / 2;
        hitbx.y = window.sceneHeight / 2;
        hitbx.width = this.player.width - 80;
        hitbx.height = this.player.height / 1.7;

        this.hitbx = hitbx;
        window.app.stage.addChild(hitbx);
    }

    createLives() {
        for (let i = 0; i < 3; i++) {
            let textur = PIXI.Texture.from('assets/live.png');
            let ress = new PIXI.Sprite(textur);

            ress.width = 64;
            ress.height = 64;
            ress.x = 5 + i * 72

            this.lives.push(ress);
            this.livesSprite.addChild(ress);

            window.app.stage.addChild(this.livesSprite);
        }
    }
}
