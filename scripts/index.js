'use strict';
// Funciones para conexión al backend /////////////////////////////////////////////////////////////////////
const listarTareasPendientes = async() => {
    console.log("Informacion de tareas pendientes solicitada al backend")
    let listaTareas;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/listar-tareas',
        responseType: 'json'
    }).then((response) => {
        console.log("hubo respuesta")
        listaTareas = response.data.tareas;
        console.log(listaTareas)
    }).catch((error) => {
        console.log("retorno error")
        console.log(error)
    });
    return listaTareas;
};

const eliminar = async(pid) => {
    await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/eliminar-tareas',
        responseType: 'json',
        data: {
            _id: pid,
        }
    }).then((response) => {
        Swal.fire({
            'icon': 'success',
            'title': 'La tarea se eliminó correctamente',
            'text': response.msj
        }).then(() => {
            window.location.href = 'index.html';
        });
    }).catch((error) => {
        Swal.fire({
            'title': 'Error',
            'icon': 'error',
            'text': "Hubo un error en el servidor"
        })
    });
};

// Fin de funciones de conexión al back end /////////////////////////////////////////////////////////////////////

// Inicia código del Front End /////////////////////////////////////////////////////////////////////

const tablaTareasPendientes = document.querySelector('#tbl-tareas tbody');
const filtroTareasPendientes = document.querySelector('#txt-filtro');
let listaTareas = [];


const LLENARtablaTareasPendientes = async() => {
    console.log("Se va a solicitar la informacion de proveedores pendientes")
    listaTareas = await listarTareasPendientes();
    console.log(listaTareas);
    mostrartablaTareasPendientes();
};

//Función que agrega las celdas a la tabla
const mostrartablaTareasPendientes = async => {
    let filtro = filtroTareasPendientes.value.toLowerCase();
    tablaTareasPendientes.innerHTML = '';
    console.log(listaTareas);
    listaTareas.forEach(tarea => {
        if (tarea.encargado.toLowerCase().includes(filtro)) {

            let fila = tablaTareasPendientes.insertRow();
            
            let nacimiento = tarea.fecha;
            let nacimientoSplit = nacimiento.split("T")
            nacimiento = nacimientoSplit[0];
            
            function cambiarFecha (input) {
            var datePart = input.match(/\d+/g),
            anno = datePart[0].substring(0), // get only two digits
            mes = datePart[1], day = datePart[2];
            // return day+'/'+mes+'/'+anno;
            return day+'-'+mes+'-'+anno;
            }
    
            nacimiento = cambiarFecha (nacimiento);



            fila.insertCell().innerHTML = nacimiento;
            fila.insertCell().innerHTML = tarea.nombre;
            
            let celdaPrioridad = fila.insertCell();
            celdaPrioridad.innerHTML = tarea.prioridad;
            celdaPrioridad.value = tarea.prioridad;
            
            switch (celdaPrioridad.innerHTML) {
                case 'Alta':
                    celdaPrioridad.classList.add('alta');
                    break;
                case 'Media':
                    celdaPrioridad.classList.add('media');
                    break;
                case 'Baja':
                    celdaPrioridad.classList.add('baja');
                    break;
                }

            // fila.insertCell().innerHTML = tarea.prioridad;

            fila.insertCell().innerHTML = tarea.encargado;
            fila.insertCell().innerHTML = tarea.descripcion;
            


            let celdaAcciones = fila.insertCell();

            let btnModificar = document.createElement('button');
            btnModificar.classList.add('btn2');
            btnModificar.innerText = 'Modificar';

            btnModificar.addEventListener('click', () => {
                localStorage.setItem('tareaModificar', JSON.stringify(tarea));
                window.location.href = 'modificar-tareas.html';
            });
            

            let botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn2');
            botonEliminar.innerText = "Eliminar";

            botonEliminar.addEventListener('click', () => {
                Swal.fire({
                    'icon': 'warning',
                    'text': '¿Está seguro que desea eliminar la tarea , esta acción es irreversible?',
                    'showCancelButton': true,
                    'confirmButtonText': 'Sí estoy seguro',
                    'cancelButtonColor': '#d33',
                    'cancelButtonText': 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(tarea._id);
                    }
                })
            });
            
            celdaAcciones.appendChild(btnModificar);
            celdaAcciones.appendChild(botonEliminar);
        }
    });
};

LLENARtablaTareasPendientes();
filtroTareasPendientes.addEventListener('keyup', mostrartablaTareasPendientes)

const btnAgregar = document.querySelector('#btn-agregar');
btnAgregar.addEventListener('click', () => {
    window.location.href = 'agregar-tareas.html';
})