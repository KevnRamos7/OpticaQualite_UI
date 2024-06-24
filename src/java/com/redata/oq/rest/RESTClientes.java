/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerCliente;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.redata.oq.model.Cliente;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.QueryParam;
import java.util.List;

@Path("cliente")
public class RESTClientes {

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = null;
        Gson gson = new Gson();
        Cliente cli = null;
        ControllerCliente cc = new ControllerCliente();

        try {
            cli = gson.fromJson(datosCliente, Cliente.class);
            if (cli.getIdCliente()== 0) {
                cc.insert(cli);
            } else {
                cc.update(cli);
            }
            out = gson.toJson(cli);
            out = Integer.toString(cli.getIdCliente());
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o en el formato.\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerCliente cc = null;
        List<Cliente> clientes = null;
        try {
            cc = new ControllerCliente();
            clientes = cc.getAll(filtro);
            out = new Gson().toJson(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @POST
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("datosCliente") @DefaultValue("") String datosCliente) {
        String out = null;
        Gson gson = new Gson();
        Cliente cli = null;
        ControllerCliente cc = new ControllerCliente();
        try {
            cli = gson.fromJson(datosCliente, Cliente.class);
            cc.delete(cli);
            out = gson.toJson(cli);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = "{\"exception\":\"Error en los datos introducidos o de formato.\"}";

        } catch (Exception e) {
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
        ControllerCliente ce = null;
        List<Cliente> clientes = null;
        try
        {
            ce = new ControllerCliente();
            clientes = ce.search(filtro);
            out = new Gson().toJson(clientes);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }


}