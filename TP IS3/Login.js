function register(event) {
    event.preventDefault();
    const nombre = document.getElementById('register-nombre').value;
    const apellido = document.getElementById('register-apellido').value;
    const email = document.getElementById('register-email').value;
    const contraseña = document.getElementById('register-contraseña').value;

    if (nombre && apellido && email && contraseña) {
        localStorage.setItem(email, JSON.stringify({ nombre, apellido, contraseña }));
        alert('Registro exitoso');
        document.getElementById('chk').checked = false; // Volver al formulario de login
    } else {
        alert('Por favor, complete todos los campos');
    }
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const contraseña = document.getElementById('login-contraseña').value;

    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.contraseña === contraseña) {
        alert('Login exitoso');
        // Redirigir a la página principal o dashboard
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}