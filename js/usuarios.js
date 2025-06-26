import { verificarAutenticacion } from "./auth.js";

document.addEventListener('DOMContentLoaded', async ()=>{

    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;


    // Logout
    const salir = document.getElementById('logout');
    if(salir){
        salir.addEventListener('click', () => {
            sessionStorage.clear()
            window.location.href = 'js/login.html'
        })
    }

    const tablaBody = document.querySelector('#tablaUsuarios tbody')
    try {
        const response = await fetch('https://dummyjson.com/users')
        if(response.ok){
            const data = await response.json()
            const usuarios = data.users;

            usuarios.forEach((usuario) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${usuario.firstName}</td>
                    <td>${usuario.lastName}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.phone}</td>`
                tablaBody.appendChild(fila)
            })
        } else {
            console.log(response.status)
            throw Error("Error al consultar la api")
        }
    }catch(error) {
        console.log("error:", error);
        alert("Error con la api de usuarios")
    }
})