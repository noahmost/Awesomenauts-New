game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
//                this loads the level
                me.levelDirector.loadLevel("level01");
                this.resetPlayer(0, 420);

//                set variable game manager
                var gamemanager = me.pool.pull("GameManager", 0, 0, {});
                me.game.world.addChild(gamemanager, 0);
                
//                this binds the key to press so the champion moves around
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
//                bound key for jumping
                me.input.bindKey(me.input.KEY.SPACE, "jump");
//                this binds the a key to attack
                me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
            //                this adds the player to the world
                game.data.player = me.pool.pull("player", x, y, {});
                me.game.world.addChild(game.data.player, 5);
        }
        
});
