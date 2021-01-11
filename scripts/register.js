const register = event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const email = document.getElementById('email').value;

    const user = {
        username, //property userName sus stoinost userName
        password,
        confirm_password,
        email
    };
    //hash

    const settings = {
        method: 'POST', //izprashtame danni
        headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'   //tipa na dannite koito shte izprashtame
        },
        body: `data=${JSON.stringify(user)}` //prevrushtame hash-a user v json string
    };

    ajax('src/api.php/register', settings, false, 'login.html'); 

};


(function() {
    const registerButton = document.getElementById('register_button');

    registerButton.addEventListener('click', register);
})();


