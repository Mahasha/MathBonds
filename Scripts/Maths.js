var plusSign = '+';

var chars = [];
var question;

var answer, sign, num1, num2, a, b, points = 0, counter = 0;
var possiblepoints = 0, totalSeconds = 0;
var corrections = [];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var modal, btn;

function displayQuestion()
{
	question = document.getElementById("question");
    num1 = Math.floor(Math.random() * 6);
    num2 = Math.floor(Math.random() * 6);
	//Display question on a paragraph tag
	question.innerHTML = "What is " + num1 + ' ' + plusSign + ' ' + num2 + " ?";
}

function closeSpan()
{
	location.reload();
}

function startButton() //Button onclick
{
	btn = document.getElementById("myBtn");
	var contain = document.getElementById("buttonContainer");
	a = new Date();
	// Get the modal
	modal = document.getElementById('myModal');

	modal.style.display = "block";
	//Display the question
	btn.style.visibility = "hidden";
	contain.style.visibility = "hidden";
	displayQuestion();
}

function quitButton() //Finish Button onclick
{	 
	var btn = document.getElementById("quit");
	var results = document.getElementById("txtResults");
	
	btn.style.visibility = "hidden";
	question.innerHTML = "";
	
	results.innerHTML = "Total time taken: " + totalSeconds.toFixed(2) + " seconds";
	results.innerHTML += "<br><br>You received: " + points + " out of " + possiblepoints + " possible points.";
	if(points == possiblepoints && points != 0)
		results.innerHTML += "<br>You are a genius, keep it up!";
	else if(points >= (possiblepoints - 5))
		results.innerHTML += "<br>You have potential to be a Maths Guru, keep it up!";
	else
		results.innerHTML += "<br>Please practise everyday to ensure you grab it, Good Luck!";

	if(points < possiblepoints)
		results.innerHTML += "<br><br>Corrections below<br>===========<br>" + "<font color='red'>"+corrections.join(" ") + "</font>";
}

function calculateAnswer(n1, plusSign, n2) 
{
	return parseInt(n1) + parseInt(n2);
}

document.onkeypress = function(evt)
{   
  counter = counter + 1;
  possiblepoints = counter * 10;
	
  var text = document.getElementById("txtResults");
  answer = calculateAnswer( num1 , sign, num2 );
	
  b = new Date();
  var seconds = (b - a) / 1000;
  evt = evt || window.Event;
  var code = evt.keyCode || evt.which;
  var codeValue = String.fromCharCode(code);
  totalSeconds += seconds;

  if(parseInt(codeValue) == parseInt(answer) || 
	(parseInt(answer) == 10 && parseInt(codeValue) == 0))
  {
	  if(seconds >= 10)
		  points += 0;
	  else if(seconds >= 6)
		  points += 2;
	  else if(seconds >= 3)
		  points += 4;
	  else
		  points += 10;
  }
  else 
  {
	  points -= 10;
	  corrections.push(num1 + ' ' + plusSign + ' ' + num2 + ' = ' + answer + "<br>");
  }
	
  if(points < 0)
	  points = 0;
  	startButton();
}
