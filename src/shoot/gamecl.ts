import PlayerGG from './playercl';
import BoxesCl from './boxescl';
import LoaderCl from './LoadCl';
import BulletsCl from './bulletsCl';
import EnemiesCl from './enemiescl';

import CollisionsCl from "./collisionsCl";
import Tween from "../Demo/Tween";
import { Spine } from 'pixi-spine';

export default class GameCL {

    public player: PlayerGG;
    public boxes: BoxesCl;
    public bulletsCl: BulletsCl;
    public enemies: EnemiesCl;
    public background: PIXI.TilingSprite;
    public tweens: Tween[];
    public isBul: boolean = false;
    public loader: LoaderCl;

    private backgroundTween: Tween;
    private butn: PIXI.Sprite;

    private GameStart: boolean = false;
    private PJumping: boolean = false;

    private timerCollisions: NodeJS.Timer;
    private sTimeout: NodeJS.Timeout;

constructor() {
            this.tweens = [];

            this.background = this.createBackground();

            this.butn = this.createStartBtn();

            this.loader = new LoaderCl();

            window.app.loader.onComplete.add(() => {
                this.player = new PlayerGG(this.loader.player);
                this.boxes = new BoxesCl(this);
                this.bulletsCl = new BulletsCl(this);
                this.enemies = new EnemiesCl(this, this.loader.buba);
            });

            this.CreateTicker();

            document.addEventListener('keydown', (ev) => this.onDone(ev));
        }

CreateTicker() {
    window.app.ticker.add(() => {
        if (this.GameStart) {
            this.backgroundTween.update(window.app.ticker.elapsedMS)
            for (let i = 0; i < this.tweens.length; i++) {
                if (this.tweens[i].controls[0].visible && !this.tweens[i].finished)
                    this.tweens[i].update(window.app.ticker.elapsedMS);
                else {
                    this.tweens.splice(i, 1);
                }
                if (this.GameStart) {
                    this.checkСollision();
                }
            };
        }

    })
}

createStartBtn(): PIXI.Sprite {
    let textur = PIXI.Texture.from('assets/start_btn.png')
    let butn = new PIXI.Sprite(textur);

    butn.x = window.sceneWidth / 2 - 410
    butn.y = 270
    butn.width = 820;
    butn.height = 220;
    butn.buttonMode = true;
    butn.interactive = true;

    butn.on('pointerdown', this.start_btn_cl.bind(this));
    window.app.stage.addChild(butn);
    return butn;
}

createRestartBtn(): PIXI.Sprite {
    let textur = PIXI.Texture.from('assets/restart_btn.png')
    let butn = new PIXI.Sprite(textur);

    butn.x = window.sceneWidth / 2 - 210
    butn.y = 270
    butn.width = 620;
    butn.height = 180;
    butn.buttonMode = true;
    butn.interactive = true;

    butn.on('pointerdown', this.restart_btn_cl.bind(this));
    window.app.stage.addChild(butn);
    return butn;
}

createInfo(): PIXI.Sprite {
    let textur = PIXI.Texture.from('assets/info.png')
    let info = new PIXI.Sprite(textur);

    info.x = window.sceneWidth - 350
    info.y = 1
    info.width = 340;
    info.height = 130;

    window.app.stage.addChild(info);
    return info;
}

start_btn_cl(){
  if (!this.GameStart) {
           this.start();
           this.butn.visible = false;
           let callback = this.startNewGame.bind(this)

           this.player.player.state.tracks[0].listener = {
           complete: function (trackEntry, count) {
               if ('portal' === trackEntry.animation.name) {
                   this.started = false;
                   if (this.callback) {
                       this.callback();
                   }
               }
           },
           callback: callback
       };

    callback: callback
  }
}

restart_btn_cl(){
  if (!this.GameStart) {
    location.reload();
    return false
  }
}

startNewGame() {
     this.player.player.state.timeScale = 0.6;
     this.player.player.state.setAnimation(0, 'run', true);

     this.startGenOb();

     this.backgroundTween.start(2500, undefined, -1);
 }

start() {
    this.backgroundTween = new Tween().addControl(this.background.tilePosition)
    .do({ x: [this.background.tilePosition.x, this.background.tilePosition.x - 1000] })
    this.GameStart = true;

    this.player.livesSprite.visible = true;
    this.PJumping = false;

    this.player.lives.forEach((e) => e.visible = true);
    this.player.player.visible = true;

    this.player.player.state.setAnimation(0, 'portal', false).mixDuration = 0.2;
    this.player.player.state.timeScale = 0.9;

    this.info = this.createInfo();
}

createBackground(): PIXI.TilingSprite {
    let textur = PIXI.Texture.from('assets/fon.png');
    let ress = new PIXI.TilingSprite(textur, window.sceneWidth, window.sceneHeight);
    ress.scale.set(1.4, 1.4);
    window.app.stage.addChild(ress);
    return ress;
}

onDone(e: KeyboardEvent) {
       if (this.player.player && e.code === 'KeyW' && !this.PJumping) {
           this.PJumping = true;
           this.PJump();
       }
       else if (this.player.player && e.code === 'KeyE' && !this.PJumping) {
           this.shoot();
       }
   }

checkСollision() {
       if (this.GameStart) {

         if (this.player.livesNum === 0) {
             this.EndGame();
           }

           if (this.boxes.current() && this.boxes.current().x + this.boxes.current().width < this.player.hitbx.x) {
               this.boxes.inField.shift()
           }
           else {
               if (this.boxes.inField.length &&  CollisionsCl.checkCollision(this.player.hitbx, this.boxes.current())) {
                   this.сollision(this.boxes);
               }
               if (this.enemies.inField.length && CollisionsCl.checkCollision(this.player.hitbx, this.enemies.current().hitbox)) {
                   this.enemies.current().enemy.visible = false;
                   this.сollision(this.enemies);
               }
               if (this.enemies.inField.length && this.bulletsCl.inField.length && CollisionsCl.checkCollision(this.enemies.current().hitbox, this.bulletsCl.current())) {
                   this.enemies.current().enemy.visible = false;
                   this.сollision(this.enemies, this.bulletsCl);
               }
           }
       }
   }

addTween(): Tween {
   const tween = new Tween();
   this.tweens.push(tween);
   return tween;
}

сollision(obj1: BoxesCl | EnemiesCl, obj2: BulletsCl | null = null) {

   obj1.current().visible = false;
   obj1.inField.shift();
   if (obj2) {
          obj2.current().visible = false;
          obj2.inField.shift();
   } else {
       this.player.lives[this.player. livesNum - 1].visible = false;
       this.player.livesNum--;
   }
}

shoot() {
    const ikCross = this.player.player.skeleton.ikConstraints[0].target;

    ikCross.y = window.sceneHeight - (mouseY * 1.5 )
    ikCross.x = window.sceneWidth

    this.player.player.state.setAnimation(1, 'aim', false);
    this.player.player.state.addEmptyAnimation(1, 1, 0)

    this.bulletsCl.newBullet();
    this.player.player.state.addAnimation(0, 'run', true, 0);
}

EndGame() {
        this.player.player.state.setAnimation(0, 'death', false);

        this.tweens = [];
        this.GameStart = false;
        this.backgroundTween.stop();
        this.player.livesNum = 4

       
        clearInterval(this.timerCollisions);
        clearTimeout(this.sTimeout);

        this.butn = this.createRestartBtn();
    }

PJump() {
        this.player.player.state.setAnimation(0, 'jump', false).mixDuration = 0.1;
        this.player.player.state.addAnimation(0, 'run', true, 0);
        this.addTween().addControl(this.player.hitbx)
          .do({ y: [this.player.hitbx.y, this.player.hitbx.y - 250] }, Tween.Pipe(Tween.QuadraticInOut, Tween.LinearBack))
            .start(1900, () => this.PJumping = false, 1);
    }

startGenOb() {
    if (Math.round(Math.random() * (2-1) + 1) > 1) this.boxes.newBox()
     else this.enemies.newEnen();

    this.sTimeout = setTimeout(() => {
        this.startGenOb();

    }, Math.random() * (5000 - 1000) + 1000)
}
}
