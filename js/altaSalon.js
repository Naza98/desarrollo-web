document.addEventListener('DOMContentLoaded', () =>{
    if(!sessionStorage.getItem('usuario')){
        alert('Por favor, primero debe iniciar sesión')
        window.location.href = 'js/login.html'; 
        return;
    }


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
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const descripcion = document.getElementById('descripcion').value;
        const logoInput = document.getElementById('logo');
        const logoFile = logoInput.files[0];
        const logoURL = logoFile ? URL.createObjectURL(logoFile) : '';

        const salon = {nombre, direccion, descripcion, logo:logoURL}
        const salones = JSON.parse(localStorage.getItem('salones')) || [];

        if(indexEditar >= 0){
            salones[window.indexEditar] = { nombre, direccion, descripcion, logo: logoURL || salones[window.indexEditar].logo };
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
        Descripción: ${descripcion}`);

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
    salones.forEach((salon, index) =>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${salon.nombre}</td>
            <td>${salon.direccion}</td>
            <td>${salon.descripcion}</td>
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
