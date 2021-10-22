


const button = document.getElementById('btnPost');


button.addEventListener('click', async _ => {
try {
    const textfield1 = document.getElementById('txtSalarioInput').value;
    const textfield2 = document.getElementById('txtAsociacionSInput').value;
    const textfield3 = document.getElementById('txtOtroInput').value;
    const textfield4 = document.getElementById('txtCCSSSEM');
    const textfield5 = document.getElementById('txtCCSSIVM');
    const textfield6 = document.getElementById('txtBP');
    const textfield7 = document.getElementById('txtAsociacionS');
    const textfield8 = document.getElementById('txtOtro');
    const textfield9 = document.getElementById('txtImpuesto');
    const textfield10 = document.getElementById('txtTotal');
    const textfield11 = document.getElementById('txtSalarioNeto');

    var url = "https://httpfunction20211014192914.azurewebsites.net/api/function1";
    var HTTP = new XMLHttpRequest();
    
    HTTP.open("POST", url);
    HTTP.setRequestHeader("Content-Type", "application/json");
    HTTP.onreadystatechange = function () {
    if (HTTP.readyState === 4) {
        const response = JSON.parse(HTTP.responseText);
        textfield4.value = 0+response.CCSS_Enfermedad_y_Maternidad,
        textfield5.value = 0+response.CCSS_Invalidez_y_Muerte;
        textfield6.value = 0+response.Aporte_Banco_Popular;
        textfield7.value = 0+response.Asociacion_solidarista;
        // textfield8.value = 0+response.Otras_deducciones;
        textfield9.value = 0+response.Impuesto_de_la_Renta;
        textfield10.value = 0+response.Total_de_deducciones;
        textfield11.value = 0+response.Salario_neto;

        console.log(HTTP.status);
        console.log(HTTP.responseText);
    }};
    console.log(textfield1)
    var myData = {
        // salary : 5000000,
        // sAssociation : 0,
        // others : 0
        salary : 0+textfield1,
        sAssociation : 0+textfield2,
        others : 0+textfield3
    };
    var data = JSON.stringify(myData)
    // var data = `{
    //     salary: 5000000,
    //     sAssociation: 0,
    //     others: 0
    //     }`;
    
    HTTP.send(data);

} catch(err) {
console.error(err);
}
});











// const button = document.getElementById('btnPost');

// button.addEventListener('click', async _ => {
// try {     
// const response = await fetch('https://httpfunction20211014192914.azurewebsites.net/api/function1', {
//     method: 'post',
//     body: {
//     salary: 5000000,
//     sAssociation: 0,
//     others: 0
//     }
// });
// console.log('Completed!', response);
// } catch(err) {
// console.error(`Error: ${err}`);
// }
// });













// $(document).ready(function(){
// $("button").click(function(){
//     $.post("https://httpfunction20211014192914.azurewebsites.net/api/function1",
//     {

//     salary: 5000000,
//     sAssociation: 0,
//     others: 0
//     },
//     function(data,status){
//     alert("Data: " + data + "\nStatus: " + status);
//     });
// });
// });

// 'use strict';
// // Funciones para conexión al backend /////////////////////////////////////////////////////////////////////
// const listarTareasPendientes = async() => {
//     console.log("Informacion de tareas pendientes solicitada al backend")
//     let listaTareas;
//     await axios({
//         method: 'get',
//         url: 'http://localhost:3000/api/listar-tareas',
//         responseType: 'json'
//     }).then((response) => {
//         console.log("hubo respuesta")
//         listaTareas = response.data.tareas;
//         console.log(listaTareas)
//     }).catch((error) => {
//         console.log("retorno error")
//         console.log(error)
//     });
//     return listaTareas;
// };

// const eliminar = async(pid) => {
//     await axios({
//         method: 'delete',
//         url: 'http://localhost:3000/api/eliminar-tareas',
//         responseType: 'json',
//         data: {
//             _id: pid,
//         }
//     }).then((response) => {
//         Swal.fire({
//             'icon': 'success',
//             'title': 'La tarea se eliminó correctamente',
//             'text': response.msj
//         }).then(() => {
//             window.location.href = 'index.html';
//         });
//     }).catch((error) => {
//         Swal.fire({
//             'title': 'Error',
//             'icon': 'error',
//             'text': "Hubo un error en el servidor"
//         })
//     });
// };

