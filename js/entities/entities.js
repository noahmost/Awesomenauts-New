game.PlayerEntity = me.Entity.extend ({
        init: function(x, y, settings){
            this.setSuper(x, y);
            this.setPlayerTimers();
            this.setAttributes();
            
            this.type = "PlayerEntity";
            this.setFlags();
            this.lastHit = this.now;
            this.lastAttack = new Date().getTime();
//            this follows the position of the character
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            
            this.addAnimation();
            this.renderable.setCurrentAnimation("idle");
            },
//        pulled the setsuper statement into here
        setSuper: function(x, y){
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
        },
//        these are for things with date and getTime
        setPlayerTimers: function(){
            this.now = new Date().getTime();
            this.lastHit = this.now;
            this.lastSpear = this.now;
            this.lastAttack = new Date().getTime();
        },
//        attributes are like the characters characteristics
        setAttributes: function(){
            this.health = game.data.playerHealth;
//            this sets the speed that the character is going // sets movespeed to game.js
            this.body.setVelocity(game.data.playerMoveSpeed, 20);
            this.attack = game.data.playerAttack;
        },
//        these concern the characters
        setFlags: function(){
        this.dead = false;
        this.facing = "right";
        this.attacking = false;
        },
//        these sets animations like walking
        addAnimation: function(){
            this.renderable.addAnimation("idle", [78]);
            this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 123, 124, 125], 80);
            this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        },
        
                    
            update: function(delta){
                this.now = new Date().getTime();
                
                this.dead = this.checkIfDead();
                
                this.checkKeyPressesAndMove();
                
                this.checkAbilityKeys();
            
            
                this.setAnimation();
                me.collision.check(this, true, this.collideHandler.bind(this), true);
                
                this.body.update(delta);
            
            this._super(me.Entity, "update", [delta]);
            
            return true;
            },
//            this function checks if the character is dead
            checkIfDead: function(){
                if (this.health <= 0) {
                    return true;
                }
                return false;
            },
//            this checks if a key is pressed and if it is then it moves the character
            checkKeyPressesAndMove: function(){
            if(me.input.isKeyPressed("right")){
                this.moveRight();

            }
            else if(me.input.isKeyPressed("left")){
                this.moveLeft();
            }
            else{
                this.body.vel.x=0;
            }
//            this allows me to jump and not double jump or jump when falling
            if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
                this.jump();
            }
            me.input.isKeyPressed("attack");
            },
//            moves right code
            moveRight: function(){
//                velocity represents our current position, sets position of x by multiplying velocity by me.timer.tick
                    this.body.vel.x += this.body.accel.x * me.timer.tick;
//                    this flips the character around
                    this.flipX(true);
                    this.facing = "right";
            },
//            move left code
            moveLeft: function(){
                this.facing = "left";
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
//                this flips the character around
                this.flipX(false);
            },
//            jumping code
            jump: function(){
                this.body.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            },
            
            checkAbilityKeys: function(){
                if(me.input.isKeyPressed("skill1")){
//                    this.speedBurst();
                }else if(me.input.isKeyPressed("skill2")){
//                    this.eatCreep();
                }else if(me.input.isKeyPressed("skill3")){
                    this.throwSpear();
                }
            },
            
            throwSpear: function(){
                if(this.lastSpear >= game.data.spearTimer && game.data.ability3 >= 0){
              this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 20);  
        }
            },
            
//            this is the attack animations
            setAnimation: function(){
                //                       if the a key is pressed then play attack animation 
            if(this.attacking){
                if(!this.renderable.isCurrentAnimation("attack")){
                    
//                    sets the character animation to an attack one if using the a key
                    this.renderable.setCurrentAnimation("attack", "idle");
//                    makes it so when we start the sequence we begin from the first animation
                        this.renderable.setAnimationFrame();
                        this.flipX(true);
                }
            }
                //            this sets it so that if the character isnt moving then it shows the idle animation
                else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
                    if(!this.renderable.isCurrentAnimation("walk")){
                        this.renderable.setCurrentAnimation("walk");
                    }
        }
        else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
            },
            
            loseHealth: function(damage){
              this.health = this.health - damage;  
            },
            
            collideHandler: function(response){
                if(response.b.type==="EnemyBaseEntity"){
                    this.collideWithEnemyBase(response);
                }else if(response.b.type ==='EnemyCreep'){
                    this.collideWithEnemyCreep(response);
                }
            },
            
            collideWithEnemyBase: function(response){
                var ydif = this.pos.y - response.b.pos.y;
                    var xdif = this.pos.x - response.b.pos.x;
                    
                     if(ydif<-40 && xdif< 70 && xdif>-35){
                        this.body.falling = false;
                        this.body.vel.y = -1;
                    }
//                    we can no longer jump onto towers
                    else if(xdif>-35 && this.facing === 'right' && (xdif<0) && ydif>-50){
                        this.body.vel.x = 0;
//                        this.pos.x = this.pos.x -1;
                    }else if(xdif<70 && this.facing ==='left' && (xdif>0)){
                        this.body.vel.x = 0;
//                        this.pos.x = this.pos.x +1;
                    }else if(ydif<-40){
                        this.body.falling = false;
//                        this.body.vel.y = -1;
                    }
                    
//                    if its been more then 400 miliseconds then update the last hit timer                                                                                  if facing right but character is left of creep i can attack it
                    if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif) <=40) && (((xdif>0) && this.facing === "left") || ((xdif<0) && this.facing==="right"))
                            ){
//                        if the person attacks then the creep loses health
                        this.lastHit = this.now;
                        response.b.loseHealth(game.data.playerAttack);
                    }
            },
            
            collideWithEnemyCreep: function(response){
                
                    var xdif = this.pos.x - response.b.pos.x;
                    var ydif = this.pos.y - response.b.pos.y;
                    
                    this.stopMovement(xdif);
                    
                    if(this.checkAttack(xdif, ydif)){
                        this.hitCreep(response);
                    };
            },
            stopMovement: function(xdif){
                if(xdif>0){
                        this.pos.x = this.pos.x + 1;
                        if(this.facing==="left"){
                            this.body.vel.x = 0;
                        }
                    }else{
                        this.pos.x = this.pos.x - 1;
                        if(this.facing==="right"){
                            this.body.vel.x = 0;
                        }
                    }
            },
            
            checkAttack: function(xdif, ydif){
                if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif)<=40) && (((xdif>0) && this.facing === "right") || ((xdif<0) && this.facing ==="right"))){
                        this.lastHit = this.now;
//                        if the creeps health is lower than the attack, execute code in if statement
                        return true;
                    }
                    return false;
            },
            
            hitCreep: function(response){
                if(response.b.health <= game.data.playerAttack){
//                            adds one gold for creep kill
                            game.data.gold += 1;
                        }
                        
                        response.b.loseHealth(game.data.playerAttack);
            }
});
//this is for the player base in tiled

//all the same as above except is enemies



