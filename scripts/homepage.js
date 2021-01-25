const goToRegister = event => {
	event.preventDefault();

	window.location = 'register.html';
}

const goToLogin = event => {
	event.preventDefault();

	window.location = 'login.html';
}

(function() {
	const registerButton = document.getElementById('register_button');
	registerButton.addEventListener('click', goToRegister);

	const loginButton = document.getElementById('login_button');
	loginButton.addEventListener('click', goToLogin);
})();