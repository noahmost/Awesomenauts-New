game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
//            puts title screen up
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
//                this sets the key to enter to start the game
                me.input.bindKey(me.input.KEY.ENTER, "start");
                
                me.game.world.addChild(new (me.Renderable.extend({
                    
                    init: function(){
//                        this adds the text to the title screen
                        this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
//                        this sets the font and color of the font on the title screen
                        this.font = new me.Font("Arial", 46, "white");
                    },
//                    this is the text displayed on the screen
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Awesomenauts!!!1!11!!!11", 450, 130);
                        this.font.draw(renderer.getContext(), "Press ENTER to play", 250, 530);
                    } 
                })));
                
                this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
//                    if the player hits enter then go to the play screen instead
                    if(action === "start"){
                        me.state.change(me.state.PLAY);
                    }
                });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
//            when the title screen is terminated and you go to the play screen then unbind the enter key
		me.input.unbindKey(me.input.KEY.ENTER);
                me.event.unsubscribe(this.handler);// TODO
	}
});
