import { verificarAutenticacion } from "./auth.js";

document.addEventListener('DOMContentLoaded', async () => {

    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;

    // Manejar logout
    const salir = document.getElementById('logout');
    if(salir){
        salir.addEventListener('click', () => {
            sessionStorage.clear()
            window.location.href = 'js/login.html'
        })
    }

    // Form para dar de alta un servicio
    const form = document.getElementById('idformServicio');
    const tablaBody = document.querySelector('#tablaServicios tbody')
    window.indexEditar = -1;
    
    form.addEventListener('submit', async function(event){
        event.preventDefault();

        const autenticado = await verificarAutenticacion();
        if (!autenticado) return;

        const descripcion = document.getElementById('descripcion').value;
        const valor = document.getElementById('valor').value;

        const servicio = {descripcion, valor}
        const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

        if(indexEditar >= 0){
            servicios[window.indexEditar] = { descripcion, valor };
            localStorage.setItem('servicios', JSON.stringify(servicios))
            mostrarServicios()
            this.reset();    
            alert('Servicio actualizado correctamente!')

            indexEditar = -1;
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'Guardar servicio';
            btn.classList.remove('btn-warning');
            btn.classList.add('btn-success');
            return;

        } else {
            servicios.push(servicio);
        }

        localStorage.setItem('servicios', JSON.stringify(servicios))

        alert(`Registro guardado!\nDatos del nuevo servicio:\n
        Descripción: ${descripcion}
        Valor: $${valor}`);

        mostrarServicios()
        this.reset();        

        indexEditar = -1;
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Guardar servicio';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-success');
    })

    mostrarServicios()
})

function mostrarServicios() {
    const tablaBody = document.querySelector('#tablaServicios tbody')
    tablaBody.innerHTML = '';

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    if (servicios.length === 0) {
        tablaBody.innerHTML = `<tr><td colspan="3" class="text-center">No hay servicios cargados aún.</td></tr>`;
        return;
    }

    servicios.forEach((servicio, index) => {
        const fila = document.createElement('tr');
        // Formatear el valor para mostrar con separador de miles
        const valorFormateado = servicio.valor ? parseFloat(servicio.valor.toString().replace(/,/g, '')).toLocaleString() : '0';
        
        fila.innerHTML = `
            <td>${servicio.descripcion}</td>
            <td>$ ${valorFormateado}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editarServicio(${index})"> Editar
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarServicio(${index})"> Eliminar
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `
        tablaBody.appendChild(fila)
    })
}

window.mostrarServicios = mostrarServicios;