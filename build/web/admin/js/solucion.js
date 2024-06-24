let soluciones = [];

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function refrescarTabla() {
    let url="../api/solucion/getAll";
    fetch(url)
            .then(response => {return response.json();})
            .then(function (data) {
                if(data.exception != null){
                    Swal.fire('', 'Error interno del servidor. Intente nuevamente más tarde', 'error');
                    return;
                }
                if(data.error !=null){
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if(data.errorsec != null){
                    Swal.fire('', data.errorsec, 'error');
                    window.location.replace('../index.html');
                    return;
                }
                fillTable(data);
            });
}

function fillTable(data) {
    let contenido = '';
    soluciones = data;
    let check = document.getElementById("switchActivos");
    if(check.checked === true) {
        //Recorremos el arreglo:
        for (let i = 0; i < data.length; i++) {
            //Generamos el contenido de forma dinamica:
            contenido = contenido + '<tr class="contenido_tabla">' +
                    '<td>' + data[i].producto.nombre + '</td>' +
                    '<td>' + data[i].producto.marca + '</td>' +
                    '<td>' + data[i].producto.precioCompra + '</td>' +
                    '<td>' + data[i].producto.precioVenta + '</td>' +
                    '<td>' + data[i].producto.existencias + '</td>' +
                    '<td>' + data[i].producto.estatus + '</td>' +
                    '<td class="text-info">' +
                    '<a href="#" onclick="cm.mostrarDetalleSolucion(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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
    } else {
        for (let i = 0; i < data.length; i++) {
            //Evaluamos si el estatus es 1
            if(data[i].producto.estatus === 1){
                //Generamos el contenido de forma dinamica:
            contenido = contenido + '<tr class="contenido_tabla">' +
                    '<td>' + data[i].producto.nombre + '</td>' +
                    '<td>' + data[i].producto.marca + '</td>' +
                    '<td>' + data[i].producto.precioCompra + '</td>' +
                    '<td>' + data[i].producto.precioVenta + '</td>' +
                    '<td>' + data[i].producto.existencias + '</td>' +
                    '<td>' + data[i].producto.estatus + '</td>' +
                    '<td class="text-info">' +
                    '<a href="#" onclick="cm.mostrarDetalleSolucion(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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
        }
        document.getElementById("tbodyClientes").innerHTML = contenido;
    }
    
}

export function save() {
    let datos = null;
    let params = null;
    
    let solucion= new Object(); //Creamos una variable llamada empleado de tipo objeto
    solucion.producto = new Object(); // le damos las propiedades de producto
    
    if(document.getElementById("txtIdSolucion").value.trim().length < 1){
        solucion.idSolucion = 0; //idSolucion se llama asi para que concuerde con el modelo y el servicio
        solucion.producto.idProducto = 0;
        solucion.producto.codigoBarras = '';
    } else {
        solucion.idSolucion = parseInt(document.getElementById("txtIdSolucion").value);
        solucion.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }
    
    
    solucion.producto.codigoBarras = document.getElementById("txtNumeroUnico").value;
    solucion.producto.nombre = document.getElementById("txtNombre").value;
    solucion.producto.marca = document.getElementById("txtMarca").value;
    solucion.producto.precioCompra = document.getElementById("txtPrecioC").value;
    solucion.producto.precioVenta = document.getElementById("txtPrecioV").value;
    solucion.producto.existencias = document.getElementById("txtExistencias").value;
    
    
    datos = {
        datosSolucion: JSON.stringify(solucion)
    };
    
    params = new URLSearchParams(datos);
    
    fetch("../api/solucion/save",
    {
        method:"POST",
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body:params
    })
            .then(response => {return response.json();})
            .then(function (data){
                if (data.exception != null){
                    Swal.fire('', 'Error interno del servidor. Intente mas tarde', 'error');
                    //console.log(data.exception);
                    return;
                }
                if(data.error != null){
                    Swal.fire('', data.error, 'warning');
                    return;
                }
                if(data.errorperm != null){
                    Swal.fire('', 'No tiene permiso para realizar esta operación', 'warning');
                    return;
                }
                
                limpiarFormularioDetalle();
                setDetalleVisible(false);
                refrescarTabla();
    })
}


export function remove(pos){
    let solucion = soluciones[pos];
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
                    datosSolucion: JSON.stringify(solucion)
                };

                params = new URLSearchParams(datos);
                fetch("../api/solucion/delete",
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

                            Swal.fire('', 'Datos de la solución actualizados correctamente', 'success');
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
    document.getElementById("txtIdSolucion").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtNumeroUnico").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleSolucion(posicion) {
    
    let s = soluciones[posicion];
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (posicion >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtIdSolucion").value = s.idSolucion;
        document.getElementById("txtIdProducto").value = s.producto.idProducto;
        document.getElementById("txtNumeroUnico").value = s.producto.codigoBarras;
        document.getElementById("txtNombre").value = s.producto.nombre;
        document.getElementById("txtMarca").value = s.producto.marca;
        document.getElementById("txtPrecioC").value = s.producto.precioCompra;
        document.getElementById("txtPrecioV").value = s.producto.precioVenta;
        document.getElementById("txtExistencias").value = s.producto.existencias;

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionSolucionPorId(id) {
    for (let i = 0;
    i < soluciones.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (soluciones[i].idSolucion === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}


