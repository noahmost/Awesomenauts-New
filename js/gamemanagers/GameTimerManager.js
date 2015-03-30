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
            game.data.gold += (game.data.exp1+1);
            
        }
    },
    
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe,5);
        }
    }
});

