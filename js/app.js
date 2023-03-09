class BurgerGame extends Phaser.Scene {
    self;
    bottomLineY = 715;
    MAX_SLICE = 12;
    sliceArray = [];

    constructor() {
        super();
    }

    getMaterialArray() {
        return [
            "bun",
            "patty",
            "tomato",
            "lettuce",
            "bacon",
            "onion",
            "cheese",
            "pickle",
            "ketchup",
            "mayo",
        ];
    }

    preload() {
        this.load.image("wall", "assets/img/background.png");
        var matList = this.getMaterialArray();
        matList.forEach((m) => {
            this.load.image(m, `assets/img/${m}.png`);
            this.load.image(m + "-clicked", `assets/img/${m}-clicked.png`);
            this.load.image(m + "-slice", `assets/img/${m}slice.png`);
        });
        this.load.image("reset", "assets/img/refresh.png");
    }

    create() {
        self = this;

        this.add.image(590, 410, "wall").setScale(0.5);

        var matList = this.getMaterialArray();

        var currentX = 780;
        var currentY = 180;
        var currentIndex = 1;
        this.buttonObj = {};

        matList.forEach((m) => {
            if (currentIndex == 1)
                this.buttonObj[m] = this.add
                    .sprite(currentX, currentY, m)
                    .setScale(0.38)
                    .setData("name", m)
                    .setInteractive();
            else if (currentIndex % 2 == 0) {
                currentX += 245;
                this.buttonObj[m] = this.add
                    .sprite(currentX, currentY, m)
                    .setScale(0.38)
                    .setData("name", m)
                    .setInteractive();
            } else {
                currentY += 120;
                currentX -= 245;
                this.buttonObj[m] = this.add
                    .sprite(currentX, currentY, m)
                    .setScale(0.38)
                    .setData("name", m)
                    .setInteractive();
            }

            this.buttonObj[m].on("pointerdown", this.onMatButtonClickHanler);
            currentIndex++;
        });

        // add reset button
        this.resetButton = this.add.sprite(500, 650, "reset").setScale(0.4).setInteractive();
        this.resetButton.visible = false;
        this.resetButton.on("pointerdown", this.onResetButtonClickHandler);


    }

    onMatButtonClickHanler() {
        setTimeout(() => {
            this.setTexture(this.getData("name"));
        }, 100);
        this.setTexture(this.getData("name") + "-clicked");

        if (self.sliceArray.length <= 12) {
            var sliceName = this.getData("name") + "-slice";
            self.addSlice(sliceName);
        } else {
            self.resetButton.visible = true;
        }
    }

    onResetButtonClickHandler() {
        console.log(self.sliceArray);
        self.sliceArray.forEach(s => {
            s.destroy();
        });
        self.sliceArray = [];

        self.bottomLineY = 715;
        this.visible = false;

        console.log(self.sliceArray);
    }

    addSlice(sliceName) {
        if (this.sliceArray.length > 0) {
            var topSlice = this.sliceArray[this.sliceArray.length - 1];
            console.log(topSlice.getHeight());
            this.sliceArray.push(new Slice(this, 315, 200, sliceName, this.bottomLineY - topSlice.getHeight() * 0.3));
            this.physics.world.enable(this.sliceArray);
            this.bottomLineY -= topSlice.getHeight() * 0.3;
        } else {
            this.sliceArray.push(new Slice(this, 315, 200, sliceName, this.bottomLineY));
            this.physics.world.enable(this.sliceArray);
        }

    }
}

class Slice extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sliceName, bottomLineY) {
        super(scene, x, y, sliceName);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.3);
        this.setInteractive();

        this.setBounce(1, 0.2);
        this.setCollideWorldBounds(true);
        this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(120, 0, 400, bottomLineY));

        this.body.onWorldBounds = true;

        this.setVelocity(0, 500);

        // scene.add.graphics()
        //     .lineStyle(5, 0x00ffff, 0.5)
        //     .strokeRectShape(this.body.customBoundsRectangle);

    }

    getHeight() {
        return this.height;
    }
}

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1180,
    height: 820,
    scene: [BurgerGame],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
