const Player = () =>{

}
const Ai = () =>{

}

const Board = (() => {
    let symbol='X';
    const gridElements= document.querySelector('.gameboard').children;
    let gridAssignment = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

    const getBoard = () =>{
        return gridAssignment
    }

    const resetGame = () =>{
        gridAssignment = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        for(element of gridElements){
            element.textContent='';
        }
    }

    const checkWin = () =>{
        let stringGrid = gridAssignment.join('');
        const winPattern1 = /xxx|ooo/i;
        const winPattern2 = /x.{2}x.{2}x|o.{2}o.{2}o/i;
        const winPattern3=/x.{3}x.{3}x|.{2}x.x.x|o.{3}o.{3}o|.{2}o.o.o/i;

        if(winPattern1.test(stringGrid) | winPattern2.test(stringGrid) | winPattern3.test(stringGrid)){
            switch(symbol){
                case 'X':
                    player1.wins +=1;
                case 'O':
                    player2.wins +=1
            }
            alert(symbol=='X'? `${player1.name} wins, rounds won ${player1.wins}`:`${player2.name} wins, rounds won ${player2.wins}`);
            resetGame();
            symbol='X';
            return
        }
        symbol = symbol=='X'?'O':'X';
    }

    const addSymbol = function(index) {
        
        if(gridAssignment[index-1] != ' '){
            return   
        }

       gridElements[index-1].textContent= symbol=='X'?player1.symbol:player2.symbol;;
       gridAssignment[index-1]=symbol;
       checkWin();
    }

    const addEvent = (() =>{
        for(let element of gridElements){
            element.addEventListener('click', e => addSymbol(e.target.id));
        }
     
    })();
    return {addSymbol,getBoard}
 
})();


const player = (name,symbol) =>{
    let wins = 0;
 
    return { name, symbol, wins}
}
const playerComputer = (difficulty) =>{

  const prototype = player('computer','#')

  const makeChoice = () =>{
       switch(difficulty){
           case 'Normal':
               Board.addSymbol(normalDifficulty);
               break;
            case 'Impossible':
                Board.addSymbol(impposibleDifficulty);
                break;
       }
   }
   const normalDifficulty = ()=>{

    

   }
   const impposibleDifficulty = ()=>{
      
   }
 
};

const player1 = player('Bob','&');
const player2 = player('Jim','%');

