/* global fetch */
//declara variable nula
let cm = null;

function cargarModuloAccesorio() {
    //buscador de ruta
    fetch("./producto/accesorio/despliegue_accesorio.html")
    //devuelve lo que se señala en la ruta como texto y luego lo devuelve en html
            .then(response => {
                return response.text();
            })
            .then(function (html) {
                //devuelve en el contenedor el html
                document.getElementById('contenedor_principal').innerHTML = html;
                document.getElementById('contenedor_home').innerHTML = "";
                //import trae funciones js y convierte en modulo, por que el fetch en texto y json
                import ('./accesorio.js')
                        .then(obj => {
                            cm = obj;
                            cm.inicializar();
                        });
            });
}

function cargarModuloArmazones(){
    fetch("./producto/armazon/despliegue_armazon.html")
   .then(response => {return response.text();})
   .then(function(html){
       document.getElementById('contenedor_principal').innerHTML = html;
       document.getElementById('contenedor_home').innerHTML = "";
       import ('./armazon.js')
               .then(obj => {
               cm = obj;
               cm.inicializar();
               });
   });
}

function cargarModuloSolucion() {
    fetch("./producto/solucion/despliegue_solucion.html")
            .then(response => {
                return response.text();
            })
            .then(function (html) {
                document.getElementById('contenedor_principal').innerHTML = html;
                document.getElementById('contenedor_home').innerHTML = "";
                import ('./solucion.js')
                        .then(obj => {
                            cm = obj;
                            cm.inicializar();
                        });
            });
    
}

function cargarModuloLentesDeContacto() {
fetch("./producto/lentes_contacto/despliegue_lentes_contacto.html")
        .then(response => {
        return response.text();
        })
        .then(function (html) {
        document.getElementById('contenedor_principal').innerHTML = html;
                document.getElementById('contenedor_home').innerHTML = "";
        import ('./lentes_contacto.js')
                .then(obj => {
                cm = obj;
                        cm.inicializar();
                });
        });
        }


function cargarModuloCliente(){
    fetch("./clientes/despliegue_client.html")
   .then(response => {return response.text();})
   .then(function(html){
       document.getElementById('contenedor_principal').innerHTML = html;
       document.getElementById('contenedor_home').innerHTML = "";
       import ('./cliente.js')
               .then(obj => {
               cm = obj;
               cm.inicializar();
               });
   });
}

function cargarModuloEmpleado(){
    fetch("./empleado/despliegue_emp.html")
   .then(response => {return response.text();})
   .then(function(html){
       document.getElementById('contenedor_principal').innerHTML = html;
       document.getElementById('contenedor_home').innerHTML = "";
       import ('./empleado.js')
               .then(obj => {
               cm = obj;
               cm.inicializar();
               });
   });
}

function cargarModuloVentas() {
    //buscador de ruta
    fetch("./ventas/despliegueVentas.html")
    //devuelve lo que se señala en la ruta como texto y luego lo devuelve en html
            .then(response => {
                return response.text();
            })
            .then(function (html) {
                //devuelve en el contenedor el html
                document.getElementById('contenedor_principal').innerHTML = html;
                document.getElementById('contenedor_home').innerHTML = "";
                //import trae funciones js y convierte en modulo, por que el fetch en texto y json
                import ('./venta.js')
                        .then(obj => {
                            cm = obj;
                            cm.inicializar();
                        });
            });
}

function cargarModuloPresupuesto() {
    //buscador de ruta
    fetch("./presupuesto/desplieguePresupuesto.html")
    //devuelve lo que se señala en la ruta como texto y luego lo devuelve en html
            .then(response => {
                return response.text();
            })
            .then(function (html) {
                //devuelve en el contenedor el html
                document.getElementById('contenedor_principal').innerHTML = html;
                document.getElementById('contenedor_home').innerHTML = "";
                //import trae funciones js y convierte en modulo, por que el fetch en texto y json
                import ('./presupuesto.js')
                        .then(obj => {
                            cm = obj;
                            cm.inicializar();
                        });
            });
}