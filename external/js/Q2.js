document.write("<h1>Hello word!</h1>");
document.write("<p id='myColor' style='color:white'>I love this colour!</p>");
let userColor = prompt("what is your favorite color?","white is default");
document.getElementById('myColor').style.color = userColor;
document.write("<div id='myDiv'> </div>");
document.getElementById("myDiv").style.backgroundColor = userColor;
document.getElementById("myDiv").style.width = "40px";
document.getElementById("myDiv").style.height = "20px";


