const formulario = document.getElementById('formulario');
const registrosContainer = document.getElementById('registros');

function agregarRegistro(respuestas) {
    const registro = document.createElement('li');
    registro.textContent = respuestas.join(' - ');
    //mostrar boton eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('eliminar-btn');
    registro.appendChild(botonEliminar);
    
    //funcion del boton eliminar registro
    botonEliminar.addEventListener('click', function() { 
        registro.remove(); 
        actualizarLocalStorage(); 
    });

    registrosContainer.appendChild(registro); // Agregar el registro 
    actualizarLocalStorage(); 
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const respuestas = [
        document.getElementById('pregunta1').value,
        document.getElementById('pregunta2').value,
        document.getElementById('pregunta3').value,
        document.getElementById('pregunta4').value
    ];
    //validacion
    if (respuestas.some(respuesta => respuesta.trim() === '')) {
        alert('Por favor, responde todas las preguntas.');
        return;
    }

    agregarRegistro(respuestas);
    formulario.reset();// limpia el formulario
});
//actuliza los registros
function actualizarLocalStorage() {
    const registros = [...registrosContainer.children].map(li => li.textContent);
    localStorage.setItem('encuestas', JSON.stringify(registros));
}

//carga de registros
window.addEventListener('load', function() {
    const registros = JSON.parse(localStorage.getItem('encuestas')) || [];
    registros.forEach(registro => {
        const li = document.createElement('li');
        li.textContent = registro;
        
        //botón de eliminar registro
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar-btn');
        li.appendChild(botonEliminar);

        botonEliminar.addEventListener('click', function() {
            li.remove();
            actualizarLocalStorage(); 
        });
        
        registrosContainer.appendChild(li); // Agregar registro al grid
    });
});
