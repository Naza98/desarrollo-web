
function eliminarSalon(index) {
    if (confirm("¿Estás seguro de que querés eliminar este salón?")) {
        const salones = JSON.parse(localStorage.getItem('salones')) || [];
        salones.splice(index, 1);
        localStorage.setItem('salones', JSON.stringify(salones));
        mostrarSalones();
        alert('Salón eliminado con éxito!');

    }
}

function editarSalon(index) {
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    const salon = salones[index];

    const form = document.getElementById('idformSalon');

    form.nombre.value = salon.nombre;
    form.direccion.value = salon.direccion;
    form.descripcion.value = salon.descripcion;

    window.indexEditar = index;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Actualizar salón';
    btn.classList.remove('btn-success');
    btn.classList.add('btn-warning');
}

