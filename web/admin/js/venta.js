let productos = [];
let idAuto = 0;
let listaVentaProducto = [];
let i;
let j;
let armazones = [];
let tratamientos = [];
let materiales = [];
let clientesp = [];
let examenvista = [];
let lentesContacto = [];
let listaExamenesVista = [];
let listaPresupuestoLentes = [];
let listaVentaPresupuesto = [];
let graduacion = [];
let mica = [];
let precios = [];
let totalVentaPresupuesto = 0;


function refrescarTabla() {
    let url = "../api/venta/getAll";
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
    productos = data;

    //Recorremos el arreglo:
    for (i = 0; i < data.length; i++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr class="contenido_tabla">' +
                '<td>' + data[i].codigoBarras + '</td>' +
                '<td>' + data[i].nombre + '</td>' +
                '<td>' + data[i].marca + '</td>' +
                '<td>' + data[i].precioVenta + '</td>' +
                '<td>' + data[i].existencias + '</td>' +
                '<td class="text-info">' +
                '<button id="cbVenta" class="btn btn-sm btn-outline-success"\n\
                         onclick="cm.agregar(' + i + ');"><i class="fas fa-shopping-cart"></i></button>' +
                '</td>';
        '</tr>';
    }
    document.getElementById("tbodyVenta").innerHTML = contenido;
}

export function inicializar()
{
    setDetalleVisible(0);
    refrescarTabla();
    configureTableFilter(document.getElementById('buscar_venta'),
            document.getElementById('tblVenta'));
    refrescarTablaCliente();
    refrescarListArmazon();
    refrescarListMaterial();
    refrescarListMica();
    refrescarTablaTratamiento();
    refrescarListLentesC();
    configureTableFilter(document.getElementById('buscar_cliente'),
            document.getElementById('tblClientes'));
    configureTableFilter(document.getElementById('buscar_clienteC'),
            document.getElementById('tblClientesC'));

}

export function agregar(i) {

    let renglon = '';


    renglon = renglon +
            '<tr class="contenido_tabla">' +
            '<td>' + productos[i].codigoBarras + '</td>' +
            '<td>' + productos[i].nombre + '</td>' +
            '<td>' + productos[i].marca + '</td>' +
            '<td>' + productos[i].precioVenta + '</td>' +
            '<td> <input id="txtCantidad' + idAuto + '" type="number" value="1" class="inp oculto" onkeypress="cm.pulsar(event)"></td>' +
            '<td> <input id="txtDescuento' + idAuto + '"type="number" value="0" class="inp oculto" onkeypress="cm.pulsar(event)"></td>' +
            '</tr>';

    document.getElementById("tbodyCarrito").insertAdjacentHTML('beforeend', renglon);
    let ventaProducto = {
        cantidad: 1,
        precioUnitario: productos[i].precioVenta,
        descuento: 0,
        producto: productos[i],
        existencias: productos[i].existencias
    };

    listaVentaProducto[idAuto] = ventaProducto;
    idAuto++;


    //Agregar el renglon  a la tabla

}



export function enviarCarrito(i) {
    let params = null;
    let datos = null;
    let fechaActual = new Date().getTime();
    let numeroAleatorio = Math.floor(Math.random() * 100000);
    let claveUnica = fechaActual.toString() + numeroAleatorio.toString();
    for (i = 0;
            i < listaVentaProducto.length; i++) {
        listaVentaProducto[i].cantidad = document.getElementById("txtCantidad" + i).value;
        listaVentaProducto[i].descuento = document.getElementById("txtDescuento" + i).value;

    }
    let venta = {
        empleado: JSON.parse(localStorage.getItem("empleadouno")),
        clave: claveUnica
    };

    let detalleVenta = {
        venta: venta,
        lvp: listaVentaProducto
    };

    datos = {
        detalleVentap: JSON.stringify(detalleVenta)
    };


    params = new URLSearchParams(datos);

    fetch("../api/venta/saveVentap",
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

                //Alerta

                Swal.fire({
                    icon: 'success',
                    title: 'Gracias Por Tu Compra!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setDetalleVisible(false);
                refrescarTabla();
            });
}
export function totales() {

    let precioUnitario = 0;
    let j;
    let Total = 0;
    let descuento;
    let t = document.getElementById("lbTotal");
    for (j = 0; j < idAuto; j++) {

        listaVentaProducto[j].cantidad = document.getElementById("txtCantidad" + j).value;

        var boton = document.getElementById("txtCantidad" + j).value;
        listaVentaProducto[j].descuento = document.getElementById("txtDescuento" + j).value;

        if (listaVentaProducto[j].existencias > listaVentaProducto[j].cantidad) {
            //descuento

            let totalU = listaVentaProducto[j].precioUnitario * (1 - (listaVentaProducto[j].descuento / 100));

            let total = (listaVentaProducto[j].cantidad * totalU);
            Total += total;

            t.innerText = "$" + Total;
            listaVentaProducto[j].cantidad = document.getElementById("txtCantidad" + j).classList.remove("rojo");
            listaVentaProducto[j].cantidad = document.getElementById("txtCantidad" + j).className = "inp";
            document.getElementById("comprar").style.display = '';
        } else {
            listaVentaProducto[j].cantidad = document.getElementById("txtCantidad" + j).className = "rojo";
            t.innerText = "";
            document.getElementById("comprar").style.display = 'none';
            Swal.fire({
                icon: 'error',
                title: '¡Por favor revisa las cantidades!',
                showConfirmButton: false,
                timer: 1000
            });
        }
    }
    
}

export function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        totales();
    }
}

