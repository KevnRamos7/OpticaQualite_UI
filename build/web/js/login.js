$(document).ready(function (){
        var bandera= new Boolean(true);
        $(".m1").click(function () {
            if (bandera){
                $(".login").css({'transform': 'translateY(-270px)'});
                $(".m1").css({'transform': 'scale(0.7)'});
                $(".signup").css({'transform': 'translateY(-100px)'});
                $(".logoq").css({'transform': 'scale(0.7)'});
                bandera=false;
            } else {
                $(".login").css({'transform': 'translateY(-80px)'});
                $(".m1").css({'transform': 'scale(0.6)'});
                $(".signup").css({'transform': 'translateY(0px)'});
                $(".logoq").css({'transform': 'scale(1)'}); 
                bandera=true;
            } 
        });   
    });