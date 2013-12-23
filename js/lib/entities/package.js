
function Present(game, spawn){
	
	this.game = game;

	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'package');

	this.name = 'package';
	this.anchor.setTo(0.5, 0.5);

	this.body.bounce.y = 0;
	this.body.gravity.y = 16;
	this.body.collideWorldBounds = true;
	this.body.mass = 10;
	this.body.drag = {x:200, y:10};

	this.beingHeld = false;


	SceneManager.addToScene(this);
	CollisionManager.addObjectToGroup(this, 'presents');
}

Present.prototype = Object.create(Phaser.Sprite.prototype);
Present.prototype.constructor = Present;

Present.prototype.update = function(){
	if( this.beingHeld ){

		var dir = game.player.dir;
		this.body.gravity.y = 0;

		//console.log(dir)

		if( dir == "left" ){
			this.x = this.game.player.x - 10;
			this.y = this.game.player.y - 4;
		}
		else if( dir == "right" ){
			this.x = this.game.player.x + 10;
			this.y = this.game.player.y -4;
		}
	}
	else{
		this.body.gravity.y = 16;
	}
}
