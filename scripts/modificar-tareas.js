const inputNombre = document.querySelector('#txt-nombre');
const inputFecha = document.querySelector('#txt-fecha');
const inputPrioridad = document.querySelector('#txt-prioridad');
const inputEncargado = document.querySelector('#txt-encargado');
const inputDescripcion = document.querySelector('#txt-descripcion');
const btnAgregar = document.querySelector('#btn-agregar');
const btnCancelar = document.querySelector('#btn-cancelar');



/////CODIGO PARA CONECTAR AL BACKEND
const registrarTarea = async(pnombre, pfecha, pprioridad, pencargado, pdescripcion) => {

    await axios({
            method: 'post',
            url: 'http://localhost:3000/api/registrar-tarea',
            responseType: 'json',
            data: {
                nombre: pnombre,
                fecha: pfecha,
                prioridad: pprioridad,
                encargado: pencargado,
                descripcion: pdescripcion,
            }
        })
        .then((response) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: 'Modificando tarea'
            }).then(() => {
                window.location.href = 'index.html';
            });
        })
        .catch((error) => {
            Swal.fire({
                'title': 'No se pudo registrar la tarea',
                'text': `Ocurrió el siguiente error {error}`,
                'icon': 'error'
            })
        });
};

const modificarTarea = async(pid, pnombre, pfecha, pprioridad, pencargado, pdescripcion) => {
    await axios({
        method: 'put',
        url: 'http://localhost:3000/api/modificar-tarea',
        responseType: 'json',
        data: {
            _id: pid,
            nombre: pnombre,
            fecha: pfecha,
            prioridad: pprioridad,
            encargado: pencargado,
            descripcion: pdescripcion
        }
    }).then((response) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        Toast.fire({
            icon: 'success',
            title: 'Modificando tarea'
        }).then(() => {
            window.location.href = 'index.html';
        });
    })
    .catch((error) => {
        Swal.fire({
            'title': 'No se pudo modificar la tarea',
            'text': `Ocurrió el siguiente error {error}`,
            'icon': 'error'
        })
    });
};



/////TERMINA CODIGO DEL BACKEND

//'use strict';
///Get info del backend

if (localStorage.getItem('tareaModificar')) {
    tareaModificar = JSON.parse(localStorage.getItem('tareaModificar'));
    inputNombre.value = tareaModificar.nombre;
    let _id = tareaModificar._id

    let date = tareaModificar.fecha;
    console.log(tareaModificar.fecha);
    let dateSplit = date.split("T")
    date = dateSplit[0];

    //Formato fecha
    function cambiarFecha(input) {
        var datePart = input.match(/\d+/g),
            anno = datePart[0].substring(0),
            mes = datePart[1],
            day = datePart[2];
        return anno + '-' + mes + '-' + day;
    }
    date = cambiarFecha(date);
    //

    inputFecha.value = date;
    inputPrioridad.value = tareaModificar.prioridad;
    inputEncargado.value = tareaModificar.encargado;
    inputDescripcion.value = tareaModificar.descripcion;
    _id = tareaModificar._id;

} else {
    Swal.fire({
        'icon': 'warning',
        'title': 'Atención',
        'text': 'Hubo un error'
    }).then(() => {
        window.location.href = 'index.html';
    });
}

//Validación de espacios de registro de tareas

const validar = () => {
    let error = false;
    let errorFecha = false;

    //Validación de espacios vacios
    if (inputNombre.value == '') {
        error = true;
        inputNombre.classList.add('error');
    } else {
        inputNombre.classList.remove('error');
    }

    if (inputFecha.value == '') {
        error = true;
        inputFecha.classList.add('error');
    } else {
        inputFecha.classList.remove('error');
    }

    if (inputPrioridad.value == '') {
        error = true;
        inputPrioridad.classList.add('error');
    } else {
        inputPrioridad.classList.remove('error');
    }

    if (inputEncargado.value == '') {
        error = true;
        inputEncargado.classList.add('error');
    } else {
        inputEncargado.classList.remove('error');
    }

    if (inputDescripcion.value == '') {
        error = true;
        inputDescripcion.classList.add('error');
    } else {
        inputDescripcion.classList.remove('error');
    }

   //Validación de tiempo
    
    let today = new Date();

    function convertir(x) {
        var date = new Date(x),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    let today2 = convertir(today);


    console.log(today);
    console.log(today2);
    console.log(inputFecha);
    
    if (error == true) {
        Swal.fire({
            imageUrl: "images/error.png",
            title: "¡D'oh! Algo pasó aquí",
            text: "Hay un espacio vacio",
            confirmButtonColor: "#ED337C",
            confirmButtonText: "Intentar de nuevo"
        });
    } else {
        if (inputFecha.value >= today2) {
            errorFecha = false;
        } else {
            errorFecha = true;

            Swal.fire({
                imageUrl: "images/time.jpg",
                title: "Espera",
                text: "No se permite el registro de fechas anteriores a hoy",
                confirmButtonText: "Regresar"
            })
            inputFecha.classList.add('error');
        }
    }

    ///
    if (error == false && errorFecha == false) {
        registrar();
        console.log("Se envió el registro al backend");
    }
};

const calcularEdad = (nacimiento) => {
    let fechaActual = new Date();
    let edad = fechaActual.getFullYear() - nacimiento.getFullYear();

    if (fechaActual.getMonth() < nacimiento.getMonth()) {
        edad = edad - 1;
    } else {
        if ((fechaActual.getMonth() == nacimiento.getMonth()) && (fechaActual.getUTCDate() < nacimiento.getUTCDate())) {
            edad = edad - 1;
        }
    }
    return edad;
};

const registrar = () => {
    localStorage.getItem('tareaModificar');
    tareaModificar = JSON.parse(localStorage.getItem('tareaModificar'));
    
    let _id = tareaModificar._id
    let id = tareaModificar._id;
    let nombre = inputNombre.value;
    let fecha = new Date(inputFecha.value);
    let prioridad = inputPrioridad.value;
    let encargado = inputEncargado.value;
    let descripcion = inputDescripcion.value;
    modificarTarea(_id, nombre, fecha, prioridad, encargado, descripcion);
};

/////TERMINA CODIGO VALIDACION





btnAgregar.addEventListener('click', function() {validar() });
btnCancelar.addEventListener('click', () => {
    window.location.href = 'index.html';
})