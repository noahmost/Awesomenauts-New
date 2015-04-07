
game.ExperienceCardinal = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = true;
    },
    update: function() {
//        if you win the game then gain 10 exp; if this is true game is over
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            alert("YOU WIN!");
//            if you dont win then you only get 1 xp; if this is true then game is over
        } else if (game.data.win === false && this.gameover) {
            this.gameOver(false);
            alert("YOU LOSE!");
        }
        console.log(game.data.exp);
        return true;
    },
//    refactored code in update function here
    gameOver: function(win) {
//        if you win then get 10 xp
        if (win) {
            game.data.exp += 10;
//            if loss then only gain 1 exp
        } else {
            game.data.exp += 1;
        }
        this.gameover = true;
        me.save.exp = game.data.exp;

        $.ajax({
            type: "POST",
//                       sends info to here
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
//                   if successful execute this
                .success(function(response) {
                    if (response === "true") {
//                                   if it is successful then change it to the play screen
                        me.state.change(me.state.MENU);
                    } else {
//                                   if not print an alert
                        alert(response);
                    }
                })
//                   if failed execute this
                .fail(function(response) {
                    alert("Fail");
                });
    }
});
