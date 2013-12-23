

function Player(game, spawn){
	
	this.game = game;

	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'santa');

	this.name = "player";
	this.anchor.setTo(0.5, 0.5);

	this.speed = 90;
	this.dir = "right";
	this.holding = false;
	this.jumping = false;
	this.damaged = false;
	this.health = 3;
	this.jumpSFX = this.game.add.audio('jump');
	this.hurtSFX = this.game.add.audio('hurt');

	this.body.bounce.y = 0;
	this.body.gravity.y = 16;
	this.body.collideWorldBounds = true;
	this.body.setSize(16, 32, 0, 0);

	this.jumpVelocity = 450;

	this.jumpCount = 0;
	this.jumpCoolDown = 40;
	this.jumpCoolDownTimer = 0;

	this.actionCoolDown = 20;
	this.actionCoolDownTimer = 0;

	this.damageCoolDown = 30;
	this.damageCoolDownTimer = 0;

	this.animations.add('right_idle', [0], 1, true);
	this.animations.add('right_run',  [1, 2], 6, true);
	this.animations.add('right_holding', [3, 4], 6, true);
	this.animations.add('right_holding_idle', [5], 1, true);
	this.animations.add('right_holding_jump', [6], 1, true);
	this.animations.add('right_jump', [7], 1, true);

	this.animations.add('left_idle', [8], 1, true);
	this.animations.add('left_run',  [9, 10], 6, true);
	this.animations.add('left_holding', [11, 12], 6, true);
	this.animations.add('left_holding_idle', [13], 1, true);
	this.animations.add('left_jump', [14], 1, true);
	this.animations.add('left_holding_jump', [15], 1, true);

	this.animations.add('blank', [16], 1, true);
	

	SceneManager.addToScene(this);
	CollisionManager.addObjectToGroup(this, 'players');


}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

	console.log(this.position);
	
	if( !this.damaged){
		//Player Movement
		if( this.game.keys.MOVE_LEFT.isDown ){

			this.dir = "left";

			if( this.holding ){
				this.animations.play(this.dir + '_holding');
			}
			else{
				this.animations.play(this.dir + '_run');
			}
			
			this.body.velocity.x = -this.speed;
		}
		else if( game.keys.MOVE_RIGHT.isDown ){

			this.dir = "right";
			
			if( this.holding ){
				this.animations.play(this.dir + '_holding');
			}
			else{
				this.animations.play(this.dir + '_run');
			}

			this.body.velocity.x = this.speed;
		}
		else{

			if( this.holding ){
				this.animations.play(this.dir + '_holding_idle');	
			}
			else{
				this.animations.play(this.dir + '_idle');	
			}
			
			this.body.velocity.x = 0;
		}
	}
	else{

		if( !this.holding ){
			if( this.damageCoolDownTimer % 2 == 0 ){
				this.animations.play('blank');	
			}
			else{
				this.animations.play(this.dir + '_jump');		
			}
		}
		else{
			if( this.damageCoolDownTimer % 2 == 0){
				this.animations.play('blank');
			}
			else{
				this.animations.play(this.dir + '_holding_jump');
			}
		}
		
	}
	


	//Jumping
	if( this.game.keys.JUMP.isDown 
		&& this.jumpCoolDownTimer == 0 
		&& this.body.velocity.y < 15
		&& !this.damaged ){

		this.jumpSFX.play();
		this.jumpCoolDownTimer = this.jumpCoolDown;
		this.body.velocity.y = -this.jumpVelocity;
		this.jumping = true;
	}

	//reset jumping
	if( this.jumping ){
		if( this.body.velocity.y == 0){
			this.jumping = false;
		}
		else{
			if( this.holding ){ this.animations.play(this.dir + '_holding_jump'); }
			else{ this.animations.play(this.dir + '_jump'); }
		}
	}

	//handle presents
	if( this.game.keys.ACTION.isDown && this.actionCoolDownTimer == 0 && !this.damaged){

		this.actionCoolDownTimer = this.actionCoolDown;
		if( this.holding ){
			//throw present
			this.holding = false;
			this.game.present.beingHeld = false;

			if(this.dir == "left"){
				this.game.present.body.velocity.x = -200;
				this.game.present.body.velocity.y = -200;
			}
			else if(this.dir == "right"){
				this.game.present.body.velocity.x = 200;
				this.game.present.body.velocity.y = -200;
			}
		}
		else{
			//check to see if present is close
			if( this.game.present.y - this.y < 15 
				&& Math.abs(this.game.present.x - this.x) < 10 ) {
				
				this.holding = true;
				this.game.present.beingHeld = true;
			}
		}

	}


	//Timers
	if( this.actionCoolDownTimer > 0 ){
		this.actionCoolDownTimer--;
	}

	if( this.jumpCoolDownTimer > 0 ){
		this.jumpCoolDownTimer--;
	}

	if( this.damageCoolDownTimer > 0 ){
		if( this.damageCoolDownTimer == 1){
			this.damaged = false;
		}
		this.damageCoolDownTimer--;
	}

}

Player.prototype.damage = function(amt){

	this.health -= amt;

	this.game.healthbar.set(this.health);

	console.log(this.health);

	if(this.health == 0){

		this.game.music.stop();
		this.game.state.start('GameOver');
	}

	this.hurtSFX.play();

	if( this.body.touching.left ){

		this.damaged = true;
		this.damageCoolDownTimer = this.damageCoolDown;
		this.body.velocity.x = 100;
		this.body.velocity.y = -300;
	}
	else if( this.body.touching.right ){

		this.damaged = true;
		this.damageCoolDownTimer = this.damageCoolDown;
		this.body.velocity.x = -100;
		this.body.velocity.y = -300;
	}
}