/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerAcceso;
import com.redata.oq.model.Empleado;
import com.redata.oq.model.Usuario;

import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;

/**
 *
 * @author GTO
 */
@Path("login")
public class RESTLogin {
@GET
    @Path("verificarLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verificar(@QueryParam("nombreUsuario") @DefaultValue("") String nombreUsuario,
            @QueryParam("contrasenia") @DefaultValue("") String contrasenia) throws Exception {
        String out = null;
        ControllerAcceso controllera = new ControllerAcceso();
        Usuario u = new Usuario();
        u.setNombre(nombreUsuario);
        u.setContrasenia(contrasenia);
        try {
            Empleado e = controllera.acceder(u);
            if (e != null) {
                e.getUsuario().setLastToken();
                controllera.guardarToken(e);
                out = new Gson().toJson(e);
            }
        } catch (Exception e) {
            e.printStackTrace();
            out = new Gson().toJson(null);;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("out")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response logOut(@FormParam("empleado") @DefaultValue("") String e) throws SQLException {
        String out = null;
        Empleado empleado = null;
        ControllerAcceso ca = null;
        Gson gson = new Gson();

        
            empleado = gson.fromJson(e, Empleado.class);
            ca = new ControllerAcceso();
            if (ca.eliminarToken(empleado)){
            out = "{\"ok\":\"ok\"}";
            } else {
            out = "{\"error\">\"Eliminacion de token no realizada\"}";
            }
        /*catch (JsonParseException jpe){
            out = "{\"error\"😕"Formato de datos no valido\"}";
            jpe.printStackTrace();
        } catch (Exception ex){
            out = "{\"error\"😕"Acceso no concedido\"}"; 
            ex.printStackTrace();
        } */
        return Response.status(Response.Status.OK).entity(out).build();
    }

}
