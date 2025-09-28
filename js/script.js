let cardBoard =document.getElementById("board");
let score=0;
let cardList =[
    "darkness" ,
    "double" ,
    "fairy" ,
    "fighting",
    "fire" ,
    "grass" ,
    "lightning",
    "metal" ,
    "psychic" ,
    "water"
]

let cardSet;
let board =[];
let rows =4;
let columns =5;
let card1selected;
let card2selected;

window.onload =function(){
   
   shuffleCards();
   startGame();

}

function shuffleCards(){
    cardSet = cardList.concat(cardList);

    // shuffle the card
    for(let i =0 ; i<cardSet.length ;i++){
        
        let j = Math.floor(Math.random() * cardSet.length);

        //swap
        let temp =cardSet[i];
        cardSet[i] =cardSet[j];
        cardSet[j] =temp;
    }

    
}

function startGame(){
    //arrange the boards 4*5;
    for(let r =0 ; r<rows ;r++ ){
        let row =[];
        for(let c =0 ; c<columns ;c++){
          
            let cardImg =cardSet.pop();
            row.push(cardImg); //js

            let card =document.createElement("img");
            cardBoard.append(card)
            card.id = r.toString() +"_"+ c.toString();
            card.src = "images/"+cardImg +".jpg";
            card.classList.add("card");
            card.addEventListener("click" , selectCard);

            
            
        }
        board.push(row);
    }

    hideCards()
   
}

// hide the card

function hideCards(){
    for(let r =0 ;r<rows;r++){
      for(let c =0 ; c<columns ;c++){
        let card =document.getElementById(r.toString()+"_"+ c.toString());
        card.src = "images/"+ "back.jpg"; 
       
      }
    }
}


function selectCard(){
    if(this.src.includes("back")){
        if(!card1selected){
            card1selected =this;

            let coords = card1selected.id.split("_");
            let r= parseInt(coords[0]);
            let c =parseInt(coords[1]);

            card1selected.src ="images/" +board[r][c] + ".jpg";

        }

        else if(!card2selected && this != card2selected){

            card2selected =this;

            let coords = card2selected.id.split("_");
            let r= parseInt(coords[0]);
            let c =parseInt(coords[1]);

            card2selected.src = "images/"+board[r][c] + ".jpg";
            setTimeout(update ,1000)

        }

    }
}

function update(){
    if(card1selected.src != card2selected.src){

        card1selected.src ="images/back.jpg";
        card2selected.src ="images/back.jpg";
    }
    else{
        score++;
        document.getElementById("score").innerText= score;
    }
    card1selected =null;
    card2selected =null
}