export function setDetalleVisible(valor)
{
    //Si valor es verdadero, mostramos el panel de
    //detalles y ocultamos el panel del catalogo
    if (valor === 0)
    {
        document.getElementById("divTicket").style.display = "none";
        document.getElementById("divCatalogo").style.display = "";
        document.getElementById("divCliente").style.display = "none";
        document.getElementById("divContacto").style.display = "none";
    } else if (valor === 1)
    {
        document.getElementById("divTicket").style.display = "";
        document.getElementById("divCatalogo").style.display = "none";
        document.getElementById("divCliente").style.display = "none";
        document.getElementById("divContacto").style.display = "none";
    } else if (valor === 2)
    {
        document.getElementById("divTicket").style.display = "none";
        document.getElementById("divCatalogo").style.display = "none";
        document.getElementById("divCliente").style.display = "";
        document.getElementById("divContacto").style.display = "none";
    } else if (valor === 4) {
        document.getElementById("divTicket").style.display = "none";
        document.getElementById("divCatalogo").style.display = "none";
        document.getElementById("divCliente").style.display = "none";
        document.getElementById("divContacto").style.display = "";
    }
}
//AQUI VA LO DE VENTA LENTES
let labelalert;
export function generar() {
    Swal.fire({
        iconHtml: '<i class="fas fa-glasses"></i>',
        title: '<label>Resumen Presupuesto</label>',
        html:
                ' <label id="lbNameC" >Nombre Cliente: Kevin Ramos</label><br><br> ' +
                ' <label id="lbEx" >Examen de Vista: OPQ-EX1</label><br><br> ' +
                ' <label id="lbEsferaOD" >EsferaOD:</label><br><br>' +
                ' <label id="lbEsferaOI" >EsferaOI:</label><br><br>' +
                ' <label id="lbCilindroOD" >CilindroOD:</label><br><br>' +
                ' <label id="lbCilindroOI">CilindroOI:</label><br><br>' +
                ' <label id="lbEjeOD" >EjeOD:</label><br><br>' +
                ' <label id="lbEjeOI" >EjeOI:</label><br><br>' +
                ' <label id="lbDIP" >DIP:</label><br><br>' +
                ' <label id="lbArmazon" >Armazon:</label><br><br>' +
                ' <label id="lbMica" >Mica:</label><br><br>' +
                ' <label id="lbMaterial" >Material:</label><br><br>' +
                ' <label id="lbAlturaOblea" >Altura de Oblea:</label><br><br>' +
                ' <label id="lbTratamiento" >Tratamiento:</label><br>' +
                ' <label id="lbLista" ></label><br><br>' +
                ' <label id="lbPrecios" ></label><br><br>',

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
                '<i class="fa fa-check"></i> Confirmar !',
        cancelButtonText:
                '<i class="fa fa-times-circle"></i> Cancelar',
        cancelButtonAriaLabel: 'Thumbs down',
        preConfirm: () => {
            inputs();
        }
    });
    labelalert = {
        nombreCliente: document.getElementById("lbNameC"),
        examen: document.getElementById("lbEx"),
        esferaod: document.getElementById("lbEsferaOD"),
        esferaoi: document.getElementById("lbEsferaOI"),
        cilindrood: document.getElementById("lbCilindroOD"),
        cilindrooi: document.getElementById("lbCilindroOI"),
        ejeod: document.getElementById("lbEjeOD"),
        ejeoi: document.getElementById("lbEjeOI"),
        dip: document.getElementById("lbDIP"),
        armazon: document.getElementById("lbArmazon"),
        mica: document.getElementById("lbMica"),
        material: document.getElementById("lbMaterial"),
        tratamiento: document.getElementById("lbTratamiento"),
        oblea: document.getElementById("lbAlturaOblea"),
        lista: document.getElementById("lbLista"),
        precio: document.getElementById("lbPrecios")
    };
}
let cantidad;
let descuento;
export function inputs() {
    Swal.fire({
        title: 'Ingrese Las Cantidades',
        html:
                '<input id="txtCantidadP" class="swal2-input" placeholder="Ingresa Cantidad">' +
                '<input id="txtDescuentoP" class="swal2-input" placeholder="Ingresa Descuento">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                cantidad = document.getElementById('txtCantidadP').value,
                descuento = document.getElementById('txtDescuentoP').value
            ];
        }
    }).then((result) => {
        if (result.isConfirmed) {
            //console.log(result.value);
            generarVenta();
        }
    });
}

