
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
