const login = event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username,
        password,
    };

    const settings = {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `data=${JSON.stringify(user)}`
    };

    ajax('src/api.php/login', settings, false, 'dashboard.html');
};

(function() {
    const loginButton = document.getElementById('login_button');

    loginButton.addEventListener('click', login);
})();