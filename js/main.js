

//var width = document.body.clientWidth;
//var height = document.body.clientHeight;
var width = 352;
var height = 240;
var level = 1;


var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-example');

var SceneManager = new SceneManager();
var CollisionManager = new CollisionManager(game);

game.state.add('Boot', Santa.BootState);
game.state.add('Loader', Santa.LoaderState);
game.state.add('MainMenu', Santa.MainMenuState);
game.state.add('Game', Santa.GameState);
game.state.add('GameOver', Santa.GameOverState);
game.state.add('Win', Santa.WinState);
game.state.add('LevelTransition', Santa.LevelTransitionState);

game.state.start('Boot');

window.game = game;



