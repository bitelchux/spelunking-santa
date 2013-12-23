
function HealthBar(game, spawn){
		
	this.game = game;

	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'heart');

	this.animations.add('three', [0], 1, false);
	this.animations.add('two', [1], 1, false);
	this.animations.add('one', [2], 1, false);
	this.animations.play('three');

	this.fixedToCamera = true;

	SceneManager.addToScene(this);
}

HealthBar.prototype = Object.create( Phaser.Sprite.prototype );
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.set = function(amt){

	if( amt == 2 ){
		this.frame = 1;
	}
	else if(amt == 1){
		this.frame = 2;
	}
}

