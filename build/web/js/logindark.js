let valor = localStorage.getItem("btn_darkmode");

if (valor == "true") {
    document.body.classList.add("dark");
} else {
    document.body.classList.remove("dark");
}

function dark_login (){
    let value = document.getElementById('darki');
    value.addEventListener('click', function(){
    let vallog = document.body.classList.toggle('dark-log');
    
    });
}
