const ajax = (url, settings, loggedIn, successUrl) => {
	fetch(url, settings)
		.then(response => response.json())
		.then(data => loggedIn ? loadUser(data) : load(data, successUrl))
		.catch(error => console.log(error));
};

const load = (data, url) => {
	if(data.success) {
		window.location = url; //prenasochvane na potrebitelq
	} else {
		const errors = document.getElementById('errors');
		errors.innerHTML = data.error;
	}
};

const loadUser = data => {
	const helloUser = document.getElementById('user');

	if(data.success) {
		helloUser.innerHTML += data.data;
	} else {
		console.log(data.error);
		window.location = 'login.html';
	}
};