
function CollisionManager(game){
	
	this.game = game;

	this.groups = {
		  players: []
		, maps: []
		, snowmen: []
		, presents: []
		, snowballs: []
		, goal: []
	};
}

CollisionManager.prototype.addObjectToGroup = function(object, group){

	var arr = this.groups[group];
	arr.push(object);
}

CollisionManager.prototype.removeObjectFromGroup = function(object, group){

	var arr = this.groups[group];

	if(~~arr.indexOf(object)){
		arr.splice(arr.indexOf(object), 1);
	}
}

CollisionManager.prototype.purge = function(){

	this.groups.players = [];
	this.groups.maps = [];
	this.groups.sownmen = [];
	this.groups.present = [];
	this.groups.snowballs = [];
	this.groups.goal = [];
}

CollisionManager.prototype.update = function(){

	//collide player and map
	for( var i in this.groups.players ){
		var player = this.groups.players[i]
		for( var j in this.groups.maps ){
			var map = this.groups.maps[j];
			this.game.physics.collide(player, map);
		}
	}

	//collide presents and map
	for( var i in this.groups.presents ){
		var present = this.groups.presents[i];
		for( var j in this.groups.maps ){
			var map = this.groups.maps[j];
			this.game.physics.collide(present, map);
		}
	}

	//collide player and snowmen
	for( var i in this.groups.players ){
		var player = this.groups.players[i];
		for( var j in this.groups.snowmen ){
			var snowman = this.groups.snowmen[j];
			this.game.physics.collide(player, snowman, function(){
				player.damage(1);
			});
		}
	}

	//collide presents and snowmen
	for( var i in this.groups.presents ){
		var present = this.groups.presents[i];
		for( var j in this.groups.snowmen ){
			var snowman = this.groups.snowmen[j];
			this.game.physics.collide(present, snowman, function(){
				if( Math.abs(present.body.velocity.x) > 1 
					|| Math.abs(present.body.velocity.y) > 1 ){
					
					snowman.die();
					//present.body.velocity.x = 0;
				}
			});
		}
	}

	//collide player and snowballs
	for( var i in this.groups.players ){
		var player = this.groups.players[i];
		for( var j in this.groups.snowballs ){
			var snowball = this.groups.snowballs[j];
			this.game.physics.collide(player, snowball, function(){
				player.damage(1);
				snowball.die();
			});
		}
	}

	//collide snowmen and map
	for( var i in this.groups.snowmen ){
		var snowman = this.groups.snowmen[i];
		for( var j in this.groups.maps ){
			var map = this.groups.maps[j];
			this.game.physics.collide(snowman, map);
		}
	}

	for( var i in this.groups.players ){
		var player = this.groups.players[i];
		for( var j in this.groups.goal ){
			var goal = this.groups.goal[j];
			this.game.physics.collide(player, goal, function(){
				if( player.holding ){
					level++;
					
					if(level < 5){
						player.game.state.start('LevelTransition');	
					}
					else{
						player.game.state.start('Win');
					}
				}
			})
		}
	}
}