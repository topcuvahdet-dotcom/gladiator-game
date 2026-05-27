class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.health = 100;
        this.isAttacking = false;
        this.attackCooldown = 0;

        // Create sprite (simple rectangle for now)
        this.sprite = scene.add.rectangle(x, y, 40, 60, 0xff3300);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setBounce(0.2);
        this.sprite.body.setCollideWorldBounds(true);

        // Attack area
        this.attackArea = scene.add.zone(x - 50, y, 40, 60);
        scene.physics.world.enable(this.attackArea);
    }

    update(playerSprite) {
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y,
            playerSprite.x, playerSprite.y
        );

        // AI Logic
        if (distanceToPlayer < 300) {
            // Chase player
            if (playerSprite.x > this.sprite.x) {
                this.sprite.body.setVelocityX(150);
            } else {
                this.sprite.body.setVelocityX(-150);
            }

            // Jump if close
            if (distanceToPlayer < 150 && this.sprite.body.touching.down) {
                this.sprite.body.setVelocityY(-200);
            }

            // Attack if very close
            if (distanceToPlayer < 100 && this.attackCooldown <= 0) {
                this.attack();
                this.attackCooldown = 60;
            }
        } else {
            // Patrol
            this.sprite.body.setVelocityX(0);
        }

        // Cooldown
        if (this.attackCooldown > 0) {
            this.attackCooldown--;
        }

        // Update attack area position
        this.attackArea.x = this.sprite.x - 50;
        this.attackArea.y = this.sprite.y;
    }

    attack() {
        this.isAttacking = true;

        // Visual feedback
        this.sprite.setFillStyle(0xffaa00);

        setTimeout(() => {
            this.sprite.setFillStyle(0xff3300);
        }, 100);

        setTimeout(() => {
            this.isAttacking = false;
        }, 200);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;

        // Visual feedback
        this.sprite.setFillStyle(0xffffff);
        setTimeout(() => {
            this.sprite.setFillStyle(0xff3300);
        }, 100);
    }
}
