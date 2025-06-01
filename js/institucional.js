document.addEventListener('DOMContentLoaded', () => {
const contenedor = document.getElementById('contenedorSalones');

const dataHardcode = [
    {
      nombre: 'Salón Arcoíris',
      descripcion: 'Un lugar mágico lleno de color y alegría.',
      direccion: 'Av. Siempre Viva 123',
      logo: '../img/cuarto.png'
    },
    {
      nombre: 'Castillo Encantado',
      descripcion: 'Donde los sueños de los niños se hacen realidad.',
      direccion: 'Calle de los Sueños 456',
      logo: '../img/quinto.jpg'
    },
    {
      nombre: 'Jardín de Aventuras',
      descripcion: 'Explora, juega y ríe en un espacio seguro y natural.',
      direccion: 'Boulevard Infantil 789',
      logo: '../img/sexto.jpeg'
    },
    {
        nombre: 'Mundo Mágico',
        descripcion: 'Diversión asegurada con juegos, disfraces y espectáculos.',
        direccion: 'Pasaje Fantasía 101',
        logo: '../img/primero.png'
    },
    {
        nombre: 'Planeta Kids',
        descripcion: 'Un planeta entero dedicado al juego y la imaginación.',
        direccion: 'Ruta Intergaláctica 42',
        logo: '../img/segundo.png'
    },
    {
        nombre: 'La Granja Feliz',
        descripcion: 'Una experiencia temática con animales, naturaleza y aire libre.',
        direccion: 'Camino Rural 200',
        logo: '../img/tercero.png'
    }
  ];

const salones = JSON.parse(localStorage.getItem('salones')) || dataHardcode;

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