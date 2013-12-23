/* Win State */

Santa.WinState = function(game){
	
};

Santa.WinState.prototype = {
	
	create: function(){

		var image = this.add.sprite(0, 0, 'youwin');
		image.fixedToCamera = true;
	},

	update: function(){


	}
};