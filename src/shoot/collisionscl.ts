export default class CollisionsCl {

    static checkCollision(obj1: PIXI.Sprite | PIXI.Container, obj2: PIXI.Sprite | PIXI.Container) {
        
        return  obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x
            && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;
    }
}
