game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
//            puts title screen up
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                me.input.bindKey(me.input.KEY.F1, "F1");
                me.input.bindKey(me.input.KEY.F2, "F2");
                me.input.bindKey(me.input.KEY.F3, "F3");
                me.input.bindKey(me.input.KEY.F4, "F4");
                me.input.bindKey(me.input.KEY.F5, "F5");
                
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
                        this.font.draw(renderer.getContext(), "Press F1- F4 to buy, f5 to skip", this.pos.x, this.pos.y);
                        this.font.draw(renderer.getContext(), "Current EXP: ", this.pos.x, this.pos.y + 50);
                        this.font.draw(renderer.getContext(), "F1: Increase gold production CUrrent level" + game.data.exp1.toString() + "COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
                        this.font.draw(renderer.getContext(), "F2:Add starting gold", this.pos.x, this.pos.y + 150);
                        this.font.draw(renderer.getContext(), "f3: increase dmg ", this.pos.x, this.pos.y + 200);
                        this.font.draw(renderer.getContext(), "f4: increase health ", this.pos.x, this.pos.y + 250);
                    }
                   
                })));
               
               this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                   if(action === "F1"){
                       if(game.data.exp >= 10){
                           game.data.exp1 += 1;
                           game.data.exp -= 10;
                           me.state.change(me.state.PLAY);
                       }
                   }else if(action === "F2"){
                       
                   }else if(action === "F3"){
                       
                   }else if(action === "F4"){
                       
                   }else if(action === "F5"){
                       me.state.change(me.state.PLAY);
                   }
               });
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
                me.input.unbindKey(me.input.KEY.F1, "F1");
                me.input.unbindKey(me.input.KEY.F2, "F2");
                me.input.unbindKey(me.input.KEY.F3, "F3");
                me.input.unbindKey(me.input.KEY.F4, "F4");
                me.input.unbindKey(me.input.KEY.F5, "F5");
                me.event.unsubscrbe(this.handler);
	}
});