export function crearTicket() {
    labelalert.nombreCliente.innerText = "Nombre Cliente: " + nombreCliente;
    labelalert.examen.innerText = "Examen: " + claveExamen;
    labelalert.esferaod.innerText = "Esfera OD: " + graduaciones.esferaod;
    labelalert.esferaoi.innerText = "Esfera OI: " + graduaciones.esferaoi;
    labelalert.cilindrood.innerText = "Cilindro OD: " + graduaciones.cilindrood;
    labelalert.cilindrooi.innerText = "Cilindro OI: " + graduaciones.cilindrooi;
    labelalert.ejeod.innerText = "Eje OD: " + graduaciones.ejeod;
    labelalert.ejeoi.innerText = "Eje OI: " + graduaciones.ejeoi;
    labelalert.dip.innerText = "DIP: " + graduaciones.dip;
    labelalert.armazon.innerText = "Armazon: " + armazonSeleccionado;
    labelalert.mica.innerText = "Mica: " + micaSeleccionada;
    labelalert.material.innerText = "Material: " + materialSeleccionado;
    labelalert.tratamiento.innerText = "Tratamientos: ";
    labelalert.oblea.innerText = "Altura Oblea: " + document.getElementById("txtAlturaOblea").value;
    labelalert.lista.innerText = "     " + tratamientosSeleccionados;


    totalVentaPresupuesto = -100;
    for (let i = 0; i < precios.length; i++) {
        totalVentaPresupuesto += parseInt(precios[i]);
    }
    labelalert.precio.innerText = "Precio Total 1pz:  $" + totalVentaPresupuesto;
}

