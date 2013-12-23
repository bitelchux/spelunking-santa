
function Snowball(game, spawn, dir){
	
	this.game = game;

	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'snowball');

	this.anchor.setTo(0.5, 0.5);
	this.body.gravity.y = 16;

	this.life = 200;

	if(dir == "left"){
		this.body.velocity.x = -200;
		this.body.velocity.y = -200;
	}
	else if(dir == "right"){
		this.body.velocity.x = 200;
		this.body.velocity.y = -200;
	}

	SceneManager.addToScene(this);
	CollisionManager.addObjectToGroup(this, 'snowballs');
}

Snowball.prototype = Object.create(Phaser.Sprite.prototype);
Snowball.prototype.constructor = Snowball;

Snowball.prototype.update = function(){

	this.life--;

	if(this.life == 0){
		this.destroy();
	}
}

Snowball.prototype.die = function(){

	CollisionManager.removeObjectFromGroup(this, 'snowballs');
	this.destroy();
}