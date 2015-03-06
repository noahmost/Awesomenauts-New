game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity,'init', [x,y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return (new me.Rect(0, 0, 70, 70)).toPolygon();
                }
        }]);
//    these are variables that are used later
        this.broken = false;
//        sets health from variable in game.js
        this.health = game.data.playerBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBase";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
//    if the players health is lower then 0 then he dies
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            game.data.win = false;
            
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    
    onCollision: function(){
        
    }
});

