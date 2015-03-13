game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
//            puts title screen up
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                me.game.world.addChild(new (me.Renderable.extend({
                    
                    init: function(){
//                        this adds the text to the title screen
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
//                        this sets the font and color of the font on the title screen
                        this.font = new me.Font("Arial", 46, "white");
                    },
//                    this is the text displayed on the screen
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Spend", this.pos.x, this.pos.y);
                    }
                   
                })));
               
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});