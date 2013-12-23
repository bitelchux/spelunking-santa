
function Snowman(game, spawn, range){
	
	this.game = game;

	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'snowman');

	this.name = 'snowman';
	this.anchor.setTo(0.5, 0.5);

	this.body.bounce.y = 0;
	this.body.gravity.y = 16;
	this.body.collideWorldBounds = true;
	this.body.setSize(16, 32, 0, 0);

	this.throwCoolDown = 40;
	this.throwCoolDownTimer = 0;

	this.xMin = spawn.x - range;
	this.xMax = spawn.x + range;
	this.dir = "left";
	this.state = 'moving';

	this.animations.add('right', [0, 1], 4, true);
	this.animations.add('right_throw', [2,3], 4, false);
	this.animations.add('left', [4, 5], 4, true);
	this.animations.add('left_throw', [7,6], 4, false);

	SceneManager.addToScene(this);
	CollisionManager.addObjectToGroup(this, 'snowmen');
}

Snowman.prototype = Object.create(Phaser.Sprite.prototype);
Snowman.prototype.constructor = Snowman;

Snowman.prototype.update = function(){

	var newState = "";

	if( this.x < this.xMin ){
		this.dir = "right";
	}
	if( this.x > this.xMax ){
		this.dir = "left";
	}

	//determine state
	if( Math.abs(this.x - this.game.player.x) < 100
		&& Math.abs(this.y - this.game.player.y) < 50){

		if( this.x < this.game.player.x && this.dir == "right" ){
			this.state = 'throwing';
		}
		else if( this.x > this.game.player.x && this.dir == "left" ){
			this.state = 'throwing';	
		}
		else{
			this.state = "moving";
		}

		
	}
	else{

		this.state = 'moving';
	}

	if( this.throwCoolDownTimer > 0 ){
		this.throwCoolDownTimer--;
	}


	if( this.state == 'throwing' ){
		
		if( this.throwCoolDownTimer == 0){
			this.throwCoolDownTimer = this.throwCoolDown;
			this.animations.play(this.dir + '_throw');

		}

		if( this.throwCoolDownTimer == 30 ){
			//actually create the snowball
			var snowball = new Snowball(this.game, {x:this.x, y: this.y}, this.dir);
		}
	}

	if( this.state == 'moving'){

		

		if( this.dir == "right" ){
			this.animations.play('right');
			this.body.velocity.x = 30;
		}
		else if( this.dir == "left" ){
			this.animations.play('left');
			this.body.velocity.x = -30;
		}
	}
	

	if( newState != ""){
		this.state = newState;
	}
}

Snowman.prototype.die = function(){

	//emitter
	this.game.snowEmitter.x = this.x;
	this.game.snowEmitter.y = this.y;
	this.game.snowEmitter.start(true, 5000, null, 15)

	this.game.dieSFX.play();
	CollisionManager.removeObjectFromGroup(this, 'snowmen');
	this.destroy();
}