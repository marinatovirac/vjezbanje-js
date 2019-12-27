function validacija() {

	let user = document.getElementById('user');
	let listNames = ["Ana","Marko","Tea","Marija","Iva","Luka","Maja"];
  
  
	if (user.value.length <= 20 && user.value.length >= 3) {} else {
	  alert("Username has to be between 3-20 characters.")
	}
  
  
	for (let i = 0; i < listNames.length; i++) {
	  if (listNames[i] === user.value) {
		alert('The name already exist')
	  }
	}
	return false;
  }

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

if('querySelector' in document) {

    // get all messages
    var messageComponents = document.querySelectorAll("[data-message]");

    // if at least one message is in the DOM
    if (messageComponents.length > 0) {
        // loop over each message
        [].forEach.call(messageComponents, function (message) {
            var messageButton = message.querySelector("[data-closenotification]");
            // show the close button 
            messageButton.removeAttribute('hidden');

            // on click hide the message
            messageButton.addEventListener("click", function () {
                this.parentElement.hidden = true;
            });
        });
    }
}

