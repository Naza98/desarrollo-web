document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorSalones');
const salones = JSON.parse(localStorage.getItem('salones')) || [];

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
        <li class="list-group-item">Precio: $2.500</li>
        </ul>
    </div>
    `;
    contenedor.appendChild(card);
});
});