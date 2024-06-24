/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerAccesorio;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.oq.core.ControllerEmpleado;
import com.redata.oq.model.Accesorio;
import com.redata.oq.model.Empleado;
import com.redata.oq.model.Usuario;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.QueryParam;
import java.util.List;

@Path("accesorio")
public class RESTAccesorio {

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosAccesorio") @DefaultValue("") String datosAccesorio, @QueryParam("lastToken") @DefaultValue("") String lastToken) {
        String out = null;
        Gson gson = new Gson();
        Accesorio acc = null;
        ControllerAccesorio ca = new ControllerAccesorio();

        try {
            acc = gson.fromJson(datosAccesorio, Accesorio.class);
            if (acc.getIdAccesorio()== 0) {
                ca.insert(acc, lastToken);
            } else {
                ca.update(acc, lastToken);
            }
            out = gson.toJson(acc);

        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o en el formato.\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("datosAccesorio")@DefaultValue("") String datosAccesorio, @FormParam("lastToken") @DefaultValue("") String lastToken)
    {
        String out = null;
        Gson gson = new Gson();
        Accesorio acc = null;
        ControllerAccesorio ca = new ControllerAccesorio();
        try
        {
            acc = gson.fromJson(datosAccesorio, Accesorio.class);
            ca.delete(acc,lastToken);
            out = gson.toJson(acc);
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
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro ) throws Exception{
        String out = null;
        ControllerAccesorio ca = null;
        List<Accesorio> Accesorio = null;
        
            ca = new ControllerAccesorio();
            Accesorio = ca.getAll(filtro);
            out = new Gson().toJson(Accesorio);
            
            
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
   
/*@GET
    @Path("buscar")
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscar(@QueryParam("filtro")@DefaultValue("")String filtro)
    {
        String out = null;
        ControllerAccesorio ce = null;
        List<Accesorio> accesorios = null;
        try
        {
            ce = new ControllerAccesorio();
            accesorios = ce.search(filtro);
            out = new Gson().toJson(accesorios);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }*/


}

