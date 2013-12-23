/* Game Over State */

Santa.GameOverState = function(game){

};

Santa.GameOverState.prototype = {
	
	create: function(){
		console.log("game over")
		
		var GO = new Phaser.Sprite(this.game, 90, 100, 'gameover');
		GO.fixedToCamera = true;
		this.add.existing(GO);
	},

	update: function(){
		if( this.game.keys.ENTER.isDown ){
			//this.game.state.start('MainMenu');
			window.location = "";
		}
	}
};
