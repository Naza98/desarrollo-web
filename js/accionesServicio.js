import { verificarAutenticacion } from './auth.js';


async function eliminarServicio(index) {

    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;

    if (confirm("¿Estás seguro de que querés eliminar este servicio?")) {
        const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
        servicios.splice(index, 1);
        localStorage.setItem('servicios', JSON.stringify(servicios));
        mostrarServicios();
        alert('Servicio eliminado con éxito!');
    }
}

async function editarServicio(index) {

    const autenticado = await verificarAutenticacion();
    if (!autenticado) return;

    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    const servicio = servicios[index];

    const form = document.getElementById('idformServicio');

    form.descripcion.value = servicio.descripcion;
    
    // Limpiar el valor de cualquier formato de comas antes de asignarlo al input
    const valorLimpio = servicio.valor ? servicio.valor.toString().replace(/,/g, '') : '';
    form.valor.value = valorLimpio;

    window.indexEditar = index;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Actualizar servicio';
    btn.classList.remove('btn-success');
    btn.classList.add('btn-warning');
}


window.eliminarServicio = eliminarServicio;
window.editarServicio = editarServicio;