/* Main Menu State */

Santa.MainMenuState = function(game){
	this.starting = false;
};

Santa.MainMenuState.prototype = {

	create: function(){

		this.titlemusic = this.game.add.audio('titlemusic');
		this.titlemusic.volume -= .5;
		this.titlemusic.play();

		this.goSFX = this.game.add.audio('ding');
		this.goSFX.volume = 0.2;

		this.add.sprite(0, 0, 'mainmenu');
		this.backgroundColor = 0x337799;
	
		for( var i = 0; i < 352; i += 75 ){
			var p = this.add.emitter(i, -10, 2000);
			p.makeParticles('snow');
			p.gravity = 1;
			p.maxParticleSpeed.setTo(20, -100);
			p.minParticleSpeed.setTo(-20, -50);
			p.minRotation = 0;
			p.maxRotation = 0;
			p.start(false, 10000, 50);
		}

		this.counter = 0;

		this.game.blinker = this.add.sprite(120, 170, 'pressenter');
		this.game.blinker.visible = false;

	},
	update: function(){

		this.counter++;
		if( this.counter % 25 == 0 && this.counter > 100){
			this.game.blinker.visible = !this.game.blinker.visible;
		}

		if( this.game.keys.ENTER.isDown ){

			this.starting = true;
			this.goSFX.play();

		}

		//fade out
		if( this.starting == true ){
			this.titlemusic.volume -=.005;
		}

		if( this.titlemusic.volume <= 0){
			this.starting = false;
			this.titlemusic.stop();
			this.game.state.start('LevelTransition');
		}
	}
};