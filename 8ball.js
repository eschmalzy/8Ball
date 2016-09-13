document.body.style.background = "#888";
var askButton = document.getElementById('ask-button');
var messages = null;

askButton.onclick = function (){
  var randInt = Math.floor(Math.random() * messages.length);
  var message = document.getElementById('answer');
  var answerObj = messages[randInt];
  message.innerHTML = answerObj.answer;
  message.style.color = answerObj.color;
  recordMessage(answerObj.answer);
};

var recordMessage = function (answer) {
  var question = document.getElementById('question');
  //find container
  var history = document.getElementById("history");
  //create child element
  var historyList = document.createElement("li");
  //configure child element
  historyList.innerHTML ="Question: "+ question.value + " Answer: " + answer;
  //append child element
  history.appendChild(historyList);
};

var request = new XMLHttpRequest();
request.onreadystatechange = function (){
  if (request.readyState == XMLHttpRequest.DONE){
    if (request.status >= 200 && request.status < 400) {
      messages = JSON.parse(request.responseText);
      console.log(messages);
    } else {
      alert("Something went wrong.");
    }
  }
};

request.open("GET", "https://api.myjson.com/bins/562e6");
request.send();
