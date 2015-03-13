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
        this.gameover = true;
    },
    update: function(){
//        if you win the game then gain 10 exp; if this is true game is over
        if(game.data.win === true && !this.gameover){
            this.gameOver(true);
//            if you dont win then you only get 1 xp; if this is true then game is over
        }else if(game.data.win === false && this.gameover){
            this.gameOver(false);
        }
        console.log(game.data.exp);
        return true;
    },
//    refactored code in update function here
    gameOver: function(win){
//        if you win then get 10 xp
        if(win){
            game.data.exp += 10;
//            if loss then only gain 1 exp
        }else{
            game.data.exp += 1;
        }
        this.gameover = true;
        me.save.exp = game.data.exp;
        me.save.exp2 = 4;
    },
});

game.SpendGold = Object.extend({
    init: function(x, y, settings){
     this.now = new Date().getTime();
//     this shows the last time someone opened the buy screen so it doesnt just flicker
     this.lastBuy = new Date().getTime();
     this.paused = false;
     this.alwaysUpdate = true;
     this.updateWhenPaused = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
            this.lastBuy = this.now;
            if(!this.buying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
        }
        
        return true;
    },
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
    },
    
    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
    }
});