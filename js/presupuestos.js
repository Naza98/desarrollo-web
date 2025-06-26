document.addEventListener('DOMContentLoaded', () => {
    // Seteamos la fecha actual por default
    document.getElementById('fecha').valueAsDate = new Date();
    
    cargarSalones();
    cargarServicios();
    cargarListaPresupuestos(); // 
    
    // Event listeners
    document.getElementById('formPresupuesto').addEventListener('submit', generarPresupuesto);
    document.getElementById('salon').addEventListener('change', actualizarVistaPrevia);
    
    ['nombre', 'apellido', 'fecha'].forEach(id => {
        document.getElementById(id).addEventListener('input', actualizarVistaPrevia);
    });
})

// Función para formatear fecha sin problemas de zona horaria ya que js lo estaba interpretando como UTC 
function formatearFecha(fechaString) {
    const [year, month, day] = fechaString.split('-');
    return new Date(year, month - 1, day).toLocaleDateString('es-AR');
};

function cargarSalones() {
    const select = document.getElementById('salon');
    const salones = JSON.parse(localStorage.getItem('salones')) || [];
    
    salones.forEach((salon, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${salon.nombre} - $${parseFloat(salon.precio).toLocaleString()}`;
        option.dataset.salon = JSON.stringify(salon);
        select.appendChild(option);
    });
}

function cargarServicios() {
    const container = document.getElementById('serviciosContainer');
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    
    if (servicios.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay servicios disponibles</p>';
        return;
    }
    
    servicios.forEach((servicio, index) => {
        const div = document.createElement('div');
        div.className = 'form-check mb-2';
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${index}" id="servicio${index}" onchange="actualizarVistaPrevia()">
            <label class="form-check-label d-flex justify-content-between" for="servicio${index}">
                <span>${servicio.descripcion}</span>
                <strong>$${parseFloat(servicio.valor).toLocaleString()}</strong>
            </label>
        `;
        container.appendChild(div);
    });
}

function actualizarVistaPrevia() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha = document.getElementById('fecha').value;
    const salonSelect = document.getElementById('salon');
    const vistaPrevia = document.getElementById('vistaPrevia');
    
    if (!nombre || !apellido || !fecha || !salonSelect.value) {
        vistaPrevia.innerHTML = '<p class="text-muted text-center">Complete el formulario para ver la vista previa</p>';
        return;
    }
    
    const salon = JSON.parse(salonSelect.options[salonSelect.selectedIndex].dataset.salon);
    const serviciosSeleccionados = obtenerServiciosSeleccionados();
    const total = calcularTotal(salon, serviciosSeleccionados);
    
    // Fromateamos la fecha
    const fechaFormateada = formatearFecha(fecha);
    
    vistaPrevia.innerHTML = `
        <div class="border-bottom pb-2 mb-3">
            <h6><strong>Cliente:</strong> ${nombre} ${apellido}</h6>
            <p class="mb-1"><strong>Fecha:</strong> ${fechaFormateada}</p>
        </div>
        
        <div class="border-bottom pb-2 mb-3">
            <h6><strong>Salón:</strong></h6>
            <p class="mb-1">${salon.nombre}</p>
            <p class="mb-0 text-end">$${parseFloat(salon.precio).toLocaleString()}</p>
        </div>
        
        ${serviciosSeleccionados.length > 0 ? `
        <div class="border-bottom pb-2 mb-3">
            <h6><strong>Servicios:</strong></h6>
            ${serviciosSeleccionados.map(s => `
                <div class="d-flex justify-content-between">
                    <span>${s.descripcion}</span>
                    <span>$${parseFloat(s.valor).toLocaleString()}</span>
                </div>
            `).join('')}
        </div>
        ` : ''}
        
        <div class="text-center">
            <h5 class="text-primary"><strong>Total: $${total.toLocaleString()}</strong></h5>
        </div>
    `;
}

function obtenerServiciosSeleccionados() {
    const checkboxes = document.querySelectorAll('#serviciosContainer input[type="checkbox"]:checked');
    const servicios = JSON.parse(localStorage.getItem('servicios')) || [];
    
    return Array.from(checkboxes).map(cb => servicios[parseInt(cb.value)]);
}

function calcularTotal(salon, servicios) {
    const precioSalon = parseFloat(salon.precio);
    const precioServicios = servicios.reduce((sum, s) => sum + parseFloat(s.valor), 0);
    return precioSalon + precioServicios;
}

function generarPresupuesto(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha = document.getElementById('fecha').value;
    const salonSelect = document.getElementById('salon');
    
    if (!salonSelect.value) {
        alert('Por favor seleccione un salón');
        return;
    }
    
    const salon = JSON.parse(salonSelect.options[salonSelect.selectedIndex].dataset.salon);
    const servicios = obtenerServiciosSeleccionados();
    const total = calcularTotal(salon, servicios);
    
    const presupuesto = {
        id: Date.now(),
        fecha: fecha,
        cliente: {
            nombre: nombre,
            apellido: apellido
        },
        salon: salon,
        servicios: servicios,
        total: total,
        fechaCreacion: new Date().toISOString()
    };
    
    // Guardar datos en el localStorage
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    presupuestos.push(presupuesto);
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    
    // Mostrar modal con presupuesto
    mostrarPresupuestoModal(presupuesto);
    
    // Actualizar la lista de presupuestos
    cargarListaPresupuestos();
    
    alert('Presupuesto generado y guardado correctamente');
}

