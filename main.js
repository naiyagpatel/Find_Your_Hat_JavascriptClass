
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let status = true;
let next;
let posRow, posCol;

// Creating a class named Field
class Field {
  constructor(field){
    this.field = field;
    
  }
  // print() function will print the 2-dim array
  print() {
    let str;
    for(let i=0;i<this.field.length; i++)
    {
      str = this.field[i].join(' ');
      console.log(str);
    }
   
  }

  // generateField will randomly generate the 2-dim array for the game
  static generateField(height, width, percentage) {
    let field = [];
    let randRow;
    let randCol;
    let totalHoles = Math.floor(((height * width)*percentage) / 100);
    let cnt = 0;
    let chkStatus = true;
    posRow = Math.floor(Math.random()*height);
    posCol = Math.floor(Math.random()*width);

        
    for(let i=0;i<height; i++){
      field[i] = [];
      for(let j=0;j<width; j++){
        field[i][j] = fieldCharacter;
      }
    }
    while(cnt <= totalHoles){
      randRow = Math.floor(Math.random()*height);
      randCol = Math.floor(Math.random()*width);
      field[randRow][randCol] = hole;
      cnt++;

    }
    field[posRow][posCol] = pathCharacter;

    // below while loop will check that hat will not be placed same position as pathCaharacter
    while(chkStatus)
    {
      if(randRow == posRow && randCol == posCol){
        randRow = Math.floor(Math.random()*height);
        randCol = Math.floor(Math.random()*width);
        console.log(randRow + '\t' + randCol);
      }
      else
        chkStatus = false;
    }
    field[randRow][randCol] = hat;
    return field;
  }

  // checkStatus() will check the status of the game whether it is win or loose.
  checkStatus(){
    if(next === hole){
      console.log("Sorry, you fell down in a hole");
      status = false;
      return status;
    }
    if(next === hat){
      console.log("Congratulations,You found the Hat....");
      status = false;
      return status;
    }
    if(next === undefined)
    {
      console.log('Out of Play fiels, Game Over!!')
      status = false;
      return status;
    }
  }
   
}

// declare a function variable which will take a user prompt for the game and mode the game further
let askPrompt = function(u1) {
  u1.print();
  console.log('Instuctions on how to play the game.');
  console.log('\nNavigate to the hat symbol "^" to win using they keys r(right), l(left), u(up) or d(down).\nAvoid falling down to hole or moving out of the playing field.\nYour position is marked by the "*"');
  console.log('When ready, start the game. Good luck.');
  console.log('Press ctrl+C to exit from game');
  const move = prompt('Which way?');
  
  if(move==='r')
  {
      next = u1.field[posRow][posCol+1];
      if(next !== undefined)
      {
        if(next !== hole && next !== hat)
        {
            u1.field[posRow][posCol+1] = pathCharacter;
            posCol +=1;
            u1.print();
        }
        else 
            u1.checkStatus();
      }
      else
      {
          u1.checkStatus();
      }
  }
  else if(move === 'u' && posRow != 0)
  {
      
    next = u1.field[posRow-1][posCol];
    
    console.log(next);
    if(next !== hole && next !== hat)
    {
        u1.field[posRow-1][posCol] = pathCharacter;
        posRow -=1;
        u1.print();
    }
    else 
        u1.checkStatus();
  }

  else if(move === 'u' && posRow === 0)
  {
    next = undefined;
    u1.checkStatus();
  }

  else if(move === 'd' && posRow < u1.field.length-1)
  {
      next = u1.field[posRow+1][posCol];
      
      if(next !== hole && next !== hat)
      {
        u1.field[posRow+1][posCol] = pathCharacter;
        posRow +=1;
        u1.print();
      }
      else 
        u1.checkStatus();
      
  }
  else if(move === 'd' && posRow === u1.field.length-1){
    
    next = undefined;
    u1.checkStatus();
      
  }

  else if(move === 'l')
  {
    next = u1.field[posRow][posCol-1];
    
    if(next !== undefined){
        
        if(next !== hole && next !== hat)
        {
          u1.field[posRow][posCol-1] = pathCharacter;
          posCol -=1;
          u1.print();
        }
        else 
          u1.checkStatus();
    }
    else
    {
      u1.checkStatus();
    }
  }
};

const f1 = Field.generateField(5,4,20); // creates static variable f1 and generates a random 2-dim array
const u1 = new Field(f1); // create an instance u1 of class Field

// below while loop will continue until status is true or prompt.sigint is false
while(status || prompt.sigint == false) {
    askPrompt(u1);
}

