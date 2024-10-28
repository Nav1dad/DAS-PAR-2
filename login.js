document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Evitar que el formulario se envíe automáticamente

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Credenciales de administrador
    const adminUsername = "admin";
    const adminPassword = "12345";
    const maestro1 = "elmer";
    const contra = "2468"

    if (username === adminUsername && password === adminPassword) {
        // Si las credenciales son correctas, redirigir a la página del proyecto
        window.location.href = "index.html";
    }
    if(username === maestro1 && password === contra) {
        window.location.href = "portal.html"
    } 
    else {
        // Si son incorrectas, mostrar un mensaje de error
        errorMessage.textContent = "Usuario o contraseña incorrectos";
    }
});
