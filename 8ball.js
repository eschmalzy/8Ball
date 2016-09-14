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
  document.getElementById("question").value = "";
};

var recordMessage = function (answer) {
  var question = document.getElementById("question");
  //find container
  var history = document.getElementById("history");
  //create child element
  var historyList1 = document.createElement("li");
  var historyList2 = document.createElement("li");
  //configure child element
  historyList1.innerHTML = "Question: "+ question.value
  historyList2.innerHTML = "Answer: " + answer;
  //append child element
  history.appendChild(historyList1);
  history.appendChild(historyList2);
};
document.getElementById("question")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("ask-button").click();
    }
});
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

request.open("GET", "https://api.myjson.com/bins/562e6 ");
request.send();
