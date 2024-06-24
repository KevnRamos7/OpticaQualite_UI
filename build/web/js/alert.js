function alertarGuardarRegistro() {
    Swal.fire({
        icon: 'success',
        title: 'SE GUARDÓ\n\EXITOSAMENTE',
        showConfirmButton: false,
        timer: 2000
    });
}
//El de modificar
function alertarGuardarModificar() {
    Swal.fire({
        icon: 'success',
        title: 'SE MODIFICÓ\n\EXITOSAMENTE',
        showConfirmButton: false,
        timer: 2000
    });
}

function alertarPreguntaEliminacion(idAccesorio) {
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
            remove(idAccesorio);
            Swal.fire({
                icon: 'success',
                title: 'SE ELIMINÓ\n\EXITOSAMENTE',
                showConfirmButton: false,
                timer: 2000
            });
        } else
            Swal.fire({
                icon: 'error',
                title: 'ACCIÓN CANCELADA',
                showConfirmButton: false,
                timer: 2000
            });
    });
}

function alertarError() {
    Swal.fire({
        title: 'Registro no encontrado',
        icon: 'error',
        text: 'Error inesperado',
        showConfirmButton: false,
        timer: 2000
    });
}

