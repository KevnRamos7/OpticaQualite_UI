

function login() {
    let nombreUsuario = document.getElementById("txtUsuario").value;
    let contrasenia = document.getElementById("txtPassword").value;
    encriptar(contrasenia).then((textoEncriptado) => {

        let datos = {
            nombreUsuario: nombreUsuario,
            contrasenia: textoEncriptado
        };
     
        let params = new URLSearchParams(datos);
        fetch("api/empleado/verificarLogin?" + params)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    if (data.idEmpleado !== null) {
                 
                
                        localStorage.setItem("empleadouno", JSON.stringify(data));

                        window.location.replace('admin/index.html');

                    } else {
                        alert('Usuario no existente');
                    }
                });
    });
}


function logout()
{
    datos = {
        empleado: localStorage.getItem("empleadouno")
    };

    params = new URLSearchParams(datos);
    fetch("../api/empleado/out",
            {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body: params
            })
            .then(response => {
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem("empleadouno", JSON.stringify(""));
                window.location.replace('/QRedata/index.html');

            }).catch(res => alert('error'));

}


async function encriptar(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}