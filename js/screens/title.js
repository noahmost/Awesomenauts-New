game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
//            puts title screen up
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
                
                me.game.world.addChild(new (me.Renderable.extend({
                    
                    init: function(){
//                        this adds the text to the title screen
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
//                        this sets the font and color of the font on the title screen
                        this.font = new me.Font("Arial", 46, "white");
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
//                    this is the text displayed on the screen
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Start a New Game", this.pos.x, this.pos.y);
                    },
                    update: function(dt){
                        return true;
                    },
                    newGame: function(){
                        me.input.releasePointerEvent('pointerdown', this);
//                        remove all of the xp for these variables
                        me.save.remove('exp');
                        me.save.remove('exp1');
                        me.save.remove('exp2');
                        me.save.remove('exp3');
                        me.save.remove('exp4');
//                        go to the play screen
                        me.state.change(me.state.PLAY);
                    }
                })));
                
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});
