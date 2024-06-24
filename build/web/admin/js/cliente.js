let clientes = [];

function refrescarTabla() {
    let url = "../api/cliente/getAll";
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
    clientes = data;
    //Recorremos el arreglo:
    for (let i = 0; i < data.length; i++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr class="contenido_tabla">' +
                '<td>' + data[i].persona.nombre + '</td>' +
                '<td>' + data[i].persona.apellidoPaterno + '</td>' +
                '<td>' + data[i].persona.apellidoMaterno + '</td>' +
                '<td>' + data[i].persona.genero + '</td>' +
                '<td>' + data[i].persona.telCasa + '</td>' +
                '<td>' + data[i].persona.telMovil + '</td>' +
                '<td>' + data[i].persona.email + '</td>' +
                '<td>' + data[i].estatus + '</td>' +
                '<td class="text-info">' +
                    '<a href="#" onclick="cm.mostrarDetalleCliente(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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
    let cliente = new Object(); //Creamos una variable llamada empleado de tipo objeto
    cliente.persona = new Object();

    if (document.getElementById("txtCodigoCliente").value.trim().length < 1) {
        cliente.idCliente = 0; //idEmpleado se llama asi para que concuerde con el modelo y el servicio
        cliente.persona.idPersona = 0;
        cliente.numeroUnico =0;
    } else {
        cliente.idCliente = parseInt(document.getElementById("txtCodigoCliente").value);
        cliente.persona.idPersona = parseInt(document.getElementById("txtCodigoPersona").value);
        cliente.numeroUnico = document.getElementById("txtNumeroUnico").value;
    }

//Datos persona
    cliente.persona.nombre = document.getElementById("txtNombre").value;
    cliente.persona.apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    cliente.persona.apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    cliente.persona.genero = document.getElementById("cmbGenero").value;
    cliente.persona.fechaNacimiento = document.getElementById("dpFechaNacimiento").value;
    cliente.persona.calle = document.getElementById("txtCalle").value;
    cliente.persona.numero = document.getElementById("txtNumero").value;
    cliente.persona.colonia = document.getElementById("txtColonia").value;
    cliente.persona.cp = document.getElementById("txtCp").value;
    cliente.persona.ciudad = document.getElementById("txtCiudad").value;
    cliente.persona.estado = document.getElementById("txtEstado").value;
    cliente.persona.telCasa = document.getElementById("txtTelCasa").value;
    cliente.persona.telMovil = document.getElementById("txtTelMovil").value;
    cliente.persona.email = document.getElementById("txtEmail").value;
    
    datos = {
        datosCliente: JSON.stringify(cliente)
    };
    params = new URLSearchParams(datos);
    fetch("../api/cliente/save",
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
            });
}

export function remove(pos){
    let cliente = clientes[pos];
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
                    datosCliente: JSON.stringify(cliente)
                };

                params = new URLSearchParams(datos);
                fetch("../api/cliente/delete",
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

                            Swal.fire('', 'Datos del cliente actualizados correctamente', 'success');
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
    setDetalleVisible(false);
    //Refrescamos la tabla del catalogo:
    refrescarTabla();
    configureTableFilter(document.getElementById('barra_busqueda'),
            document.getElementById('tblAccesorios'));
}

export function limpiarFormularioDetalle() {
document.getElementById("txtCodigoCliente").value = "";
    document.getElementById("txtCodigoPersona").value = "";
    document.getElementById("txtNumeroUnico").value = "";
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
}

export function mostrarDetalleCliente(pos) {
    let c = clientes[pos];
    //let pos = buscarPosicionClientePorId(idPersona);
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (pos >= 0) {
    limpiarFormularioDetalle();
        document.getElementById("txtCodigoCliente").value = c.idCliente;
        document.getElementById("txtCodigoPersona").value = c.persona.idPersona;
        document.getElementById("txtNumeroUnico").value = c.numeroUnico;
        document.getElementById("txtNombre").value = c.persona.nombre;
        document.getElementById("txtApellidoPaterno").value = c.persona.apellidoPaterno;
        document.getElementById("txtApellidoMaterno").value = c.persona.apellidoMaterno;
        document.getElementById("cmbGenero").value = c.persona.genero;
        document.getElementById("dpFechaNacimiento").value = c.persona.fechaNacimiento;
        document.getElementById("txtCalle").value = c.persona.calle;
        document.getElementById("txtNumero").value = c.persona.numero;
        document.getElementById("txtColonia").value = c.persona.colonia;
        document.getElementById("txtCp").value = c.persona.cp;
        document.getElementById("txtCiudad").value = c.persona.ciudad;
        document.getElementById("txtEstado").value = c.persona.estado;
        document.getElementById("txtTelCasa").value = c.persona.telCasa;
        document.getElementById("txtTelMovil").value = c.persona.telMovil;
        document.getElementById("txtEmail").value = c.persona.email;
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarError();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionClientePorIdPorId(id) {
      
    for (let i = 0; i < clientes.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (clientes[i].idEmpleado === id)
            return i; //Devolvemos la posicion del id buscados
            
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
    }