export function generarVenta() {
    //aqui se sacara precios y precio total
    var xm = document.getElementById("secMaterial").selectedIndex;
    var ym = document.getElementById("secMaterial").options;
    var xa = document.getElementById("secArmazon").selectedIndex;
    var ya = document.getElementById("secArmazon").options;
    var xmi = document.getElementById("secMica").selectedIndex;
    var ymi = document.getElementById("secMica").options;

    var im = ym[xm].index;
    var ia = ya[xa].index;
    var imi = ymi[xmi].index;


    let dat = localStorage.getItem("empleadouno");

// Convertir la cadena en un objeto JSON
    let json = JSON.parse(dat);

// Acceder al lastToken
    let idEmpleado = json.idEmpleado;

    let params = null;
    let datos = null;
    let fechaActual = new Date().getTime();
    let numeroAleatorio = Math.floor(Math.random() * 200000);
    let claveUnica = fechaActual.toString() + numeroAleatorio.toString();

    const selectMica = document.getElementById("secMica");
    const selectMaterial = document.getElementById("secMaterial");
    const selectArmazon = document.getElementById("secArmazon");
    const selectExamen = document.getElementById("secExamen");

    const idArmazon = selectArmazon.value;
    const idMaterialSeleccionado = selectMaterial.value;
    const idTipoMicaSeleccionado = selectMica.value;
    const idExamenVista = selectExamen.value;
    const alturaOblea = document.getElementById("txtAlturaOblea").value;

    //estos ya jalan
    let empleado = {
        idEmpleado: idEmpleado
    };

    let venta = {
        empleado: empleado,
        clave: claveUnica
    };


    //.......
    let tratamiento = {
        idTratamiento: idTratamiento
    };
    let presupuesto_lentes_tratamiento = {
        tratamiento: tratamiento
    };

    let mica = {
        idTipoMica: idTipoMicaSeleccionado
    };

    let material = {
        idMaterial: idMaterialSeleccionado
    };

    let armazon = {
        idArmazon: idArmazon
    };

    let presupuesto_lentes = {
        alturaOblea: alturaOblea,
        mica: mica,
        material: material,
        armazon: armazon,
        presupuesto_lentes_tratamiento: [presupuesto_lentes_tratamiento]
    };

    let ExamenVista = {
        idExamenVista: idExamenVista
    };

    let presupuesto = {
        ExamenVista: ExamenVista,
        clave: claveExamen,
        presupuesto_lentes: presupuesto_lentes
    };



    let venta_presupuesto = {
        presupuesto: presupuesto,
        cantidad: cantidad,
        precioUnitario: totalVentaPresupuesto,
        descuento: descuento
    };

    let DetalleVentaPre = {
        venta: venta,
        venta_presupuesto: [venta_presupuesto]
    };

    datos = {
        DetalleVentaPre: JSON.stringify(DetalleVentaPre)
    };


    params = new URLSearchParams(datos);


    fetch("../api/ventap/saveVentapre",
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

                //Alerta

                Swal.fire({
                    icon: 'success',
                    title: 'Gracias Por Tu Compra!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
}


export function precioULentesC() {
    let precioC = document.getElementById("lbPrecioLentesC");
    precioC.innerText = "Precio Unitario: $ " + precioLenteC;
}
let totalL;
let cantidadLC;
let descuentoLC;
export function totalLentesC() {
    cantidadLC = document.getElementById("txtCantidadC").value;
    descuentoLC = document.getElementById("txtDescuentoC").value;
    let totalSD = cantidadLC * precioLenteC;
    totalL = totalSD * (1 - (descuentoLC / 100));

    document.getElementById("lbTotalLentesC").innerText = "Precio Total: $" + totalL;
}

export function comprarLenteC() {
    let params = null;
    let datos = null;
    let dat = localStorage.getItem("empleadouno");

    let json = JSON.parse(dat);

    let idEmpleado = json.idEmpleado;
    let fechaActual = new Date().getTime();
    let numeroAleatorio = Math.floor(Math.random() * 300000);
    let claveUnica = fechaActual.toString() + numeroAleatorio.toString();
    const selectExamen = document.getElementById("secExamenC");
    const idExamenVista = selectExamen.value;
    const selectLC = document.getElementById("secLentesContacto");
    const idLenteContacto = selectLC.value;
        let empleado = {
            idEmpleado: idEmpleado
        };
        let venta = {
            empleado: empleado,
            clave: claveUnica
        };

        let examenVista ={
          idExamenVista: idExamenVista  
        };

        let presupuesto = {
            clave: claveExamen
        };

        let lenteContacto = {
          idLenteContacto: idLenteContacto
        };

        let presupuestoLC = {
            examenVista: examenVista,
            presupuesto: presupuesto,
            LenteContacto: lenteContacto,
            clave: claveUnica
        };
        
        let venta_presupuesto = {
            presupuestoLC: presupuestoLC,
            cantidad: cantidadLC,
            precioUnitario: precioLenteC,
            descuento: descuentoLC
        };

        let DetalleVentaPre = {
            venta: venta,
            venta_presupuesto: [venta_presupuesto]
        };


        datos = {
            DetalleVentaPre: JSON.stringify(DetalleVentaPre)
        };


    params = new URLSearchParams(datos);


    fetch("../api/ventalc/saveVentaLC",
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

                //Alerta

                Swal.fire({
                    icon: 'success',
                    title: 'Gracias Por Tu Compra!',
                    showConfirmButton: false,
                    timer: 1500
                });
            });

}
//fills.....................

function fillTableCliente(data) {
    let contenido = '';
    clientesp = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido + '<tr class="contenido_tabla">' +
                '<td>' + data[j].persona.nombre + '</td>' +
                '<td>' + data[j].persona.apellidoPaterno + '</td>' +
                '<td>' + data[j].persona.apellidoMaterno + '</td>' +
                '<td>' + data[j].persona.genero + '</td>' +
                '<td class="text-info">' +
                '<button id="cbPresupuesto" class="btn btn-sm btn-outline-success"\n\
                         onclick="cm.mostrarDetalleCliente(' + j + ');"><i class="fas fa-clipboard-list"></i></button>' +
                '</td>';
        '</tr>';

    }
    document.getElementById("tbodyClientes").innerHTML = contenido;
    document.getElementById("tbodyClientesC").innerHTML = contenido;
}

function fillListExamen(data) {
    let contenido = '<option>Seleccionar Examen de Vista</option>';
    examenvista = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido +
                '<option onclick="cm.mostrarGraduacion(' + j + ');" value="' + data[j].idExamenVista + '">' + data[j].clave + "____" +
                data[j].fecha + "____" + '</option>';
    }
    document.getElementById("secExamen").innerHTML = contenido;
    document.getElementById("secExamenC").innerHTML = contenido;


}

