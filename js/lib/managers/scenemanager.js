
function SceneManager(){
	
	this.objectPool = [];
}

SceneManager.prototype.addToScene = function(object){

	this.objectPool.push(object);
	game.add.existing(object);
}

SceneManager.prototype.removeFromScene = function(object){
	//TODO
}

SceneManager.prototype.update = function(){

	for( var i in this.objectPool ){

		var obj = this.objectPool[i];
		obj.update();
	}
}