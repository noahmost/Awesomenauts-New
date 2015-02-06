game.PlayerEntity = me.Entity.extend ({
        init: function(x, y, settings){
            this._super(me.Entity, "init", [x, y, {
            image: "player",
            width: 64,
            height: 64,
//            the actual images width and height
            spritewidth: "64",
            spriteheight: "64",
            getShape: function(){
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
            }
            
            
                }]);
//            this sets the speed that the character is going
            this.body.setVelocity(10, 20);
            this.facing = "right";
//            this updates the time and date of the hits
            this.now = new Date().getTime();
            this.lastHit = this.now;
            this.lastAttack = new Date().getTime();
//            this follows the position of the character
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            
            this.renderable.addAnimation("idle", [78]);
            this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 123, 124, 125], 80);
            this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
            
            this.renderable.setCurrentAnimation("idle");
            },
        
        
                    
            update: function(delta){
                this.now = new Date().getTime();
            if(me.input.isKeyPressed("right")){
                this.facing = "right";
//                velocity represents our current position, sets position of x by multiplying velocity by me.timer.tick
                    this.body.vel.x += this.body.accel.x * me.timer.tick;
//                    this flips the character around
                    this.flipX(true);
            }else if(me.input.isKeyPressed("left")){
                this.facing = "left";
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
//                this flips the character around
                this.flipX(false);
            }
            else{
                this.body.vel.x=0;
            }
//            this allows me to jump and not double jump or jump when falling
            if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
                this.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }
            
            
//                       if the a key is pressed then play attack animation 
            if(me.input.isKeyPressed("attack")){
                if(!this.renderable.isCurrentAnimation("attack")){
                    
//                    sets the character animation to an attack one if using the a key
                    this.renderable.setCurrentAnimation("attack", "idle");
//                    makes it so when we start the sequence we begin from the first animation
                        this.renderable.setAnimationFrame();
                }
            }
                //            this sets it so that if the character isnt moving then it shows the idle animation
                else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
                    if(!this.renderable.isCurrentAnimation("walk")){
                        this.renderable.setCurrentAnimation("walk");
                    }
        }else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
                me.collision.check(this, true, this.collideHandler.bind(this), true);
                
                this.body.update(delta);
            
            this._super(me.Entity, "update", [delta]);
            
            return true;
            },
            
            collideHandler: function(response){
                if(response.b.type==="EnemyBaseEntity"){
                    var ydif = this.pos.y - response.b.pos.y;
                    var xdif = this.pos.x - response.b.pos.x;
                    
                     if(ydif<-40 && xdif< 70 && xdif>-35){
                        this.body.falling = false;
                        this.body.vel.y = -1;
                    }
//                    we can no longer jump onto towers
                    else if(xdif>-35 && this.facing === 'right' && (xdif<0) && ydif>-50){
                        this.body.vel.x = 0;
                        this.pos.x = this.pos.x -1;
                    }else if(xdif<70 && this.facing ==='left' && (xdif>0)){
                        this.body.vel.x = 0;
                        this.pos.x = this.pos.x +1;
                    }else if(ydif<-40){
                        this.body.falling = false;
                        this.body.vel.y = -1;
                    }
//                    if its been more then 400 miliseconds then update the last hit timer
                    if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
                        
                        this.lastHit = this.now;
                        response.b.loseHealth();
                    }
                }
            }
});
//this is for the player base in tiled
game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity,'init', [x,y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
//    these are variables that are used later
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
//    if the players health is lower then 0 then he dies
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
});
//all the same as above except is enemies
game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity,'init', [x,y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
        }]);
        this.broken = false;
        this.health = 10;
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
//    this sets the health
    this.health =10;
    this.alwaysUpdate = true;
    this.body.setVelocity(3,20);
    
    this.type = "EnemyCreep";
//    sets walk animation
    this.renderable.addAnimation("walk" [3, 4, 5], 80);
    this.renderable.setCurrentAnimation("walk");
    },
    update: function(){
        
    }
});
//made entties gamemanager
game.GameManager = Object.extend({
   init: function(x,y,settings){
     this.now = new Date().getTime();
     this.lastCreep = new Date().getTime();
     
     this.alwaysUpdate = true;
   }, 
    update: function(){
        this.now = new Date().getTime();
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe,5);
        }
        return true;
    }
    
});