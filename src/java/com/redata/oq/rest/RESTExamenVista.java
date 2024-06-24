/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.oq.core.ControllerExamenVista;
import com.redata.oq.model.Cliente;
import com.redata.oq.model.ExamenVista;
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
@Path("examen_vista")
public class RESTExamenVista {
      
    
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro, 
                            @QueryParam("idCliente") @DefaultValue("0") int idCliente){
        String out = null;
        ControllerExamenVista cex = null;
        List<ExamenVista> examen_vista = null;
        
        try
        {
            cex = new ControllerExamenVista();
            examen_vista = cex.getAll(filtro, idCliente);
            out = new Gson().toJson(examen_vista);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