function mostrarPresupuestoModal(presupuesto) {
    const contenido = generarHTMLPresupuesto(presupuesto);
    document.getElementById('presupuestoGenerado').innerHTML = contenido;
    
    const modal = new bootstrap.Modal(document.getElementById('modalPresupuesto'));
    modal.show();
}

function generarHTMLPresupuesto(presupuesto) {
    const fechaFormateada = formatearFecha(presupuesto.fecha);
    
    return `
        <div id="presupuestoPDF" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #333; margin-bottom: 5px;">IDW S.A</h1>
                <p style="color: #666; margin: 0;">Eventos infantiles con magia y calidad</p>
                <h2 style="color: #007bff; margin-top: 20px;">PRESUPUESTO</h2>
            </div>
            
            <div style="margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div>
                        <strong>Cliente:</strong> ${presupuesto.cliente.nombre} ${presupuesto.cliente.apellido}
                    </div>
                    <div>
                        <strong>Fecha:</strong> ${fechaFormateada}
                    </div>
                </div>
                <div>
                    <strong>Presupuesto N°:</strong> ${presupuesto.id}
                </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background-color: #f8f9fa;">
                        <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Descripción</th>
                        <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #dee2e6; padding: 12px;">
                            <strong>Salón:</strong> ${presupuesto.salon.nombre}<br>
                            <small style="color: #666;">${presupuesto.salon.descripcion}</small>
                        </td>
                        <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                            $${parseFloat(presupuesto.salon.precio).toLocaleString()}
                        </td>
                    </tr>
                    ${presupuesto.servicios.map(servicio => `
                        <tr>
                            <td style="border: 1px solid #dee2e6; padding: 12px;">
                                <strong>Servicio:</strong> ${servicio.descripcion}
                            </td>
                            <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                                $${parseFloat(servicio.valor).toLocaleString()}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr style="background-color: #e9ecef;">
                        <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">TOTAL:</th>
                        <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right; color: #007bff;">
                            $${presupuesto.total.toLocaleString()}
                        </th>
                    </tr>
                </tfoot>
            </table>
            
            <div style="margin-top: 40px; font-size: 12px; color: #666; text-align: center;">
                <p>Este presupuesto es válido por 30 días desde la fecha de emisión.</p>
                <p>Para coordinar su evento, contáctenos al teléfono 370 4613260 o por email a eventos@idw.com.ar</p>
            </div>
        </div>
    `;
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const elemento = document.getElementById('presupuestoPDF');
    
    html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        const presupuesto = JSON.parse(localStorage.getItem('presupuestos')).slice(-1)[0];
        pdf.save(`presupuesto_${presupuesto.id}_${presupuesto.cliente.apellido}.pdf`);
    });
}

function limpiarFormulario() {
    document.getElementById('formPresupuesto').reset();
    document.getElementById('fecha').valueAsDate = new Date();
    
    // Desmarcar todos los checkboxes cuando hcamos el reset
    document.querySelectorAll('#serviciosContainer input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    actualizarVistaPrevia();
}

// ----- FUNCIONES PARA EL LISTADO DE PRESUPUESTOS ---------

function cargarListaPresupuestos() {
    const tbody = document.querySelector('#tablaPresupuestos tbody');
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    
    if (presupuestos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay presupuestos generados aún</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    // Mostrar los presupuestos más recientes primero
    presupuestos.reverse().forEach((presupuesto, index) => {
        const indiceReal = presupuestos.length - 1 - index;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${new Date(presupuesto.fecha).toLocaleDateString()}</td>
            <td>${presupuesto.cliente.nombre} ${presupuesto.cliente.apellido}</td>
            <td>${presupuesto.salon.nombre}</td>
            <td>
                <span class="badge bg-secondary">${presupuesto.servicios.length} servicio(s)</span>
            </td>
            <td class="text-end"><strong>$${presupuesto.total.toLocaleString()}</strong></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="verPresupuesto(${indiceReal})" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-success" onclick="descargarPresupuestoPDF(${indiceReal})" title="Descargar PDF">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function verPresupuesto(index) {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const presupuesto = presupuestos[index];
    
    if (!presupuesto) return;
    
    const contenido = generarHTMLPresupuesto(presupuesto);
    document.getElementById('presupuestoDetalle').innerHTML = contenido;
    
    // Guardar el índice para la descarga de PDF
    window.presupuestoActual = index;
    
    const modal = new bootstrap.Modal(document.getElementById('modalVerPresupuesto'));
    modal.show();
}

function descargarPresupuestoPDF(index) {
    const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];
    const presupuesto = presupuestos[index];
    
    if (!presupuesto) return;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generarHTMLPresupuesto(presupuesto);
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    document.body.appendChild(tempDiv);
    
    const { jsPDF } = window.jspdf;
    const elemento = tempDiv.querySelector('[id*="presupuesto"]');
    
    html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        pdf.save(`presupuesto_${presupuesto.id}_${presupuesto.cliente.apellido}.pdf`);
        
        document.body.removeChild(tempDiv);
    });
}

function descargarPDFDetalle() {
    if (typeof window.presupuestoActual !== 'undefined') {
        descargarPresupuestoPDF(window.presupuestoActual);
    }
}

window.actualizarVistaPrevia = actualizarVistaPrevia;
window.descargarPDF = descargarPDF;
window.limpiarFormulario = limpiarFormulario;
window.verPresupuesto = verPresupuesto;
window.descargarPresupuestoPDF = descargarPresupuestoPDF;
window.descargarPDFDetalle = descargarPDFDetalle;