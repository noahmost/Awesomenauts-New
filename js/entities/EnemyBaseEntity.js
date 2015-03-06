game.EnemyBaseEntity = me.Entity.extend({
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
        this.broken = false;
//        this sets the health that i have set from enemy base health
        this.health = game.data.enemyBaseHealth;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
//        this sets the tower to not be burning
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update:function(delta){
//        if the tower is deaded then burn it
        if(this.health<=0){
            this.broken = true;
            game.data.win = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    
    },
    
    onCollision: function(){
        
    },
//    this sets it so the base loeses health
    loseHealth: function(){
        this.health--;
    }
});

