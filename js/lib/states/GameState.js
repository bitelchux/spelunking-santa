/* Game State */

Santa.GameState = function(game){
	
};

Santa.GameState.prototype = {

	create: function(){

		if(level == 1){
			this.game.music = this.game.add.audio('gamemusic',1,true);
			this.game.music.volume = 0.3;
			this.game.music.play('',0,0.3,true);
		}
		else{
			this.stage = null;
			this.stage = new Phaser.Stage(this.game, 352, 240);
			CollisionManager.purge();
		}

		this.game.add.sprite(0, 0, 'background');

		var map = this.game.add.tilemap('level' + level);
		map.addTilesetImage('snowy', 'snowy');
		map.setCollisionByIndex(1);
		map.setCollisionByIndex(2);
		map.setCollisionByIndex(3);
		map.setCollisionByIndex(4);
		map.setCollisionByIndex(5);
		map.setCollisionByIndex(6);
		this.game.map = map;
		var layer = map.createLayer(0);
		//layer.debug = true;
		layer.resizeWorld();
		this.game.layer = layer;

		CollisionManager.addObjectToGroup(layer, "maps");

		this.game.player = new Player(this.game, {x:40, y:1200});
		this.game.present = new Present(this.game, {x:180,y:1100});

		this.game.dieSFX = this.game.add.audio('die');

		this.game.snowEmitter = game.add.emitter(0, 0, 200);
		this.game.snowEmitter.makeParticles('snow');
		this.game.snowEmitter.gravity = 8;

		this.game.sleigh = new Phaser.Sprite(this.game, 275, 40, 'sleigh');
		this.game.sleigh.body.immovable = true;
		SceneManager.addToScene(this.game.sleigh);
		CollisionManager.addObjectToGroup(this.game.sleigh, "goal");

		this.game.snowmen = [];

		if(level == 1 ){
			this.game.snowmen[0] = new Snowman(this.game, { x: 135, y: 975}, 50);
			this.game.snowmen[1] = new Snowman(this.game, { x: 111, y: 847 }, 20);
			this.game.snowmen[2] = new Snowman(this.game, { x: 96, y: 687 }, 10);
			this.game.snowmen[3] = new Snowman(this.game, { x: 80, y: 495 }, 20);
			this.game.snowmen[4] = new Snowman(this.game, { x: 228,  y: 335 }, 30);
			this.game.snowmen[5] = new Snowman(this.game, { x: 113, y: 207 }, 20);
			this.game.snowmen[6] = new Snowman(this.game, { x: 206, y: 79 }, 20);
		}

		if( level == 2 ){
			sn1 = new Snowman(this.game, { x: 93,  y: 1071}, 50);
			sn2 = new Snowman(this.game, { x: 209, y: 879 }, 50);
			sn3 = new Snowman(this.game, { x: 215, y: 687 }, 50);
			sn4 = new Snowman(this.game, { x: 75,  y: 399 }, 20);
			sn5 = new Snowman(this.game, { x: 207, y: 271 }, 20);
			sn6 = new Snowman(this.game, { x: 77,  y: 175 }, 20);
		}

		if( level == 3 ){
			sn1 = new Snowman(this.game, { x: 158, y: 943 }, 50);
			sn2 = new Snowman(this.game, { x: 157, y: 751 }, 40);
			sn3 = new Snowman(this.game, { x: 157, y: 559 }, 40);
			sn4 = new Snowman(this.game, { x: 128, y: 399 }, 40);
			sn5 = new Snowman(this.game, { x: 206, y: 207 }, 30);
			sn6 = new Snowman(this.game, { x: 209, y: 79  }, 30);
		}

		if( level ==4 ){
			sn1 = new Snowman(this.game, { x: 172, y: 943 }, 50);
			sn2 = new Snowman(this.game, { x: 157, y: 719 }, 50);
			sn3 = new Snowman(this.game, { x: 103, y: 399 }, 50);
			sn4 = new Snowman(this.game, { x: 191, y: 207 }, 50);
		}
		
		//health bar
		this.game.healthbar = new HealthBar(this, {x:0, y:0});

		this.game.camera.follow(this.game.player);
	},

	update: function(){

		CollisionManager.update();
	}
};
