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
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                
                var experienceCardinal = me.pool.pull("ExperienceCardinal", 0, 0, {});
                me.game.world.addChild(experienceCardinal, 0);
//                built the variable spendgold
                var spendGold = me.pool.pull("SpendGold", 0, 0, {});
                me.game.world.addChild(spendGold, 0);
                
                game.data.minimap = me.pool.pull("minimap", 10,10, {});
                me.game.world.addChild(game.data.minimap, 30);
                
                me.input.bindKey(me.input.KEY.B, "buy");
                me.input.bindKey(me.input.KEY.Q, "skill1");
                me.input.bindKey(me.input.KEY.W, "skill2");
                me.input.bindKey(me.input.KEY.E, "skill3");
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
                me.game.world.addChild(game.data.player, 7);
                game.data.miniPlayer = me.pool.pull("miniplayer", 10,10, {});
                me.game.world.addChild(game.data.miniPlayer, 31);
        }
        
});
