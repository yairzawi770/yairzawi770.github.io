const validate = (player_1, player_2)  => {
    if (!player_1 || !player_2) {
        throw TypeError('Send 2 parametrs')
    }
}
const validate2 = (player_1 , player_2)  => {
    if (player_1 !== "rock" && player_1 !== "paper" && player_1 !== "scissors" || player_2 !== "rock" && player_2 !== "paper" && player_2 !== "scissors") {
        throw SyntaxError('the paramaters is wrong')
    }
}

const get_result = (player_1,player_2) =>{
    validate(player_1,player_2)
    validate2(player_1,player_2)


    if (player_1 === player_2) {
        return "draw"
        
    }
    else if (player_1 === "scissors" && player_2 == "rock" || player_1 == "rock" && player_2 == "paper" || player_1 == "paper" && player_2 == "scissors"){
        return "player_2"
    }
    else if (player_1 == "rock" && player_2 == "scissors" || player_1 == "paper" && player_2 == "rock"|| player_1 == "scissors" && player_2 == "paper"){
        return "player_1"
    }
    /*else if (player_1 == "rock" && player_2 == "paper"){
        return console.log("player 2")
    }
    else if (player_1 == "paper" && player_2 == "rock"){
        return console.log("player 1")
    }
    else if (player_1 == "paper" && player_2 == "scissors"){
        return console.log("player 2")
    }
    else if (player_1 == "scissors" && player_2 == "paper"){
        return console.log("player 1")
    }*/
}

module.exports = get_result