let armazonSeleccionado = '';
function fillListArmazon(data) {
    let contenido = '<option>Seleccionar Armazón</option>';
    armazones = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido +
                '<option value="' + data[j].idArmazon + '">' + data[j].producto.nombre + '</option>';

    }
    document.getElementById("secArmazon").innerHTML = contenido;
    document.getElementById("secArmazon").addEventListener("change", function () {

        let selectedIndex = this.selectedIndex;

        armazonSeleccionado = this.options[selectedIndex].text;
        precios.push(data[selectedIndex - 1].producto.precioVenta);
    });

}
let materialSeleccionado = '';
function fillListMaterial(data) {
    let contenido = '<option>Seleccionar Material</option>';
    materiales = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido +
                '<option value="' + data[j].idMaterial + '">' + data[j].nombre + '</option>';
    }
    document.getElementById("secMaterial").innerHTML = contenido;
    document.getElementById("secMaterial").addEventListener("change", function () {

        let selectedIndex = this.selectedIndex;

        materialSeleccionado = this.options[selectedIndex].text;
        precios.push(data[selectedIndex - 1].precioVenta);
    });
}
let idMica;
let idPre = 0;

let micaSeleccionada = '';
function fillListMica(data) {
    let contenido = '<option value="">Seleccionar Mica</option>';
    mica = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
        //Generamos el contenido de forma dinamica:
        contenido = contenido +
                '<option id="txtNameMica' + j + '" value="' + data[j].idTipoMica + '">' + data[j].nombre + '</option>';
        idPre++;
    }

    document.getElementById("secMica").innerHTML = contenido;
    document.getElementById("secMica").addEventListener("change", function () {

        let selectedIndex = this.selectedIndex;

        micaSeleccionada = this.options[selectedIndex].text;
        precios.push(data[selectedIndex - 1].precioVenta);
    });
}

let graduaciones;

function fillTableGraduacion(data) {
    let contenidog = '';
    graduacion = data;
    for (j = 0; j < data.length; j++) {
        contenidog = contenidog + '<tr class="contenido_tabla">' +
                '<td>' + data[j].esferaod + '</td>' +
                '<td>' + data[j].esferaoi + '</td>' +
                '<td>' + data[j].cilindrood + '</td>' +
                '<td>' + data[j].cilindrooi + '</td>' +
                '<td>' + data[j].ejeod + '</td>' +
                '<td>' + data[j].ejeoi + '</td>' +
                '<td>' + data[j].dip + '</td>';

        graduaciones = {
            esferaod: data[j].esferaod,
            esferaoi: data[j].esferaoi,
            cilindrood: data[j].cilindrood,
            cilindrooi: data[j].cilindrooi,
            ejeod: data[j].ejeod,
            ejeoi: data[j].ejeoi,
            dip: data[j].dip
        };
    }
    document.getElementById("tbodyGraduacion").innerHTML = contenidog;
    document.getElementById("tbodyGraduacionC").innerHTML = contenidog;
}
let tratamientosSeleccionados = [];
function fillTableTratamiento(data) {
    let contenidog = '';
    tratamientos = data;
    for (j = 0; j < data.length; j++) {
        contenidog = contenidog + '<tr class="contenido_tabla">' +
                '<td>' + data[j].nombre + '</td>' +
                '<td>' + data[j].precioCompra + '</td>' +
                '<td>' + '<button id="btnTratamiento" class="btn btn-sm btn-outline-success"\n\
                         onclick="cm.recogerTratamiento(' + j + '); cm.agregarTratamiento(\'' + data[j].nombre + '\');cm.agregarPrecio(\'' + data[j].precioVenta + '\');"><i class="fas fa-paper-plane"></i></button>' +
                '</td>';

    }
    document.getElementById("tbodyTratamiento").innerHTML = contenidog;

}

