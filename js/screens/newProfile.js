game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
//            puts title screen up
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("register").style.visibility = "visible";
//                these bind all of the f keys we have so they work when you push them
                me.input.bindKey(me.input.KEY.B);
                me.input.bindKey(me.input.KEY.Q);
                me.input.bindKey(me.input.KEY.E);
                me.input.bindKey(me.input.KEY.W);
                me.input.bindKey(me.input.KEY.A);
                
                me.game.world.addChild(new (me.Renderable.extend({
                    
                    init: function(){
//                        this adds the text to the title screen
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
//                        this sets the font and color of the font on the title screen
                        this.font = new me.Font("Arial", 26, "white");
                    },
//                    this is the text displayed on the screen
                    draw: function(renderer){
//                        these all edit text and text placements
                        this.font.draw(renderer.getContext(), "Pick username password", this.pos.x, this.pos.y);
                    }
                   
                })));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            document.getElementById("input").style.visibility = "hidden";
            document.getElementById("register").style.visibility = "hidden";
	}
});

