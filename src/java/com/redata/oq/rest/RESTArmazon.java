/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerArmazon;
import com.redata.oq.model.Armazon;
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

/**
 *
 * @author alexi
 */

@Path("armazon")
public class RESTArmazon {
     @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosArmazon")@DefaultValue("") String jsonArmazon)
    {
        String out = null;
        Gson gson = new Gson();
        Armazon arm = null;
        ControllerArmazon cs = new ControllerArmazon();
        try
        {
            arm = gson.fromJson(jsonArmazon, Armazon.class);
            if (arm.getIdArmazon()==0)
            {
                cs.insert(arm);
                
            }
            else
            {
               cs.update(arm);  
            }
            out = gson.toJson(arm);
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
    public Response delete(@FormParam("datosArmazon")@DefaultValue("") String jsonArmazon)
    {
        String out = null;
        Gson gson = new Gson();
        Armazon arm = null;
        ControllerArmazon cs = new ControllerArmazon();
        try
        {
            arm = gson.fromJson(jsonArmazon, Armazon.class);
            cs.delete(arm);
            out = gson.toJson(arm);
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
        ControllerArmazon cs = null;
        List<Armazon> armazones = null;
        
        try
        {
            cs = new ControllerArmazon();
            armazones = cs.getAll(filtro);
            out = new Gson().toJson(armazones);
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
    public Response buscar(@QueryParam("filtro")@DefaultValue("")String filtro)
    {
        String out = null;
        ControllerArmazon ce = null;
        List<Armazon> armazones = null;
        try
        {
            ce = new ControllerArmazon();
            armazones = ce.search(filtro);
            out = new Gson().toJson(armazones);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }

}

