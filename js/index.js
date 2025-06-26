document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorSalones');

const salones = JSON.parse(localStorage.getItem('salones')) || [];

if (salones.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted">No hay salones cargados aún.</p>`;
    return;
}

salones.forEach(salon => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
    <div class="card h-100">
        ${salon.logo ? `<img src="${salon.logo}" class="card-img-top" alt="${salon.nombre}">` : ''}
        <div class="card-body">
        <h5 class="card-title">${salon.nombre}</h5>
        <p class="card-text">${salon.descripcion}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Dirección: ${salon.direccion}</li>
        <li class="list-group-item">Estado: Disponible</li>
        <li class="list-group-item">Precio: $${salon.precio}</li>
        </ul>
    </div>
    `;
    contenedor.appendChild(card);
});


const contenedorServicios = document.getElementById('contenedorServicios');
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];

    if (servicios.length === 0) {
        contenedorServicios.innerHTML = `<p class="text-center text-muted">No hay servicios cargados aún.</p>`;
    } else {
        servicios.forEach(servicio => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            const valorFormateado = servicio.valor ? parseFloat(servicio.valor.toString().replace(/,/g, '')).toLocaleString() : '0';
            
            card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <p class="card-text">${servicio.descripcion}</p>
                </div>
                <div class="card-footer bg-light">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted">Precio:</span>
                        <span class="h5 mb-0 text-primary">$${valorFormateado}</span>
                    </div>
                </div>
            </div>
            `;
            contenedorServicios.appendChild(card);
        });
    }

});