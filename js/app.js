class BurgerGame extends Phaser.Scene
{
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
            "mayo"
        ];
    }

    preload() {
        this.load.image('wall', 'assets/img/background.png');
        // this.load.image('bun', 'assets/img/bun.png');
        // this.load.image('bun-clicked', 'assets/img/bun-clicked.png');
        // this.load.image('patty', 'assets/img/patty.png');
        // this.load.image('patty-clicked', 'assets/img/patty-clicked.png');

        var matList = this.getMaterialArray();
        matList.forEach(m => {
            this.load.image(m, `assets/img/${m}.png`);
            this.load.image(m + "-clicked", `assets/img/${m}-clicked.png`);
        });
    }

    create() {
        var bg = this.add.image(590, 410, 'wall').setScale(0.5);

        var matList = this.getMaterialArray();

        var currentX = 780;
        var currentY = 180;
        var currentIndex = 1;
        this.buttonObj = {};

        matList.forEach(m => {
            if (currentIndex == 1)
                this.buttonObj[m] = this.add.sprite(currentX, currentY, m).setScale(0.38).setInteractive();
            else if (currentIndex % 2 == 0) {
                currentX += 245;
                this.buttonObj[m] = this.add.sprite(currentX, currentY, m).setScale(0.38).setInteractive();
            } else {
                currentY += 120;
                currentX -= 245;
                this.buttonObj[m] = this.add.sprite(currentX, currentY, m).setScale(0.38).setInteractive();;
            }
            

            this.buttonObj[m].on('pointerdown', this.onMatButtonClickHanler);

            currentIndex++;
        });
       
    }

    onMatButtonClickHanler(e) {
        // console.log(e);
        console.log(this.buttonObj);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1180,
    height: 820,
    scene: [ BurgerGame ]
};

const game = new Phaser.Game(config);