//LENTES DE CONTACTO APARTE DE ESTOS
let precioLenteC;
function fillListLenteCon(data) {
    let contenido = '<option>Seleccionar Lente de Contacto</option>';
    lentesContacto = data;
    //Recorremos el arreglo:
    for (j = 0; j < data.length; j++) {
//Generamos el contenido de forma dinamica:
        contenido = contenido +
                '<option value="' + data[j].idLenteContacto + '" onclick="cm.precioULentesC();">' + data[j].producto.nombre + "____" +
                data[j].producto.marca + "____" + '</option>';
    }
    document.getElementById("secLentesContacto").innerHTML = contenido;
    document.getElementById("secLentesContacto").addEventListener("change", function () {

        let selectedIndex = this.selectedIndex;
        precioLenteC = data[selectedIndex - 1].producto.precioVenta;
    });

}

export function agregarTratamiento(nombre) {

    if (!tratamientosSeleccionados.includes(nombre)) {

        tratamientosSeleccionados.push(nombre);
    }
}

export function agregarPrecio(precioVenta) {

    if (!precios.includes(precioVenta)) {

        precios.push(precioVenta);
    }
}
//fills.....................


//refrescar............
function refrescarTablaCliente() {
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
                fillTableCliente(data);
            });
}

function refrescarListArmazon() {
    let url = "../api/armazon/getAll";
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
                fillListArmazon(data);
            });
}

function refrescarListMaterial() {
    let url = "../api/material/getAll";
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
                fillListMaterial(data);
            });
}

function refrescarListMica() {
    let url = "../api/mica/getAll";
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
                fillListMica(data);
            });
}

function refrescarTablaTratamiento() {
    let url = "../api/tratamiento/getAll";
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
                fillTableTratamiento(data);
            });
}
//refrescar...........
//LENTES DE CONTACTO ...........
function refrescarListLentesC() {
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
                fillListLenteCon(data);
            });
}

let nombreCliente;
//busquedas...
export function mostrarDetalleCliente(pos) {
    let c = clientesp[pos];
    let datos = null;
    let params = null;
    if (pos >= 0) {
        nombreCliente = c.persona.nombre + " " + c.persona.apellidoPaterno;
        datos = {
            idCliente:
                    c.idCliente
        };

        params = new URLSearchParams(datos);

        let url = "../api/examen_vista/getAll?" + params.toString();
        ;
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
                    fillListExamen(data);
                });
    } else //Esto no deberia suceder
        alert("nou");
}

function buscarPosicionClientePorIdPorId(id) {
    for (let i = 0;
    i < clientesp.length; i++) {
        if (clientesp[i] === id)
            return i;
    }
    return -1;
}
let claveExamen;
export function mostrarGraduacion(pos) {
    let e = examenvista[pos];
    let datos = null;
    let params = null;
    if (pos >= 0) {
        claveExamen = e.clave;
        datos = {
            idGraduacion:
                    e.graduacion.idGraduacion
        };

        params = new URLSearchParams(datos);

        let url = "../api/graduacion/getAll?" + params.toString();
        ;
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
                    fillTableGraduacion(data);
                });
    } else //Esto no deberia suceder
        alert("nou");
}

function buscarPosicionGraduacionPorId(id) {
    for (let i = 0;
    i < examenvista.length; i++) {
        if (examenvista[i] === id)
            return i;
    }
    return -1;
}

let idTratamiento = [];
let nombreTratamientos = [];
//tratamiento
export function recogerTratamiento(pos) {
    let t = tratamientos[pos];
    if (pos >= 0) {
        idTratamiento = t.idTratamiento;
        nombreTratamientos = t.nombre;
    }
    ;

}

function buscarPosicionTrtamientoPorId(id) {
    for (let i = 0;
    i < tratamientos.length; i++) {
        if (tratamientos[i] === id)
            return i;
    }
    return -1;
}