// // Fin de funciones de conexión al back end /////////////////////////////////////////////////////////////////////

// // Inicia código del Front End /////////////////////////////////////////////////////////////////////

// const tablaTareasPendientes = document.querySelector('#tbl-tareas tbody');
// const filtroTareasPendientes = document.querySelector('#txt-filtro');
// let listaTareas = [];


// const LLENARtablaTareasPendientes = async() => {
//     console.log("Se va a solicitar la informacion de proveedores pendientes")
//     listaTareas = await listarTareasPendientes();
//     console.log(listaTareas);
//     mostrartablaTareasPendientes();
// };

// //Función que agrega las celdas a la tabla
// const mostrartablaTareasPendientes = async => {
//     let filtro = filtroTareasPendientes.value.toLowerCase();
//     tablaTareasPendientes.innerHTML = '';
//     console.log(listaTareas);
//     listaTareas.forEach(tarea => {
//         if (tarea.encargado.toLowerCase().includes(filtro)) {

//             let fila = tablaTareasPendientes.insertRow();
            
//             let nacimiento = tarea.fecha;
//             let nacimientoSplit = nacimiento.split("T")
//             nacimiento = nacimientoSplit[0];
            
//             function cambiarFecha (input) {
//             var datePart = input.match(/\d+/g),
//             anno = datePart[0].substring(0), // get only two digits
//             mes = datePart[1], day = datePart[2];
//             // return day+'/'+mes+'/'+anno;
//             return day+'-'+mes+'-'+anno;
//             }
    
//             nacimiento = cambiarFecha (nacimiento);



//             fila.insertCell().innerHTML = nacimiento;
//             fila.insertCell().innerHTML = tarea.nombre;
            
//             let celdaPrioridad = fila.insertCell();
//             celdaPrioridad.innerHTML = tarea.prioridad;
//             celdaPrioridad.value = tarea.prioridad;
            
//             switch (celdaPrioridad.innerHTML) {
//                 case 'Alta':
//                     celdaPrioridad.classList.add('alta');
//                     break;
//                 case 'Media':
//                     celdaPrioridad.classList.add('media');
//                     break;
//                 case 'Baja':
//                     celdaPrioridad.classList.add('baja');
//                     break;
//                 }

//             // fila.insertCell().innerHTML = tarea.prioridad;

//             fila.insertCell().innerHTML = tarea.encargado;
//             fila.insertCell().innerHTML = tarea.descripcion;
            


//             let celdaAcciones = fila.insertCell();

//             let btnModificar = document.createElement('button');
//             btnModificar.classList.add('btn2');
//             btnModificar.innerText = 'Modificar';

//             btnModificar.addEventListener('click', () => {
//                 localStorage.setItem('tareaModificar', JSON.stringify(tarea));
//                 window.location.href = 'modificar-tareas.html';
//             });
            

//             let botonEliminar = document.createElement('button');
//             botonEliminar.classList.add('btn2');
//             botonEliminar.innerText = "Eliminar";

//             botonEliminar.addEventListener('click', () => {
//                 Swal.fire({
//                     'icon': 'warning',
//                     'text': '¿Está seguro que desea eliminar la tarea , esta acción es irreversible?',
//                     'showCancelButton': true,
//                     'confirmButtonText': 'Sí estoy seguro',
//                     'cancelButtonColor': '#d33',
//                     'cancelButtonText': 'Cancelar',
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         eliminar(tarea._id);
//                     }
//                 })
//             });
            
//             celdaAcciones.appendChild(btnModificar);
//             celdaAcciones.appendChild(botonEliminar);
//         }
//     });
// };

// LLENARtablaTareasPendientes();
// filtroTareasPendientes.addEventListener('keyup', mostrartablaTareasPendientes)

// const btnAgregar = document.querySelector('#btn-agregar');
// btnAgregar.addEventListener('click', () => {
//     window.location.href = 'agregar-tareas.html';
// })