let cardBoard =document.getElementById("board");
let timer = 1000;
let gameOver =false;
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
    timer -=10
    document.querySelector(".time").innerHTML = `Time : ${timer}`;
    if(timer <=0){
        gameOver =true;
        cardBoard.innerHTML ="Game Over";
        cardBoard.style.cssText ="color :red ; font-size:20px; display:flex; flex-direction:column; justify-content:center; align-items:center;"
        let btn =document.createElement("button");
        cardBoard.appendChild(btn);
        btn.innerHTML="Restart";


        btn.addEventListener("click" , ()=> {

            window.location.reload()
        });
      

    }

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
        if(score ==10){
            cardBoard.innerHTML ="Congratulation you won . Do you want to play Again ?";
            cardBoard.style.cssText ="color :white ; font-size:30px; display:flex; flex-direction:column; justify-content:center; align-items:center;"
            let div = document.createElement('div');
            div.classList.add("playAagin");
            cardBoard.appendChild(div);
            let btny =document.createElement("button");
            btny.classList.add("yes");
            let btnN =document.createElement("button");
            btnN.classList.add("no");
            div.appendChild(btny);
            div.appendChild(btnN);
            btny.innerHTML="Yes";
            btnN.innerHTML ="No";

            btny.addEventListener("click" ,()=>{
                window.location.reload();
            })



        }
    }
    card1selected =null;
    card2selected =null
}