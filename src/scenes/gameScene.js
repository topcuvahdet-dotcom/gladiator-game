class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Background
        this.add.rectangle(400, 300, 800, 600, 0x2a2a2a);
        
        // Ground
        this.ground = this.add.rectangle(400, 550, 800, 100, 0x8b7355);
        this.physics.add.existing(this.ground, true);

        // Title
        this.add.text(400, 30, 'GLADIATOR ARENA', {
            fontSize: '32px',
            fill: '#ff6b00',
            align: 'center'
        }).setOrigin(0.5);

        // Player
        this.player = new Player(this, 150, 450);
        
        // Enemy
        this.enemy = new Enemy(this, 650, 450);

        // Collision
        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.enemy.sprite, this.ground);

        // Health UI
        this.playerHealthText = this.add.text(20, 20, 'Oyuncu: 100 HP', {
            fontSize: '16px',
            fill: '#00ff00'
        });

        this.enemyHealthText = this.add.text(700, 20, 'Düşman: 100 HP', {
            fontSize: '16px',
            fill: '#ff0000',
            align: 'right'
        });

        // Update loop
        this.time.addEvent({
            delay: 100,
            callback: () => {
                this.updateHealthUI();
            },
            loop: true
        });
    }

    update() {
        this.player.update();
        this.enemy.update(this.player.sprite);

        // Collision detection for attacks
        if (this.physics.overlap(this.player.attackArea, this.enemy.sprite)) {
            if (this.player.isAttacking) {
                this.enemy.takeDamage(10);
                this.player.isAttacking = false;
            }
        }

        if (this.physics.overlap(this.enemy.attackArea, this.player.sprite)) {
            if (this.enemy.isAttacking) {
                this.player.takeDamage(10);
                this.enemy.isAttacking = false;
            }
        }

        // Game Over Check
        if (this.player.health <= 0) {
            this.add.text(400, 300, 'KAYBETTINIZ!', {
                fontSize: '48px',
                fill: '#ff0000',
                align: 'center'
            }).setOrigin(0.5);
            this.physics.pause();
        }

        if (this.enemy.health <= 0) {
            this.add.text(400, 300, 'KAZANDINIZ!', {
                fontSize: '48px',
                fill: '#00ff00',
                align: 'center'
            }).setOrigin(0.5);
            this.physics.pause();
        }
    }

    updateHealthUI() {
        this.playerHealthText.setText(`Oyuncu: ${this.player.health} HP`);
        this.enemyHealthText.setText(`Düşman: ${this.enemy.health} HP`);
    }
}
