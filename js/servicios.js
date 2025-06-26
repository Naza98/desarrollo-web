import { verificarAutenticacion } from "./auth.js";

document.addEventListener('DOMContentLoaded', async () => {

    // Inicializar servicios hardcodeados si no existen
    if (!localStorage.getItem('servicios')) {
        const serviciosHardcode = [
            {
                descripcion: 'Servicio de catering infantil completo con menú balanceado y bebidas',
                valor: '1800'
            },
            {
                descripcion: 'DJ profesional con música infantil y sistema de sonido',
                valor: '1200'
            },
            {
                descripcion: 'Decoración temática con globos, guirnaldas y centros de mesa',
                valor: '950'
            },
            {
                descripcion: 'Animador profesional con juegos, obras de teatro y actividades',
                valor: '1500'
            },
            {
                descripcion: 'Servicio de fotografía y video del evento',
                valor: '2200'
            },
            {
                descripcion: 'Alquiler de inflables y juegos para exteriores',
                valor: '800'
            },
            {
                descripcion: 'Show de magia interactivo para niños',
                valor: '1100'
            },
            {
                descripcion: 'Servicio de limpieza post-evento',
                valor: '600'
            }
        ];
        localStorage.setItem('servicios', JSON.stringify(serviciosHardcode));
    }

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