function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// declare boonlean variable activePlayer; where true is for 'X' and false is for "O"
var boxClicked = document.querySelectorAll('.row .box');
var activePlayer;
var currentPlayer;
var playerOne;
var playerTwo;
var xChosen;
var oChosen;
var boxNumber;
var winningCombos;


function startCondition(){
  winningCombos = [
                        ['1','2','3'],
                        ['4','5','6'],
                        ['7','8','9'],
                        ['1','5','9'],
                        ['3','5','7'],
                        ['1','4','7'],
                        ['2','5','8'],
                        ['3','6','9']
                      ];
  xChosen = [[], [], [], [], [], [], [], []];
  oChosen = [[], [], [], [], [], [], [], []];
  boxNumber = 1;

  boxClicked.forEach(function (thisBox){
    thisBox.innerText = "";
    thisBox.setAttribute('boxId', boxNumber);
    boxNumber++;
  });

  playerOne = prompt("Enter the First Player's Name:").toLowerCase();
  playerOne = toTitleCase(playerOne);
  if(prompt('Select Your Symbol: X or O').toLowerCase() == 'x'){
      activePlayer = true;
      currentPlayer = true;
    }else{
    activePlayer = false;
    currentPlayer = true;
  };
  playerTwo = prompt('Enter the Opponent\'s Name:').toLowerCase();
  playerTwo = toTitleCase(playerTwo);

  document.querySelector('#turnIdentifier').innerHTML = '<h2>Begin!</h2>';
  document.querySelector('.button').innerHTML = '<button id="reset">Reset Game</button>';
  document.querySelector(".bottom-content #reset").addEventListener('click', startCondition);
  boxSetup();
};

document.querySelector('#start').addEventListener('click', startCondition);


function sortAndCheck(arr, number){
  switch(number){
    case '1':
      arr[0].push('1');
      arr[3].push('1');
      arr[5].push('1');
      // console.log(arr);
      break;
    case '2':
      arr[0].push('2');
      arr[6].push('2');
      // console.log(arr);
      break;
    case '3':
      arr[0].push('3');
      arr[4].push('3');
      arr[7].push('3');
      // console.log(arr);
      break;
    case '4':
      arr[1].push('4');
      arr[5].push('4');
      // console.log(arr);
      break;
    case '5':
      arr[1].push('5');
      arr[3].push('5');
      arr[4].push('5');
      arr[6].push('5');
      // console.log(arr);
      break;
    case '6':
      arr[1].push('6');
      arr[7].push('6');
      // console.log(arr);
      break;
    case '7':
      arr[2].push('7');
      arr[4].push('7');
      arr[5].push('7');
      // console.log(arr);
      break;
    case '8':
      arr[2].push('8');
      arr[6].push('8');
      // console.log(arr);
      break;
    case '9':
      arr[2].push('9');
      arr[3].push('9');
      arr[7].push('9');
      // console.log(arr)
      break;
  }
  for(var i=0; i<arr.length; i++){
    arr[i].sort();
  };
  for(var i=0; i<winningCombos.length; i++){
    var winningNum = winningCombos[i].join('');
    for(var p=0; p<arr.length; p++){
      var playerCombos = arr[p].join('');
      if(playerCombos === winningNum){
        alert("You're a winner, baby");
        console.log(playerCombos + ' ' + winningNum);
        winningCombos = [['x'], ['x'], ['x'], ['x'], ['x'], ['x'], ['x'], ['x']];
        return true
      }
    }
  };
  return false;
};

// if(currentPlayer == true){
//   document.querySelector('#turnIdentifier').innerText = "Your turn, " + playerOne;
//   }else if(currentPlayer == false){
//     document.querySelector('#turnIdentifier').innerText = "Your turn, " + playerTwo;
//   };


function boxSetup(){
  boxClicked.forEach(function (thisBox){

      thisBox.addEventListener('click', function clicking(){

        if(activePlayer === true){
          thisBox.innerText = 'X';
          activePlayer = false;
          if(currentPlayer == true){
            document.querySelector('#turnIdentifier').innerHTML = "<h2>" +playerTwo+"'s turn</h2>";
            currentPlayer = false;
          }else if(currentPlayer == false){
            document.querySelector('#turnIdentifier').innerHTML = "<h2>" +playerOne+"'s turn</h2>"
            currentPlayer = true;
          };
          if(sortAndCheck(xChosen, thisBox.getAttribute('boxId')) == true){
            removeClickability();
          };
          thisBox.removeEventListener('click', clicking);
        }

        else{
          thisBox.innerText = 'O';
          activePlayer = true;
          if(currentPlayer == true){
            document.querySelector('#turnIdentifier').innerHTML = "<h2>" +playerTwo+"'s turn</h2>";
            currentPlayer = false;
          }else if(currentPlayer == false){
            document.querySelector('#turnIdentifier').innerHTML = "<h2>" +playerOne+"'s turn</h2>"
            currentPlayer = true;
          };
          if(sortAndCheck(oChosen, thisBox.getAttribute('boxId')) == true){
            removeClickability();
          };
          thisBox.removeEventListener('click', clicking);
        };

        function removeClickability(){
          boxClicked.forEach(function (thisBox){
            thisBox.removeEventListener('click', clicking);
          });
        };

      });
    });
  };
