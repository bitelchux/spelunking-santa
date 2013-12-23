
Santa.LevelTransitionState = function(game){
	
	this.counter = 100;
};

Santa.LevelTransitionState.prototype = {

	create: function(){

		var card = this.add.sprite(0, 0, 'level' + level + 'text');
		card.fixedToCamera = true;
	},

	update : function(){

		this.counter--;

		if(this.counter == 0){
			//reset the counter;
			this.counter = 100;
			this.game.state.start('Game');
		}
	}
};