class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.health = 100;
        this.isAttacking = false;
        this.isJumping = false;

        // Create sprite (simple rectangle for now)
        this.sprite = scene.add.rectangle(x, y, 40, 60, 0x0066ff);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setBounce(0.2);
        this.sprite.body.setCollideWorldBounds(true);

        // Attack area
        this.attackArea = scene.add.zone(x + 50, y, 40, 60);
        scene.physics.world.enable(this.attackArea);

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Movement
        if (this.cursors.left.isDown) {
            this.sprite.body.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.sprite.body.setVelocityX(200);
        } else {
            this.sprite.body.setVelocityX(0);
        }

        // Jump
        if (this.spaceKey.isDown && this.sprite.body.touching.down) {
            this.sprite.body.setVelocityY(-300);
        }

        // Attack
        if (this.cursors.up.isDown && !this.isAttacking) {
            this.attack();
        }

        // Update attack area position
        this.attackArea.x = this.sprite.x + 50;
        this.attackArea.y = this.sprite.y;
    }

    attack() {
        this.isAttacking = true;
        
        // Visual feedback
        this.sprite.setFillStyle(0xff6600);
        
        setTimeout(() => {
            this.sprite.setFillStyle(0x0066ff);
        }, 100);

        setTimeout(() => {
            this.isAttacking = false;
        }, 200);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        
        // Visual feedback
        this.sprite.setFillStyle(0xff0000);
        setTimeout(() => {
            this.sprite.setFillStyle(0x0066ff);
        }, 100);
    }
}
