/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.oq.core.ControllerVentaLC;
import com.oq.core.ControllerVentaLentes;
import com.redata.oq.model.DetalleVentaPre;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 *
 * @author kevin
 */
@Path("ventalc")
public class RESTVentaLentesContacto {
    @POST
    @Path("saveVentaLC")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("DetalleVentaPre") @DefaultValue("") String DetalleVentaPre) {
        String out = null;
        Gson gson = new Gson();
        DetalleVentaPre dvp = null;
        ControllerVentaLC cvl = new ControllerVentaLC();
        
        try{
            dvp = gson.fromJson(DetalleVentaPre, DetalleVentaPre.class);
            System.out.println("Datos recibidos: " + DetalleVentaPre);
            cvl.generarVentaLC(dvp);
            out = gson.toJson(dvp);
            
        } catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
