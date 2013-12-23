/* Boot State */

Santa = {};

Santa.BootState = function(game){};

Santa.BootState.prototype = {
	
	preload: function(){

		for( var i = 0; i < Resources.Boot.images.length; i++){

			var obj = Resources.Boot.images[i];
			this.game.load.image(obj.name, obj.path);
		}
	},
	create: function(){

		//keys
		this.game.keys = {};
		this.game.keys.MOVE_LEFT 	= game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.game.keys.MOVE_RIGHT 	= game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.game.keys.ACTION 		= game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.game.keys.JUMP 		= game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.game.keys.ENTER		= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		//scaling and stuff
		this.game.stage.scale.width = 640;
		this.game.stage.scale.height = 480;
		this.game.stage.scale.refresh();
		
		//Phaser.Canvas.setSmoothingEnabled(this.game.context, false);

		this.game.state.start('Loader');
	}
}