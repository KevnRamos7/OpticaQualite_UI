/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.oq.core.ControllerExamenVista;
import com.oq.core.ControllerGraduacion;
import com.redata.oq.model.ExamenVista;
import com.redata.oq.model.Graduacion;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author kevin
 */

@Path("graduacion")
public class RESTGraduacion {
       
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro, 
                            @QueryParam("idGraduacion") @DefaultValue("0") int idGraduacion){
        String out = null;
        ControllerGraduacion cg = null;
        List<Graduacion> graduacion = null;
        
        try
        {
            cg = new ControllerGraduacion();
            graduacion = cg.getAll(filtro, idGraduacion);
            out = new Gson().toJson(graduacion);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
