game.EnemyCreep = me.Entity.extend({
    init: function(x,y,settings){
        this._super(me.Entity, 'init', [x, y,{
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
        }]);
//    this sets the health // sets the enemy creep health as it is in game.js
    this.health = game.data.enemyCreepHealth;
    this.alwaysUpdate = true;
//    this lets us know if the enemy is attacking or not
    this.attacking = false;
//    this is gonna shsow when the last time the creep attacked anything
    this.lastAttacking = new Date().getTime();
//    keeps track of when the crepe hit anything
    this.lastHit = new Date().getTime();
    this.now = new Date().getTime();
    this.body.setVelocity(3,20);
    
    this.type = "EnemyCreep";
//    sets walk animation
    this.renderable.addAnimation("walk", [3, 4, 5], 80);
    this.renderable.setCurrentAnimation("walk");
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    update: function(delta){
        if(this.health <= 0){
            me.game.world.removeChild(this);
        }
        
        this.now = new Date().getTime();
//        sets this so the creep moves
        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //        this updates the body
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        
        return true;
        
        
    },
    collideHandler: function(response) {
        if(response.b.type==='PlayerBase'){
            this.attacking=true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
//            keeps moving the creep to the right to maintain position
            this.pos.x = this.pos.x + 1;
//            checks that it has been 1 second since the creep hit the base
            if((this.now-this.lastHit >= 1000)){
//                updates the last hit timer
                this.lastHit = this.now;
//                makes the playerbase call its losehealth function and have its health -1 as in game.js
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }else if (response.b.type==='PlayerEntity'){
            var xdif = this.pos.x - response.b.pos.x;
            
            
            this.attacking=true;
//            this.lastAttacking = this.now;
            

            if(xdif>0){
            this.pos.x = this.pos.x + 1;
            //            keeps moving the creep to the right to maintain position
            this.body.vel.x = 0;
        }
//            checks that it has been 1 second since the creep hit the base
            if((this.now-this.lastHit >= 1000) && xdif>0){
//                updates the last hit timer
                this.lastHit = this.now;
//                makes the playerbase call its losehealth function and have its health -1 as is in game.js
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }
    
}); 


