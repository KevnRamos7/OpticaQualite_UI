/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerSolucion;
import com.redata.oq.model.Solucion;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("solucion")
public class RESTSolucion {
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosSolucion")@DefaultValue("") String jsonSolucion)
    {
        String out = null;
        Gson gson = new Gson();
        Solucion sol = null;
        ControllerSolucion cs = new ControllerSolucion();
        try
        {
            sol = gson.fromJson(jsonSolucion, Solucion.class);
            if (sol.getIdSolucion()==0)
            {
                cs.insert(sol);
            }
            else
            {
               cs.update(sol);  
            }
            out = gson.toJson(sol);
        }
        catch(JsonParseException jpe)
        {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o de formato.\"}";
            
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("datosSolucion")@DefaultValue("") String jsonSolucion)
    {
        String out = null;
        Gson gson = new Gson();
        Solucion sol = null;
        ControllerSolucion cs = new ControllerSolucion();
        try
        {
            sol = gson.fromJson(jsonSolucion, Solucion.class);
            cs.delete(sol);
            out = gson.toJson(sol);
        }
        catch(JsonParseException jpe)
        {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o de formato.\"}";
            
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro){
        String out = null;
        ControllerSolucion cs = null;
        List<Solucion> soluciones = null;
        
        try
        {
            cs = new ControllerSolucion();
            soluciones = cs.getAll(filtro);
            out = new Gson().toJson(soluciones);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
     @GET
@Path("buscar")
@Produces(MediaType.APPLICATION_JSON)
public Response buscar(@QueryParam("filtro")
@DefaultValue("")String filtro)
    {
        String out = null;
        ControllerSolucion ce = null;
        List<Solucion> soluciones = null;
        try
        {
            ce = new ControllerSolucion();
            soluciones = ce.search(filtro);
            out = new Gson().toJson(soluciones);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }
}
