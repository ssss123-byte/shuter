import Game from "./game";

export default class BoxesCl {
    public inField: PIXI.Sprite[] = [];

    private boxes: PIXI.Sprite[] = [];

    private ind: number = -1;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.createBoxesArr();
    }

    createBoxesArr() {
        for (let i = 0; i < 3; i++) {
            let textur = PIXI.Texture.from('assets/box.jpg');
            let e = new PIXI.Sprite(textur);

            e.width = 160;
            e.height = 160;

            e.x = window.sceneWidth;
            e.y = (window.sceneHeight - window.sceneHeight / 1.5) + 390; // 390 высота героя
            e.visible = false;
            window.app.stage.addChild(e);
            this.boxes.push(e);
        }
    }

    current(): PIXI.Sprite {
        return this.inField[0];
    }

    newBox() {
        this.ind = this.ind === 2 ? 0 : this.ind + 1;
        this.boxes[this.ind].visible = true;
        this.inField.push(this.boxes[this.ind]);
        let ress = this.game.addTween().addControl(this.boxes[this.ind])
            .do({ x: [window.sceneWidth, -250] })
        ress.start(2900,
            () => {
                if (this.inField.includes(ress.controls[0]))
                    this.inField.shift()
            }, 1);
    }


}
