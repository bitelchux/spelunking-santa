/* Loader State */

Santa.LoaderState = function(game){
	
	this.ready = false;
	this.counter = 300;
}

Santa.LoaderState.prototype = {

	preload: function(){

		this.add.sprite(125, 75, 'loading');

		this.preloadBar = this.add.sprite(125, 100, 'loading-screen');
		this.load.setPreloadSprite(this.preloadBar);

		//IMAGES
		for( var i = 0; i < Resources.Loader.images.length; i++){
			var obj = Resources.Loader.images[i];
			this.game.load.image(obj.name, obj.path);
		}

		//TILEMAPS
		for( var j = 0; j < Resources.Loader.tilemaps.length; j++){
			var obj = Resources.Loader.tilemaps[j];
			this.game.load.tilemap(obj.name, obj.path, null, Phaser.Tilemap.TILED_JSON);
		}

		//TILESETS
		for( var h = 0; h < Resources.Loader.tilesets.length; h++ ){
			var obj = Resources.Loader.tilesets[h];
			this.game.load.tileset(obj.name, obj.path, obj.width, obj.height, 0, 0, 2, 7, 14);
		}

		//SPRITE
		for( var k = 0; k < Resources.Loader.spritesheets.length; k++ ){
			var obj = Resources.Loader.spritesheets[k];
			this.game.load.spritesheet(obj.name, obj.path, obj.width, obj.height);
		}

		for( var l = 0; l < Resources.Loader.sounds.length; l++){
			var obj = Resources.Loader.sounds[l];
			this.game.load.audio(obj.name, obj.path);
		}
	},
	create: function(){

		
	},
	update: function(){

		if( this.counter == 0 ){
			this.ready = true;
			this.game.state.start('MainMenu');
		}
		else{
			this.counter--;
		}
	}
};