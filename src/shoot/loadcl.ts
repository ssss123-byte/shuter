import { Spine } from 'pixi-spine';

export default class LoaderCl {
    public buba: Spine;
    public player: Spine;

    constructor() {
        this.loadData();
    }

    loadData() {
        let spineLoaderOptions = { metadata: { spineSkeletonScale: 0.6 } };
        let spineLoaderOptions_buba = { metadata: { spineSkeletonScale: 0.6 } };

        window.app.loader
            .add('spineCharacter', 'assets/spineboy-pro.json', spineLoaderOptions)
            .add('spineBuba', 'assets/buba.json', spineLoaderOptions_buba)
            .load((loader, resources) => {
                const animation = new Spine(resources.spineCharacter.spineData);
                animation.x = window.app.screen.width / 2 - 300;
                animation.y = window.app.screen.height / 3 * 2 + 200;
                this.player = animation;

                const animation_en = new Spine(resources.spineBuba.spineData);
                this.buba = animation_en;
            })
    }
}
