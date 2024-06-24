let empleados = [];
let inputFileFotoPerfil = null;
let objetoInputFile = null;
let fotoB64;

function refrescarTabla() {
    let url = "../api/empleado/getAll";
    fetch(url)
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde', 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorsec != null) {
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('../index.html');
                    return;
                }
                fillTable(data);
            });
}

function fillTable(data) {
    let contenido = '';
    empleados = data;
    //Recorremos el arreglo:
    for (let i = 0; i < data.length; i++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr class="contenido_tabla">' +
                '<td>' + data[i].persona.nombre + '</td>' +
                '<td>' + data[i].persona.apellidoPaterno + '</td>' +
                '<td class="ocultarColumna">' + data[i].persona.apellidoMaterno + '</td>' +
                '<td class="ocultarColumna">' + data[i].persona.genero + '</td>' +
                '<td class="ocultarColumna">' + data[i].persona.telCasa + '</td>' +
                '<td class="ocultarColumna">' + data[i].persona.telMovil + '</td>' +
                '<td class="ocultarColumna">' + data[i].persona.email + '</td>' +
                '<td>' + data[i].estatus + '</td>' +
                '<td class="text-info">' +
                '<a href="#" onclick="cm.mostrarDetalleEmpleado(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
                '</a>' +
                '</td>' +
                '<td class="text-info">' +
                '<a href="#" onclick="cm.remove(' + i + ');"><i class="fas fa-trash text-info"></i>' +
                '</a>' +
                '</td>';
        '</tr>';
        //<img src="../media/editar.png" width="30px" height="30px" alt="alt"/></a></td>' +
        //<img src="../media/eliminar_icon.png" width="30px" height="30px" alt="alt"/></a></td>' + '</tr>';
    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
}

export function save() {

    let datos = null;
    let params = null;

    let empleado = new Object(); //Creamos una variable llamada empleado de tipo objeto
    empleado.usuario = new Object(); // le damos las propiedades de usuario
    empleado.persona = new Object(); //Le damos las propiedades de persona

    if (document.getElementById("txtCodigoEmpleado").value.trim().length < 1) {
        empleado.idEmpleado = 0; //idEmpleado se llama asi para que concuerde con el modelo y el servicio
        empleado.persona.idPersona = 0;
        empleado.usuario.idUsuario = 0;
    } else {
        empleado.idEmpleado = parseInt(document.getElementById("txtCodigoEmpleado").value);
        empleado.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
        empleado.usuario.idUsuario = parseInt(document.getElementById("txtCodigoUsuario").value);
    }

    //Datos persona
    empleado.persona.nombre = document.getElementById("txtNombre").value;
    empleado.persona.apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    empleado.persona.apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    empleado.persona.genero = document.getElementById("cmbGenero").value;
    empleado.persona.fechaNacimiento = document.getElementById("dpFechaNacimiento").value;
    empleado.persona.calle = document.getElementById("txtCalle").value;
    empleado.persona.numero = document.getElementById("txtNumero").value;
    empleado.persona.colonia = document.getElementById("txtColonia").value;
    empleado.persona.cp = document.getElementById("txtCp").value;
    empleado.persona.ciudad = document.getElementById("txtCiudad").value;
    empleado.persona.estado = document.getElementById("txtEstado").value;
    empleado.persona.telCasa = document.getElementById("txtTelCasa").value;
    empleado.persona.telMovil = document.getElementById("txtTelMovil").value;
    empleado.persona.email = document.getElementById("txtEmail").value;

    //Datos usuario
    empleado.usuario.nombre = document.getElementById("txtUser").value;
    empleado.usuario.contrasenia = document.getElementById("txtContrasenia").value;
    empleado.usuario.rol = document.getElementById("txtRol").value;
    empleado.usuario.fotografia = fotoB64;

    datos = {
        datosEmpleado: JSON.stringify(empleado)
    };

    params = new URLSearchParams(datos);

    fetch("../api/empleado/save",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                if (data.exception != null) {
                    Swal.fire('', 'Error interno del servidor. Intente mas tarde', 'error');
                    return;
                }
                if (data.error != null) {
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if (data.errorperm != null) {
                    Swal.fire('', 'No tiene permiso para realizar esta operación', 'warning');
                    return;
                }

                //document.getElementById("txtNumeroUnic").value = empleado.usuario.numeroUnico;
                //Swal.fire('', 'Datos del empleado actualizados correctamente', 'sucess');
                limpiarFormularioDetalle();
                setDetalleVisible(false);
                refrescarTabla();
            })
}

export function remove(pos) {
    let empleado = empleados[pos];
    let datos = null;
    let params = null;
    if (pos >= 0) {
        Swal.fire({
            title: '¿Está seguro de\n\eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#31BFDF',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                datos = {
                    datosEmpleado: JSON.stringify(empleado)
                };

                params = new URLSearchParams(datos);
                fetch("../api/empleado/delete",
                        {
                            method: "POST",
                            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                            body: params
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(function (data) {
                            if (data.exception != null) {
                                Swal.fire('', 'Error interno del servidor. Intente mas tarde', 'error');
                                //console.log(data.exception);
                                return;
                            }
                            if (data.error != null) {
                                Swal.fire('', data.error, 'warning');
                                return;
                            }
                            if (data.errorperm != null) {
                                Swal.fire('', 'No tiene permiso para realizar esta operación', 'warning');
                                return;
                            }

                            Swal.fire('', 'Datos del empleado actualizados correctamente', 'success');
                            refrescarTabla();
                        });
            } else
                Swal.fire({
                    icon: 'error',
                    title: 'ACCIÓN CANCELADA',
                    showConfirmButton: false,
                    timer: 2000
                });
        });
    } else { //Esto no deberia suceder
        alertarError();
    }
}


export function limpiar_mostrarDetalle() {
    limpiarFormularioDetalle();
    setDetalleVisible(true);
}


/**
 * Muestra u oculta el panel de detalles del accesorio.
 */
export function setDetalleVisible(valor)
{
    //Si valor es verdadero, mostramos el panel de
    //detalles y ocultamos el panel del catalogo
    if (valor === true)
    {
        document.getElementById("divDetalle").style.display = "";
        document.getElementById("divCatalogo").style.display = "none";

    } else
    {
        document.getElementById("divDetalle").style.display = "none";
        document.getElementById("divCatalogo").style.display = "";
        limpiarFormularioDetalle();
    }
}

//Funcion para inicializar el modulo.
export function inicializar()
{
    inputFileFotoPerfil = document.getElementById("inputFileFotoPerfil");
    inputFileFotoPerfil.onchange = function (evt){cargarFotografia(inputFileFotoPerfil);};

    setDetalleVisible(false);
    //Refrescamos la tabla del catalogo:
    refrescarTabla();


    configureTableFilter(document.getElementById('barra_busqueda'),
            document.getElementById('tblAccesorios'));

}

export function limpiarFormularioDetalle() {
    document.getElementById("txtCodigoEmpleado").value = "";
    document.getElementById("txtCodigoPersona").value = "";
    document.getElementById("txtCodigoUsuario").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPaterno").value = "";
    document.getElementById("txtApellidoMaterno").value = "";
    document.getElementById("cmbGenero").value = "";
    document.getElementById("dpFechaNacimiento").value = "";
    document.getElementById("txtCalle").value = "";
    document.getElementById("txtNumero").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCp").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtTelCasa").value = "";
    document.getElementById("txtTelMovil").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtUser").value = "";
    document.getElementById("txtContrasenia").value = "";
    document.getElementById("txtRol").value = "";
}

export function mostrarDetalleEmpleado(pos) {
    let e = empleados[pos];
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {

        limpiarFormularioDetalle();

        document.getElementById("txtCodigoEmpleado").value = e.numeroUnico;
        
        document.getElementById("txtCodigoPersona").value = e.persona.idPersona;
        
        document.getElementById("txtCodigoUsuario").value = e.usuario.idUsuario;
        
        document.getElementById("txtNombre").value = e.persona.nombre;
        document.getElementById("txtApellidoPaterno").value = e.persona.apellidoPaterno;
        document.getElementById("txtApellidoMaterno").value = e.persona.apellidoMaterno;
        document.getElementById("cmbGenero").value = e.persona.genero;
        document.getElementById("dpFechaNacimiento").value = e.persona.fechaNacimiento;
        document.getElementById("txtCalle").value = e.persona.calle;
        document.getElementById("txtNumero").value = e.persona.numero;
        document.getElementById("txtColonia").value = e.persona.colonia;
        document.getElementById("txtCp").value = e.persona.cp;
        document.getElementById("txtCiudad").value = e.persona.ciudad;
        document.getElementById("txtEstado").value = e.persona.estado;
        document.getElementById("txtTelCasa").value = e.persona.telCasa;
        document.getElementById("txtTelMovil").value = e.persona.telMovil;
        document.getElementById("txtEmail").value = e.persona.email;
        document.getElementById("txtUser").value = e.usuario.nombre;
        document.getElementById("txtContrasenia").value = e.usuario.contrasenia;
        document.getElementById("txtRol").value = e.usuario.rol;
        document.getElementById("imagen_perfil").src = "data: image/png;base64," + e.usuario.fotografia ;
        


        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarError();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionEmpleadoPorId(id) {

    for (let i = 0;
    i < empleados.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (empleados[i].idEmpleado === id)
            return i; //Devolvemos la posicion del id buscados

    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}

function cargarFotografia(objetoInputFile){
    if(objetoInputFile.files && objetoInputFile.files[0]){
        let reader = new FileReader();
        reader.onload = function (e){
            fotoB64 = e.target.result;
            document.getElementById("imgFotoP").src = fotoB64;
            fotoB64 = fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);
            
        };
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}


