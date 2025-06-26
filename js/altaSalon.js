import { verificarAutenticacion } from "./auth.js";

// Función para convertir archivo a Base64 y que no se pierda cuando recargamos la pa`gina
function convertirABase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

document.addEventListener('DOMContentLoaded', async () =>{


    if (!localStorage.getItem('salones')) {
        const salonesHardcode = [
            {
                nombre: 'Salón Arcoíris',
                descripcion: 'Un lugar mágico lleno de color y alegría.',
                direccion: 'Av. Siempre Viva 123',
                precio: '2,235',
                logo: 'img/cuarto.png'
            },
            {
                nombre: 'Castillo Encantado',
                descripcion: 'Donde los sueños de los niños se hacen realidad.',
                direccion: 'Calle de los Sueños 456',
                precio: '2235',
                logo: 'img/quinto.jpg'
            },
            {
                nombre: 'Jardín de Aventuras',
                descripcion: 'Explora, juega y ríe en un espacio seguro y natural.',
                direccion: 'Boulevard Infantil 789',
                precio: '2235',
                logo: 'img/sexto.jpeg'
            },
            {
                nombre: 'Mundo Mágico',
                descripcion: 'Diversión asegurada con juegos, disfraces y espectáculos.',
                direccion: 'Pasaje Fantasía 101',
                precio: '2235',
                logo: 'img/primero.png'
            },
            {
                nombre: 'Planeta Kids',
                descripcion: 'Un planeta entero dedicado al juego y la imaginación.',
                direccion: 'Ruta Intergaláctica 42',
                precio: '2235',
                logo: 'img/segundo.png'
            },
            {
                nombre: 'La Granja Feliz',
                descripcion: 'Una experiencia temática con animales, naturaleza y aire libre.',
                direccion: 'Camino Rural 200',
                precio: '2235',
                logo: 'img/tercero.png'
            }
        ];
        localStorage.setItem('salones', JSON.stringify(salonesHardcode));
    }


    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;

    const salir = document.getElementById('logout');
    if(salir){
        salir.addEventListener('click', () => {
            sessionStorage.clear()
            window.location.href = 'js/login.html'
        })
    }


    // Form para dar de alta un salòn
    const form = document.getElementById('idformSalon');
    const tablaBody = document.querySelector('#tablaSalones tbody')
    window.indexEditar = -1;
    form.addEventListener('submit', async function(event){
        event.preventDefault();

        const autenticado = await verificarAutenticacion();
        if (!autenticado) return;

        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;
        const logoInput = document.getElementById('logo');
        const logoFile = logoInput.files[0];
        const logoURL = logoFile ? await convertirABase64(logoFile) : '';

        const salon = {nombre, direccion, descripcion, precio, logo:logoURL}
        const salones = JSON.parse(localStorage.getItem('salones')) || [];

        if(indexEditar >= 0){
            salones[window.indexEditar] = { nombre, direccion, descripcion, precio, logo: logoURL || salones[window.indexEditar].logo };
            localStorage.setItem('salones', JSON.stringify(salones))
            mostrarSalones()
            this.reset();    
            alert('Salón actualizado correctamente!')

            indexEditar = -1;
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Guardar salón';
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-success');
            return;

        } else {
            salones.push(salon); // agregamos el objeto salon al array, que recuperamos en la constante salon

        }

        localStorage.setItem('salones', JSON.stringify(salones)) // convierte el array de salones a una cadena JSON y se guarda en el localStorage 

        alert(`Registro guardado!\nDatos del nuevo salón:\n
        Nombre: ${nombre}
        Dirección: ${direccion}
        Descripción: ${descripcion}
        Precio: $${precio}`);

        mostrarSalones()
        this.reset();        

        indexEditar = -1;
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Guardar salón';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-success');
    })

mostrarSalones()
})

function mostrarSalones() {
    const tablaBody = document.querySelector('#tablaSalones tbody')
    tablaBody.innerHTML = '';

    const salones = JSON.parse(localStorage.getItem('salones')) || [];

    if (salones.length === 0) {
        tablaBody.innerHTML = `<tr><td colspan="6" class="text-center">No hay salones cargados aún.</td></tr>`;
        return;
    }


    salones.forEach((salon, index) =>{
        const fila = document.createElement('tr');
        const precioFormateado = salon.precio ? parseFloat(salon.precio.toString().replace(/,/g, '')).toLocaleString() : '0';

        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
            <td>$ ${precioFormateado}</td>
            <td>
                ${salon.logo ? `<img src="${salon.logo}" alt="Logo" style="max-width: 80px; max-height: 60px;">` : '-'}
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editarSalon(${index})"> Editar
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarSalon(${index})"> Eliminar
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>



        `
        tablaBody.appendChild(fila)
    })

} 

window.mostrarSalones = mostrarSalones;

