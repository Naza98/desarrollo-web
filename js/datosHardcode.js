
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
        // {
        //     descripcion: 'Servicio de limpieza post-evento',
        //     valor: '600'
        // }
    ];
    localStorage.setItem('servicios', JSON.stringify(serviciosHardcode));
}