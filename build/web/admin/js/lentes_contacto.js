let lentes = [];
let inputFileArmazon = null;
let objetoInputFile = null;
let fotoB64;

function refrescarTabla() {
    let url = "../api/lentesContacto/getAll";
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
    lentes = data;

    let check = document.getElementById("switchActivos");
    if (check.checked === true) {
        //Recorremos el arreglo:
        for (let i = 0; i < data.length; i++) {
            //Generamos el contenido de forma dinamica:
            contenido = contenido + '<tr class="contenido_tabla">' +
                    '<td>' + data[i].producto.nombre + '</td>' +
                    '<td>' + data[i].producto.marca + '</td>' +
                    '<td>' + data[i].keratometria + '</td>' +
                    '<td>' + data[i].producto.precioCompra + '</td>' +
                    '<td>' + data[i].producto.precioVenta + '</td>' +
                    '<td>' + data[i].producto.existencias + '</td>' +
                    '<td>' + data[i].producto.estatus + '</td>' +
                    '<td class="text-info">' +
                    '<a href="#" onclick="cm.mostrarDetalleLenteContacto(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
                    '</a>' +
                    '</td>' +
                    '<td class="text-info">' +
                    '<a href="#" onclick="cm.remove(' + i + ');"><i class="fas fa-trash text-info"></i>' +
                    '</a>' +
                    '</td>';
            '</tr>';
        }
        document.getElementById("tbodyLentesC").innerHTML = contenido;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].producto.estatus === 1) {
                contenido = contenido + '<tr class="contenido_tabla">' +
                        '<td>' + data[i].producto.nombre + '</td>' +
                        '<td>' + data[i].producto.marca + '</td>' +
                        '<td>' + data[i].keratometria + '</td>' +
                        '<td>' + data[i].producto.precioCompra + '</td>' +
                        '<td>' + data[i].producto.precioVenta + '</td>' +
                        '<td>' + data[i].producto.existencias + '</td>' +
                        '<td>' + data[i].producto.estatus + '</td>' +
                        '<td class="text-info">' +
                        '<a href="#" onclick="cm.mostrarDetalleLenteContacto(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
                        '</a>' +
                        '</td>' +
                        '<td class="text-info">' +
                        '<a href="#" onclick="cm.remove(' + i + ');"><i class="fas fa-trash text-info"></i>' +
                        '</a>' +
                        '</td>';
                '</tr>';
            }
            document.getElementById("tbodyLentesC").innerHTML = contenido;
        }
    }
}




export function save() {
    let datos = null;
    let params = null;

    let lentes_Contacto = new Object();
    lentes_Contacto.producto = new Object();

    if (document.getElementById("txtCodigoLenteC").value.trim().length < 1) {
        lentes_Contacto.idLenteContacto = 0;
        lentes_Contacto.producto.codigoBarras = '';
        lentes_Contacto.producto.idProducto = 0;
    } else {
        lentes_Contacto.idLenteContacto = parseInt(document.getElementById("txtCodigoLenteC").value);
        lentes_Contacto.producto.idProducto = parseInt(document.getElementById("txtCodigoProducto").value);
        lentes_Contacto.producto.codigoBarras = document.getElementById("txtCodigoBarras").value;
    }

    //Datos Producto
    lentes_Contacto.producto.nombre = document.getElementById("txtNombre").value;
    lentes_Contacto.producto.marca = document.getElementById("txtMarca").value;
    lentes_Contacto.producto.precioCompra = document.getElementById("txtPrecioC").value;
    lentes_Contacto.producto.precioVenta = document.getElementById("txtPrecioV").value;
    lentes_Contacto.producto.existencias = document.getElementById("txtExistencias").value;
    

    //Datos Lente Contacto
    lentes_Contacto.keratometria = document.getElementById("txtQueratometria").value;
    lentes_Contacto.fotografia = fotoB64;

    datos = {
        datosLentesC: JSON.stringify(lentes_Contacto)
    };

    params = new URLSearchParams(datos);
    fetch("../api/lentesContacto/save",
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

                //Swal.fire('', 'Datos del empleado actualizados correctamente', 'sucess');
                limpiarFormularioDetalle();
                setDetalleVisible(false);
                refrescarTabla();
            })
}

export function remove(pos) {
    let lente_contacto = lentes[pos];
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
                    datosLentesC: JSON.stringify(lente_contacto)
                };

                params = new URLSearchParams(datos);
                fetch("../api/lentesContacto/delete",
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
                                console.log(data.exception);
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

                            Swal.fire('', 'Datos de lentes de contacto actualizados correctamente', 'success');
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


export function setDetalleVisible(valor) {
    if (valor === true)
    {
        document.getElementById("divDetalle").style.display = "";
        document.getElementById("divCatalogo").style.display = "none";
    } else {
        document.getElementById("divDetalle").style.display = "none";
        document.getElementById("divCatalogo").style.display = "";
        limpiarFormularioDetalle();
    }
}

//Funcion para inicializar el modulo.
export function inicializar()
{
    
    inputFileArmazon = document.getElementById("inputFileImagenArmazon");
    inputFileArmazon.onchange = function (evt){cargarFotografia(inputFileArmazon);};
    setDetalleVisible(false);
    //Refrescamos la tabla del catalogo:
    refrescarTabla();
    
    configureTableFilter(document.getElementById('barra_busqueda'),
            document.getElementById('tblLentesC'));
}

export function limpiarFormularioDetalle() {
    document.getElementById("txtCodigoLenteC").value = "";
    document.getElementById("txtCodigoProducto").value = "";
    document.getElementById("txtCodigoBarras").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtQueratometria").value = "";
    document.getElementById("txtExistencias").value = "";
}

export function mostrarDetalleLenteContacto(pos) {
    let lc = lentes[pos];

    if (pos >= 0) {

        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtCodigoLenteC").value = lentes[pos].idLenteContacto;
        document.getElementById("txtCodigoProducto").value = lentes[pos].producto.idProducto;
        document.getElementById("txtCodigoBarras").value = lentes[pos].producto.codigoBarras;
        document.getElementById("txtNombre").value = lentes[pos].producto.nombre;
        document.getElementById("txtMarca").value = lentes[pos].producto.marca;
        document.getElementById("txtPrecioC").value = lentes[pos].producto.precioCompra;
        document.getElementById("txtPrecioV").value = lentes[pos].producto.precioVenta;
        document.getElementById("txtQueratometria").value = lentes[pos].keratometria;
        document.getElementById("txtExistencias").value = lentes[pos].producto.existencias;
        
         document.getElementById("imgFoto").src = "data: image/png;base64," + lc.fotografia ;

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarError();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionLenteDeContactoPorId(id) {
    for (let i = 0;
    i < lentes.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (lentes[i].idLenteDeContacto === id)
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
            document.getElementById("imgFoto").src = fotoB64;
            
            
        };
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}

