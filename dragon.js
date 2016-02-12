var random = require("random-js");
var r = random();


function dragonFactory() {
    var baseHP = r.die(6) + r.die(6);
    return {
        hp: baseHP,
        agility: r.die(3),
        gold: baseHP * 100,
        damage: function(target) {
            return r.die(3) + 1;
        }
    };
}

var dragon = dragonFactory();
    console.log("You've met a dragon named Trogdor!");

var player = {
    hp: 5,
    gold: 0,
    dragonCount: 0,
    damage: function(target) {
        return r.die(6); 
    },
    hit: function(target) {
        return r.die(6) > target.agility;
    }
};

var slaying = true;
while(slaying) {
    if (player.hp <= 2) {
        console.log ("You run away from the Dragon! Chicken...");
        slaying = false;
    
    } else {
        
        if (player.hit(dragon)) {
            var damageThisRound = player.damage(dragon);
            console.log("You hit the Dragon! You delt " + damageThisRound + " dammage this round!");
            dragon.hp -= damageThisRound;
        
        } else {
            var dragonDamageDelt = dragon.damage(player);
            console.log ("You have bad aim and missed! The Dragon hits you " + dragonDamageDelt + " times!");
            player.hp -= dragonDamageDelt;
        }
        
        if (dragon.hp <= 0) {
            console.log("You kicked the Dragon's butt!");
            player.gold += dragon.gold;
            console.log("You got " + dragon.gold + " gold!");
            player.dragonCount++;
            dragon = dragonFactory();
            console.log("Now fight again:");
            console.log("You met a dragon named TROGDOR!!!");
        }
        

        if (player.hp <= 0) {
            console.log("You are deaded!! The dragon eats your face.");
            slaying = false;
        }
    }
}

console.log("You got " + player.gold + " gold from killing all those dragons!");
console.log("You are a badass and have killed " + player.dragonCount + " dragons!");
