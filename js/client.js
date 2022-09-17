const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".chat-section");



const append = (message, position) => {
    const text = document.createElement('div');
    text.innerText = message;
    text.classList.add('message');
    text.classList.add(position);
    messageContainer.append(text);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter your name to join"); 
// console.log(name, "hello");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'left') 
});

socket.on('recieve', data=>{
    append(`${data.name} : ${data.message}`, 'left') 
});

socket.on('left', name=>{
    append(`${name} : left the chat`, 'left') 
})


let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let writingArea = document.getElementById("messageInp");
// let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let formatButtons = document.querySelectorAll(".format");


const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(formatButtons, false);
    
  };
  //main logic
  const modifyText = (command, defaultUi, value) => {
    console.log("hello");
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
  };
  //For basic operations which don't need value parameter
  optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyText(button.id, false, null);
    });
  });
  //options that require value parameter (e.g colors, fonts)
  advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
      modifyText(button.id, false, button.value);
    });
  });
  //link
    // linkButton.addEventListener("click", () => {
    //   let userLink = prompt("Enter a URL");
    //   //if link has http then pass directly else add https
    //   if (/http/i.test(userLink)) {
    //     modifyText(linkButton.id, false, userLink);
    //   } else {
    //     userLink = "http://" + userLink;
    //     modifyText(linkButton.id, false, userLink);
    //   }
    // });
  //Highlight clicked button
  const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
      button.addEventListener("click", () => {
        //needsRemoval = true means only one button should be highlight and other would be normal
        if (needsRemoval) {
          let alreadyActive = false;
          //If currently clicked button is already active
          if (button.classList.contains("active")) {
            alreadyActive = true;
          }
          //Remove highlight from other buttons
          highlighterRemover(className);
          if (!alreadyActive) {
            //highlight clicked button
            button.classList.add("active");
          }
        } else {
          //if other buttons can be highlighted
          button.classList.toggle("active");
        }
      });
    });
  };
  const highlighterRemover = (className) => {
    className.forEach((button) => {
      button.classList.remove("active");
    });
  };
  window.onload = initializer();