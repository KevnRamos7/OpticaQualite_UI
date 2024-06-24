

function cerrarModulos() {
    fetch("home.html")
            .then(response => {
                return response.text();
            })
            .then(function (html)
            {
                document.getElementById('contenedor_principal').innerHTML = "";
                document.getElementById('contenedor_home').innerHTML = html;
            });
}


var img = document.getElementById("imagen");
var help = document.getElementById("ayuda");

const btn_darkmode = document.getElementById('darkmode');
btn_darkmode.addEventListener('click', function () {
    let val = document.body.classList.toggle('dark');
    localStorage.setItem("btn_darkmode", val);

    help.src = "../media/ayuda_white.png";

});



let valor = localStorage.getItem("btn_darkmode");

if (valor == "true") {
    document.body.classList.add("dark");

    help.src = "../media/ayuda_white.png";
    

} else {
    document.body.classList.remove("dark");

    help.src = "../media/ayuda_icon.png";
}







