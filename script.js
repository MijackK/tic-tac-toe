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
                gameController.player1.wins +=1;
            case 'O':
                gameController.opponent.prototype.wins +=1
        }
        alert(symbol=='X'? `${gameController.player1.name} wins, rounds won ${gameController.player1.wins}`:`${gameController.opponent.prototype.name} wins, rounds won ${gameController.opponent.prototype.wins}`);
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
        const extendedCondition1 =[0,3,6].includes(stringGrid.search(winPattern1)) || [0,3,6].includes(reversedGrid.search(winPattern1));
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
        if(symbol=='O' && [1,2].includes(gameController.galleryIndex)){
        gameController.opponent.makeChoice();
        }
    }

    const addSymbol = function(index) {
        
        if(gridAssignment[index-1] != ' '){
            return   
        }
       //gridElements[index-1].textContent= symbol=='X'?player1.symbol:player2.symbol; // code for custom icons.
       gridElements[index-1].innerHTML= symbol=='X'?`<div class="xsymbol">
       <div style="left:15px"></div>
       <div style="transform:rotate(-95deg); top:4px"> </div>
       </div> `:'<div class="osymbol"></div>';
       
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
  const prototype = player('computer','#');
  let parentID = 1;

  //code for impossible difficulty
  const getEmpty = (gamestate) =>{
      let empty =[];
     for(let i=0; i<gamestate.length; i++){
         if(gamestate[i]==' '){
             empty.push(i);
         }
     }
     return empty;

  }
  const generateID = () =>{
      return parentID++

}
  const nodeFactory= (parentNode,gamestate,depth,index,value,ID) => {

    return{parentNode,gamestate,depth,index,value,ID};
  }
  const createTree = (currentState,symbol,parentIndex) =>{
      //let depth = currentState.join('').match(/ /g).length;
      //let root = nodeFactory([],0,currentState,0,'')
      let nodeTree = [];
      let empty=getEmpty(currentState);
      let node;  

      for( let i=0; i < empty.length; i++){
          let gamestate = currentState.slice();
          gamestate[empty[i]] = symbol
          node = nodeFactory(parentIndex,gamestate,empty.length,empty[i],assignValue(gamestate,symbol,empty.length),generateID())
          nodeTree.push(node);
          if(/ /.test(gamestate.join('')) && [0].includes(assignValue(gamestate,symbol,empty.length)) == true ){
              let childNodes = createTree(gamestate,symbol=='X'?'O':'X',node.ID);
              nodeTree =nodeTree.concat(childNodes);
              //experimental code
              let filtered = nodeTree.filter(node1 => node1.parentNode == node.ID);
              if(symbol == 'X'){
                
                node.value = filtered.length == 1? filtered[0].value : filtered.reduce((a,b)=>a.value > b.value?a:b).value;
              }
              else{
                node.value = filtered.length == 1 ? filtered[0].value :filtered.reduce((a,b)=>a.value < b.value?a:b).value;
              }
          }
      }
      return nodeTree;
  }
  const assignValue = (state,symbol,depth) =>{
    let stringGrid = state.join('');
    let reversedGrid = state;
    reversedGrid = reversedGrid.slice().reverse().join('');
    const winPattern1 = /xxx|ooo/i;
    const extendedCondition1 =[0,3,6].includes(stringGrid.search(winPattern1)) || [0,3,6].includes(reversedGrid.search(winPattern1));
    const winPattern2 = /x.{2}x.{2}x|o.{2}o.{2}o/i;
    const winPattern3=/x.{3}x.{3}x|o.{3}o.{3}o/i;
    const winPattern4 =/.{2}x.x.x|.{2}o.o.o/i;
    const extenderCondition2 = [0].includes(stringGrid.search(winPattern4))

    if(winPattern1.test(stringGrid) && extendedCondition1){
       
        return symbol == 'X'? (-10-depth):(10+depth)
    }
    if( winPattern2.test(stringGrid)){

        return symbol == 'X'? (-10-depth):(10+depth)
    }
    if( winPattern3.test(stringGrid)){
    
        return symbol == 'X'? (-10-depth):(10+depth)
    }
    if(winPattern4.test(stringGrid) && extenderCondition2){
     
        return symbol == 'X'? (-10-depth):(10+depth)
    }

    return 0;
  }

  const minMax = (currentState) =>{
      let nodeTree = createTree(currentState,'O',-1);
      let depth = getEmpty(currentState).length;
      let indexValue = nodeTree.filter(node => node.depth == depth).reduce((a,b)=>a.value > b.value?a:b).index

      return indexValue +1;
   
  }

 
  // code for normal difficulty
  const makeChoice = () =>{
       switch(difficulty){
           case 'Normal':
               //Board.addSymbol(normalDifficulty);
               normalDifficulty();
               break;
            case 'Impossible':
                impposibleDifficulty();
                break;
       }
   }
  const blockOrNot =(currentState) =>{
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
       let currentState = Board.getBoard();
       placeSymbol(currentState);
   }
   const impposibleDifficulty = ()=>{
  let currentState = Board.getBoard();
   Board.addSymbol( minMax(currentState));
   
   }
   return {makeChoice, prototype}
 
};

