import { login } from './auth.js';

document.getElementById('idFormLogin').addEventListener('submit', async function(event){ 
    event.preventDefault(); 

    const usuario = document.getElementById('usuario').value
    const pass = document.getElementById('contrasenia').value

    const ususarioValidado = await login(usuario, pass)
    if(ususarioValidado){
        sessionStorage.setItem('usuario', ususarioValidado.username)
        sessionStorage.setItem('access-token', ususarioValidado.accessToken)
        alert('Logueo exitoso!')
        window.location.href = '../altaSalon.html'
    } else {
        alert('Usuario incorrecto')
    }
})