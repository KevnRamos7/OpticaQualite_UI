let accesorios = [];
let dat = localStorage.getItem("empleadouno");

// Convertir la cadena en un objeto JSON
let json = JSON.parse(dat);

// Acceder al lastToken
let token = json.usuario.lastToken;



/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function refrescarTabla() {
    let datos = null;
    let params = null;

    let dat = localStorage.getItem("empleadouno");

// Convertir la cadena en un objeto JSON
    let json = JSON.parse(dat);

// Acceder al lastToken
    let token = json.usuario.lastToken;

    datos = {
        lastToken: token
    };

    params = new URLSearchParams(datos);

    let url = "../api/accesorio/getAll";
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
    accesorios = data;
    let check = document.getElementById("switchActivos");
    if (check.checked === true) {
        //Recorremos el arreglo:
        for (let i = 0; i < data.length; i++) {
            //Generamos el contenido de forma dinamica:
            contenido = contenido + '<tr class="contenido_tabla">' +
                    '<td>' + data[i].producto.nombre + '</td>' +
                    '<td>' + data[i].producto.marca + '</td>' +
                    '<td class="ocultarColumna">' + data[i].producto.precioCompra + '</td>' +
                    '<td class="ocultarColumna">' + data[i].producto.precioVenta + '</td>' +
                    '<td>' + data[i].producto.existencias + '</td>' +
                    '<td class="ocultarColumna">' + data[i].producto.estatus + '</td>' +
                    '<td class="text-info">' +
                    '<a href="#" onclick="cm.mostrarDetalleAccesorio(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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
            if (data[i].producto.estatus === 1) {
                //Generamos el contenido de forma dinamica:
                contenido = contenido + '<tr class="contenido_tabla">' +
                        '<td>' + data[i].producto.nombre + '</td>' +
                        '<td>' + data[i].producto.marca + '</td>' +
                        '<td class="ocultarColumna">' + data[i].producto.precioCompra + '</td>' +
                        '<td class="ocultarColumna">' + data[i].producto.precioVenta + '</td>' +
                        '<td>' + data[i].producto.existencias + '</td>' +
                        '<td class="ocultarColumna">' + data[i].producto.estatus + '</td>' +
                        '<td class="text-info">' +
                        '<a href="#" onclick="cm.mostrarDetalleAccesorio(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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


    let dat = localStorage.getItem("empleadouno");

// Convertir la cadena en un objeto JSON
    let json = JSON.parse(dat);

// Acceder al lastToken
    let token = json.usuario.lastToken;


    var nombre = document.getElementById("txtNombre").value;
    var marca = document.getElementById("txtMarca").value;
    var precioC = document.getElementById("txtPrecioC").value;
    var PrecioV = document.getElementById("txtPrecioV").value;
    var Existencias = document.getElementById("txtExistencias").value;
    
    let datos = null;
    let params = null;

    let accesorio = new Object(); //Creamos una variable llamada empleado de tipo objeto

    accesorio.producto = new Object(); //Le damos las propiedades de persona

    if (document.getElementById("txtIdAccesorio").value.trim().length < 1) {
        accesorio.idAccesorio = 0; //idEmpleado se llama asi para que concuerde con el modelo y el servicio
        accesorio.producto.idProducto = 0;
        accesorio.producto.codigoBarras = "";

    } else {
        accesorio.idAccesorio = parseInt(document.getElementById("txtIdAccesorio").value);
        accesorio.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);

    }

    //Datos persona
    accesorio.producto.codigoBarras = document.getElementById("txtCodigoBarras").value;
    accesorio.producto.nombre = sanitizar_a(nombre);
    accesorio.producto.marca = sanitizar_b(marca);
    accesorio.producto.precioCompra = sanitizar_c(precioC);
    accesorio.producto.precioVenta = sanitizar_d(PrecioV);
    accesorio.producto.existencias = sanitizar_e(Existencias);


    datos = {
        datosAccesorio: JSON.stringify(accesorio), lastToken:
                token
    };

    params = new URLSearchParams(datos);

    fetch("../api/accesorio/save",
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

    let dat = localStorage.getItem("empleadouno");

// Convertir la cadena en un objeto JSON
    let json = JSON.parse(dat);

// Acceder al lastToken
    let token = json.usuario.lastToken;


    let accesorio = accesorios[pos];
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
                    datosAccesorio: JSON.stringify(accesorio), lastToken: token
                };

                params = new URLSearchParams(datos);
                fetch("../api/accesorio/delete",
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

                            Swal.fire('', 'Datos del accesorio actualizados correctamente', 'success');
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
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtIdAccesorio").value = "";
    document.getElementById("txtCodigoBarras").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";

}

export function mostrarDetalleAccesorio(posicion) {
    let a = accesorios[posicion];
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (posicion >= 0) {

        limpiarFormularioDetalle();


        document.getElementById("txtIdAccesorio").value = a.idAccesorio;

        document.getElementById("txtCodigoBarras").value = a.producto.codigoBarras;

        document.getElementById("txtIdProducto").value = a.producto.idProducto;



        document.getElementById("txtNombre").value = a.producto.nombre;
        document.getElementById("txtMarca").value = a.producto.marca;
        document.getElementById("txtPrecioC").value = a.producto.precioCompra;
        document.getElementById("txtPrecioV").value = a.producto.precioVenta;
        document.getElementById("txtExistencias").value = a.producto.existencias;





        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarError();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionAccesorioPorId(id) {
    for (let i = 0;
    i < accesorios.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (accesorios[i].idAccesorio === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}

function sanitizar_a(nombre){
    for (var i = 0; i <nombre.length; i++){
        nombre = nombre.replace("(", "");
        nombre = nombre.replace(")", "");
        nombre = nombre.replace(".", "");
        nombre = nombre.replace("", "");
        nombre = nombre.replace("\"", "");
        nombre = nombre.replace("-", "");
        nombre = nombre.replace("*", "");
        nombre = nombre.replace("%", "");
        nombre = nombre.replace("<<", "");
        nombre = nombre.replace(">>", "");
        nombre = nombre.replace("´´", "");
        nombre = nombre.replace("+", "");
    }
    return nombre;
}

function sanitizar_b(marca){
    for (var i = 0; i <marca.length; i++){
        marca = marca.replace("(", "");
        marca = marca.replace(")", "");
        marca = marca.replace(".", "");
        marca = marca.replace("", "");
        marca = marca.replace("\"", "");
        marca = marca.replace("-", "");
        marca = marca.replace("*", "");
        marca = marca.replace("%", "");
        marca = marca.replace("<<", "");
        marca = marca.replace(">>", "");
        marca = marca.replace("´´", "");
        marca = marca.replace("+", "");
    }
    return marca;
}

function sanitizar_c(precioCompra){
    for (var i = 0; i <precioCompra.length; i++){
        precioCompra = precioCompra.replace("(", "");
        precioCompra = precioCompra.replace(")", "");
        precioCompra = precioCompra.replace(".", "");
        precioCompra = precioCompra.replace("", "");
        precioCompra = precioCompra.replace("\"", "");
        precioCompra = precioCompra.replace("-", "");
        precioCompra = precioCompra.replace("*", "");
        precioCompra = precioCompra.replace("%", "");
        precioCompra = precioCompra.replace("<<", "");
        precioCompra = precioCompra.replace(">>", "");
        precioCompra = precioCompra.replace("´´", "");
        precioCompra = precioCompra.replace("+", "");
    }
    return precioCompra;
}

function sanitizar_d(precioVenta){
    for (var i = 0; i <precioVenta.length; i++){
        precioVenta = precioVenta.replace("(", "");
        precioVenta = precioVenta.replace(")", "");
        precioVenta = precioVenta.replace(".", "");
        precioVenta = precioVenta.replace("", "");
        precioVenta = precioVenta.replace("\"", "");
        precioVenta = precioVenta.replace("-", "");
        precioVenta = precioVenta.replace("*", "");
        precioVenta = precioVenta.replace("%", "");
        precioVenta = precioVenta.replace("<<", "");
        precioVenta = precioVenta.replace(">>", "");
        precioVenta = precioVenta.replace("´´", "");
        precioVenta = precioVenta.replace("+", "");
    }
    return precioVenta;
}

function sanitizar_e(existencias){
    for (var i = 0; i <existencias.length; i++){
        existencias = existencias.replace("(", "");
        existencias = existencias.replace(")", "");
        existencias = existencias.replace(".", "");
        existencias = existencias.replace("", "");
        existencias = existencias.replace("\"", "");
        existencias = existencias.replace("-", "");
        existencias = existencias.replace("*", "");
        existencias = existencias.replace("%", "");
        existencias = existencias.replace("<<", "");
        existencias = existencias.replace(">>", "");
        existencias = existencias.replace("´´", "");
        existencias = existencias.replace("+", "");
    }
    return existencias;
}
