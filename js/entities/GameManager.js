game.GameTimerManager = Object.extend({
   init: function(x,y,settings){
     this.now = new Date().getTime();
     this.lastCreep = new Date().getTime();
     this.paused = false;
     this.alwaysUpdate = true;
   }, 
    update: function(){
        this.now = new Date().getTime();
        this.goldTimerCheck(this.now);
        this.creepTimerCheck();
        return true;
    },
    goldTimerCheck: function(){
        //        get gold passivley every 20 seconds
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
            game.data.gold += 1;
            
        }
    },
    
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe,5);
        }
    },
});

game.HeroDeathManager = Object.extend({
    init: function(x,y,settings){
        this.alwaysUpdate = true;
    },
    
    update: function(){
        //        if player is dead execute these
        if(game.data.player.dead) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});

game.ExperienceCardinal = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
    },
    update: function(){
//        if you win the game then gain 10 exp
        if(game.data.win === true){
            game.data.exp += 10;
//            if you dont win then you only get 1 xp
        }else if(game.data.win === false){
            game.data.exp += 1;
        }
        return true;
    }
});
