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
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
//                        this sets the font and color of the font on the title screen
                        this.font = new me.Font("Arial", 46, "white");
                    },
//                    this is the text displayed on the screen
                    draw: function(renderer){
                        this.font.draw(renderer.getContext(), "Press F1- F4 to buy, f5 to skip", this.pos.x, this.pos.y);
                        this.font.draw(renderer.getContext(), "Current EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                        this.font.draw(renderer.getContext(), "F1: Increase gold production " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 100);
                        this.font.draw(renderer.getContext(), "F2:Add starting gold" + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 150);
                        this.font.draw(renderer.getContext(), "f3: increase dmg " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 200);
                        this.font.draw(renderer.getContext(), "f4: increase health " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 250);
                    }
                   
                })));
               
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});