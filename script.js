
const Board = (() => {
    let symbol='X';

    const gridElements= document.querySelector('.gameboard').children;
    let gridAssignment = [' ',' ',' ',' ',' ',' ',' ',' ',' '];

    const getBoard = () =>{
        return gridAssignment
    }
    const endGame= () => {
        switch(symbol){
            case 'X':
                player1.wins +=1;
            case 'O':
                player2.wins +=1
        }
        alert(symbol=='X'? `${player1.name} wins, rounds won ${player1.wins}`:`${player2.name} wins, rounds won ${player2.wins}`);
        resetGame();
        symbol='X';

    }

    const resetGame = () =>{
        gridAssignment = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
        for(element of gridElements){
            element.textContent='';
        }
    }

    const checkWin = () =>{
        
        let stringGrid = gridAssignment.join('');
        let reversedGrid = gridAssignment;
        reversedGrid = reversedGrid.slice().reverse().join('');
        const winPattern1 = /xxx|ooo/i;
        const extendedCondition1 =[0,3,6].includes(stringGrid.search(winPattern1)) | [0,3,6].includes(reversedGrid.search(winPattern1));
        const winPattern2 = /x.{2}x.{2}x|o.{2}o.{2}o/i;
        const winPattern3=/x.{3}x.{3}x|o.{3}o.{3}o/i;
        const winPattern4 =/.{2}x.x.x|.{2}o.o.o/i;
        const extenderCondition2 = [0].includes(stringGrid.search(winPattern4))
       
        if(winPattern1.test(stringGrid) && extendedCondition1){
            endGame();
            return
        }
        if( winPattern2.test(stringGrid)){
           endGame();
            return
        }
        if( winPattern3.test(stringGrid)){
            endGame()
            return
        }
        if(winPattern4.test(stringGrid) && extenderCondition2){
            endGame()
            return
        }

        if(/ /.test(stringGrid)==false){
            alert('its a draw');
            resetGame();
            symbol='X';
            return
        }
        symbol = symbol=='X'?'O':'X';
        if(symbol=='O'){
        computer.makeChoice();
        }
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
  let currentPosition ;
  let noWin=[];
  const prototype = player('computer','#')
  const possibleWin1 = /xx /i;
  const possibleWin1_1 = / xx/i;
  const possibleWin1_2 =/x x/i;
  const possibleWin2 = /x.{2}x.{2} /i;
  const possibleWin2_1 = / .{2}x.{2}x/i;
  const possibleWin2_2 = /x.{2} .{2}x/i;
  const possibleWin3 = /x.{3}x.{3} /i;
  const possibleWin3_1 = / .{3}x.{3}x/i;
  const possibleWin3_2 = /.{2}x.x. /i;
  const possibleWin3_3 = /.{2} .x.x/i; // triggers if there is an x in box 6 & 7 and box 4 is empty.

  const makeChoice = () =>{
       switch(difficulty){
           case 'Normal':
               //Board.addSymbol(normalDifficulty);
               normalDifficulty();
               break;
            case 'Impossible':
                Board.addSymbol(impposibleDifficulty);
                break;
       }
   }
  const blockOrNot =(currentState) =>{
    const extendedWin1 = [0,3,6].includes(currentState.search(possibleWin1));
    const extendedWin1_1 = [2,5,8].includes(currentState.search(possibleWin1_1)+2);
    const extendedWin1_2 = [0,3,6].includes(currentState.search(possibleWin1_2));
    console.log(currentState);
    if(possibleWin1.test(currentState) && extendedWin1){
        console.log( `player is about to win , block ${currentState.search(possibleWin1)+2}`);
        Board.addSymbol(currentState.search(possibleWin1)+3)
        return true;
    }
    if(possibleWin1_1.test(currentState) && extendedWin1_1){
        console.log( `player is about to win , block ${currentState.search(possibleWin1_1)}`);
        Board.addSymbol(currentState.search(possibleWin1_1)+1);
        return true;
    }
    if(possibleWin1_2.test(currentState) && extendedWin1_2){
        console.log( `player is about to win , block ${currentState.search(possibleWin1_2)+1} expiremental`);
        Board.addSymbol(currentState.search(possibleWin1_2)+2);
        return true;
    }
    if(possibleWin2.test(currentState)){
        console.log( `player is about to win , block ${currentState.search(possibleWin2)+6}`);
        Board.addSymbol(currentState.search(possibleWin2)+7)
        return true;
    }
    if(possibleWin2_1.test(currentState)){
        console.log( `player is about to win , block ${currentState.search(possibleWin2_1)}`);
        Board.addSymbol(currentState.search(possibleWin2_1)+1);
        return true;
    }
    if(possibleWin2_2.test(currentState)){
        console.log( `player is about to win , block ${currentState.search(possibleWin2_2)+3}`);
        Board.addSymbol(currentState.search(possibleWin2_2)+4)
        return true;
    }
    if(possibleWin3.test(currentState)){
        console.log( `player is about to win , block ${8}`);
        Board.addSymbol(9);
        return true;
    }
    if(possibleWin3_1.test(currentState)){
        console.log( `player is about to win , block ${0}`);
        Board.addSymbol(1);
        return true;
    }
    if(possibleWin3_3.test(currentState)){
        console.log( `player is about to win , block ${2}`);
        Board.addSymbol(3);
        return true;
    }
    if(possibleWin3_2.test(currentState)){
        console.log( `player is about to win , block ${6}`);
        Board.addSymbol(7);
        return true;
    }
    return false;
}
const putSymbol = (currentState,placements,index) => {
    let placeholder=0;
    let boardString =currentState.join('');
    for(let i=1; i<placements.length; i=i+2){
        if(currentState[placements[placeholder]-1] == 'O' && currentState[placements[i]-1]== ' ' ){
            Board.addSymbol(placements[i]);
            return index;
        }
        

        if(currentState[placements[placeholder]-1] == " "  && currentState[placements[i]-1]== " " ){
            if( blockOrNot(boardString)){
            return index;
        }
            Board.addSymbol(placements[placeholder]);
            return index;
        }  
        placeholder +=2;
    }
    if( blockOrNot(boardString)){
        return index;
    }

    return getRNG(currentState,noWin);
}

const getRNG = (currentState) =>{
    let index =Math.floor(Math.random()*9)+1
    while(true){ 
       if(currentState[index-1] == ' '){
            Board.addSymbol(index);
            break
        }
        index =Math.floor(Math.random()*9)+1
    }
    return index-1;
}
const placeSymbol= (currentState) =>{
   
    if(currentState.indexOf('O') === -1){
        currentPosition = getRNG(currentState);
        return   
    } 
    switch(currentPosition){
        case 0:
           currentPosition = putSymbol(currentState,[2,3,5,9,4,7],currentPosition)
            break;
        case 1:
             currentPosition = putSymbol(currentState,[1,3,5,8],currentPosition)
            break;
        case 2:
            currentPosition = putSymbol(currentState,[2,1,6,9,5,7],currentPosition)
            break;
        case 3:
            currentPosition = putSymbol(currentState,[1,7,5,6],currentPosition)
            break;
        case 4:
            currentPosition = putSymbol(currentState,[2,8,4,6,1,9,3,7],currentPosition)
            break;
        case 5:
            currentPosition = putSymbol(currentState,[3,9,4,5],currentPosition)
            break;
        case 6:
            currentPosition = putSymbol(currentState,[1,4,8,9,5,3],currentPosition)
            break;
        case 7:
            currentPosition = putSymbol(currentState,[7,9,5,2],currentPosition)
            break;
        case 8:
            currentPosition = putSymbol(currentState,[7,8,5,1,6,3],currentPosition)
            break
    }  
   
}

   const normalDifficulty = ()=>{
       //let currentState = Board.getBoard();
       //placeSymbol(currentState);
   }
   const impposibleDifficulty = ()=>{
      
   }
   return {makeChoice, prototype}
 
};

const player1 = player('Bob','X');
const player2 = player('Jim','O');
const computer = playerComputer('Normal');



