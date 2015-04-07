
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
//                these are all variables that i can set in entites.js
//edited values
		score : 0,
                option1: "",
                option2: "",
                EnemyBaseHealth: 10,
                playerBaseHealth: 10,
                enemyCreepHealth: 10,
                playerHealth: 10,
                enemyCreepAttack: 1,
                playerAttack: 1,
                playerAttackTimer: 1000,
                enemyCreepAttackTimer: 1000,
                playerMoveSpeed: 10,
                creepMoveSpeed: 8,
                gameTimerManager: "",
                heroDeathManager: "",
                spearTimer: 1,
                player: "",
                exp: 0,
                gold: 0,
                ability1: 0,
                ability2: 0,
                ability3: 0,
                skill1: 0,
                skill2: 0,
                skill3: 0,
                exp1: 0,
                exp2: 0,
                exp3: 0,
                exp4: 0,
                win: "",
                pausePos: "",
                buyscreen: "",
                buytext: "",
                minimap: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
//        this edits the video screen to make it bigger
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        
        me.state.SPENDEXP = 112;
        me.state.LOAD = 113;
        me.state.NEW = 114;
        
	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
//            this registers the player so he is in the map
                me.pool.register("player", game.PlayerEntity, true);
//                these add the base entities
                me.pool.register("PlayerBase", game.PlayerBaseEntity);
                me.pool.register("EnemyBase", game.EnemyBaseEntity);
//                adds the creep
                me.pool.register("EnemyCreep", game.EnemyCreep, true);
//                added game managers
                me.pool.register("GameTimerManager", game.GameTimerManager);
                me.pool.register("HeroDeathManager", game.HeroDeathManager);
                me.pool.register("ExperienceCardinal", game.ExperienceCardinal);
//                built spendgold manager
                me.pool.register("SpendGold", game.SpendGold);
                me.pool.register("spear", game.SpearThrow);
                me.pool.register("minimap", game.MiniMap, true);
                
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
//                this goes to the exp screen
                me.state.set(me.state.SPENDEXP, new game.SpendExp());
//                loads the screens
                me.state.set(me.state.LOAD, new game.LoadProfile());
                me.state.set(me.state.NEW, new game.NewProfile());

		// Start the game. starts menu
		me.state.change(me.state.MENU);
	}
};