const gameController = (() =>{
    const gameContainer=document.querySelector('.game-container');
    const menuWrapper =document.querySelector('.menu-wrapper');
    const gameMenu = document.querySelector('.menu');
    const startBtn = document.querySelector('#start-btn');
    const arrowUp = document.querySelector('#arrow-up');
    const arrowDown = document.querySelector('#arrow-down');
    const Title = document.querySelector('#p2-title');
    const Footer =document.querySelector('#footer');
    const linkArray =['#p2-img1','#p2-img2','#p2-img3'];
    let galleryIndex = 0;
    let player1 = player('Bob','X');
    let opponent;

    const goUp= () =>{
        if(galleryIndex == 0 ){
            galleryIndex =2;
            arrowDown.setAttribute('href',linkArray[0]);
            Title.textContent="Unbeatable(AI)";
           setTimeout( () => arrowUp.setAttribute('href',linkArray[1]),100);
           return
        }
       
        if(galleryIndex == 2){
            arrowDown.setAttribute('href',linkArray[2]);
            Title.textContent="Normal( AI )";
            setTimeout( () => arrowUp.setAttribute('href',linkArray[0]),100)

        }
        if(galleryIndex ==1){
            arrowDown.setAttribute('href',linkArray[1]);
            Title.textContent="Human Player";
            setTimeout( () => arrowUp.setAttribute('href',linkArray[2]),100)
        }
        galleryIndex = galleryIndex -1;
          
    }
    const goDown = () =>{
        if(galleryIndex == 2){
            galleryIndex =0;
            arrowUp.setAttribute('href',linkArray[2]);
            Title.textContent="Human Player";
            setTimeout(() => arrowDown.setAttribute('href',linkArray[1]),100);
            return
        }
        if(galleryIndex == 0){
            arrowUp.setAttribute('href',linkArray[0]);
            Title.textContent="Normal( AI )";
            setTimeout(() => arrowDown.setAttribute('href',linkArray[2]),100)

        }
        if(galleryIndex == 1){
            arrowUp.setAttribute('href',linkArray[1]);
            Title.textContent="Unbeatable( AI )";
            setTimeout(() => arrowDown.setAttribute('href',linkArray[0]),100)

        }
            galleryIndex = galleryIndex +1;
    }
  

    const intializegame= () =>{
        switch(galleryIndex){
            case 0:
                gameController.opponent = player('Jim','O');
                break;
            case 1:
                gameController.opponent = playerComputer('Normal');
                break;
            case 2:
                gameController.opponent = playerComputer('Impossible');
                break;
        }
        menuWrapper.style.display='none';
        gameContainer.style.filter='blur(0px)';
        Footer.style.filter='blur(0px)';
        gameController.galleryIndex = galleryIndex;

    }
    const arrowEvents = (() =>{
        arrowUp.addEventListener('click',goUp);
        arrowDown.addEventListener('click',goDown);
        startBtn.addEventListener('click',intializegame)
    })()
    return {galleryIndex,opponent,player1}
})();


//const player1 = player('Bob','X');
//const player2 = player('Jim','O');
//const computer = playerComputer('Impossible');

//console.log(computer.minMax(['O',' ','O',' ','X','X','X',' ','O']))
//console.table(computer.createTree(['O',' ','O',' ','X','X','X',' ','O'],'O',-1));
//console.log(computer.minMax(['O',' ','O',' ','X','X','X',' ','O']));
//let nodeTree =computer.createTree(['O','X',' ',' ',' ',' ',' ','X',' '],'O',-1)
//console.table(nodeTree.filter(node => node.depth == 5));
