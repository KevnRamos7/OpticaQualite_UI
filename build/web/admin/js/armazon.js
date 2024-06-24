let armazones = [];
let inputFileArmazon = null;
let objetoInputFile = null;
let fotoB64;

/**
 * Esta funcion llena una tabla HTML
 * a partir del arreglo de accesorios.
 */

function refrescarTabla() {
    let url="../api/armazon/getAll";
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
    armazones = data;
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
        document.getElementById("tbodyAccesorio").innerHTML = contenido;
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
                    '<a href="#" onclick="cm.mostrarDetalleArmazon(' + i + ');"><i class="fas fa-address-card text-info"></i>' +
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
        document.getElementById("tbodyAccesorio").innerHTML = contenido;
    }
    
}

export function save() {
    let datos = null;
    let params = null;
    
    let armazon= new Object(); //Creamos una variable llamada empleado de tipo objeto
    armazon.producto = new Object(); // le damos las propiedades de producto
    
    if(document.getElementById("txtIdArmazon").value.trim().length < 1){
        armazon.idArmazon = 0; //idSolucion se llama asi para que concuerde con el modelo y el servicio
        armazon.producto.idProducto = 0;
        armazon.producto.codigoBarras = '';
    } else {
        armazon.idArmazon = parseInt(document.getElementById("txtIdArmazon").value);
        armazon.producto.idProducto = parseInt(document.getElementById("txtIdProducto").value);
    }
    
    armazon.modelo = document.getElementById("txtModelo").value;
    armazon.color = document.getElementById("txtColor").value;
    armazon.descripcion = document.getElementById("txtDesc").value;
    armazon.dimensiones = document.getElementById("txtDimensiones").value;
    armazon.producto.codigoBarras = document.getElementById("txtCodeBarras").value;
    armazon.producto.nombre = document.getElementById("txtNombre").value;
    armazon.producto.marca = document.getElementById("txtMarca").value;
    armazon.producto.precioCompra = document.getElementById("txtPrecioC").value;
    armazon.producto.precioVenta = document.getElementById("txtPrecioV").value;
    armazon.producto.existencias = document.getElementById("txtExistencias").value;
    armazon.fotografia = fotoB64;
    
    datos = {
        datosArmazon: JSON.stringify(armazon)
    };

    params = new URLSearchParams(datos);
    
    fetch("../api/armazon/save",
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
                
                
                Swal.fire('', 'Datos de armazon actualizados correctamente', 'success');
                limpiarFormularioDetalle();
                refrescarTabla();
                setDetalleVisible(false);
    })
}


export function remove(pos){
    let armazon = armazones[pos];
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
                    datosArmazon: JSON.stringify(armazon)
                };

                params = new URLSearchParams(datos);
                fetch("../api/armazon/delete",
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

                            Swal.fire('', 'Datos de armazon actualizados correctamente', 'success');
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
    inputFileArmazon = document.getElementById("inputFileImagenArmazon");
    inputFileArmazon.onchange = function (evt){cargarFotografia(inputFileArmazon);};
    
    setDetalleVisible(false);
    //Refrescamos la tabla del catalogo:
    refrescarTabla();
    
    configureTableFilter(document.getElementById('barra_busqueda'),
            document.getElementById('tblAccesorios'));
}

export function limpiarFormularioDetalle() {
    document.getElementById("txtIdArmazon").value = "";
    document.getElementById("txtIdProducto").value = "";
    document.getElementById("txtCodeBarras").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtMarca").value = "";
    document.getElementById("txtModelo").value = "";
    document.getElementById("txtColor").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtDimensiones").value= "";
    document.getElementById("txtPrecioC").value = "";
    document.getElementById("txtPrecioV").value = "";
    document.getElementById("txtExistencias").value = "";
    
}

export function mostrarDetalleArmazon(posicion) {
    
    let a = armazones[posicion];
    //Buscamos la posicion de accesorio
    //Revisamos que sea válida
    if (posicion >= 0) {
        
        //limpiamos el formulario
        limpiarFormularioDetalle();
        //Llenamos el formulario con los datos del accesorio
        document.getElementById("txtIdArmazon").value = a.idArmazon;
        document.getElementById("txtIdProducto").value = a.producto.idProducto;
        document.getElementById("txtCodeBarras").value = a.producto.codigoBarras;
        document.getElementById("txtNombre").value = a.producto.nombre;
        document.getElementById("txtMarca").value = a.producto.marca;
        document.getElementById("txtModelo").value = a.modelo;
        document.getElementById("txtColor").value = a.color;
        document.getElementById("txtDesc").value = a.descripcion;
        document.getElementById("txtDimensiones").value= a.dimensiones;
        document.getElementById("txtPrecioC").value = a.producto.precioCompra;
        document.getElementById("txtPrecioV").value = a.producto.precioVenta;
        document.getElementById("txtExistencias").value = a.producto.existencias;
        
        console.log(a);
        document.getElementById("imgFoto").src = "data: image/png;base64," + a.fotografia ;
        
        

        //Mostramos el formulario con loos detalles del accesorio
        setDetalleVisible(true);
    } else //Esto no deberia suceder
        alertarNoEncontrado();
}

//Buscamos la posicion del Accesorio por su id
function buscarPosicionArmazonPorId(id) {
    for (let i = 0;
    i < armazones.length; i++) {
        //Comparamos el id que se busca con el id del accesorio en la posicion actual
        if (armazones[i].idArmazon === id)
            return i; //Devolvemos la posicion del id buscados
    }
    //Si llegamos hasta este punto significa que no encontramos un accesorio con ese id y devolvemos -1.
    return -1;
}

function cargarFotografia(objetoInputFile)
{
    if(objetoInputFile.files && objetoInputFile.files[0])
    {
        let reader = new FileReader();
        //agregamos un oyente al lector del carvido para que en cuanto el usuario cargue una imagen, esta se lea y se convierta de forma automatica en una cadena de base64
        reader.onload = function(e)
        {
            fotoB64 = e.target.result;
            document.getElementById("imgFoto").src = fotoB64;
            fotoB64 = fotoB64.substring(fotoB64.indexOf(",") + 1, fotoB64.length);
            
        };
        //leemos el archivo que selecciono el usuario y lo convertimos en una cadena con la base64
        reader.readAsDataURL(objetoInputFile.files[0]);
    }
}
