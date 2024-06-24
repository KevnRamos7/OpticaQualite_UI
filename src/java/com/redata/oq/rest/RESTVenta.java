/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.oq.core.ControllerVentaP;
import com.redata.oq.model.Detalle_Venta_Producto;
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
@Path("venta")
public class RESTVenta {
    @POST
    @Path("saveVentap")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("detalleVentap") @DefaultValue("") String detalleVentap) {
        String out = null;
        Gson gson = new Gson();
        Detalle_Venta_Producto dvp = null;
        ControllerVentaP cvp = new ControllerVentaP();
        try{
            dvp = gson.fromJson(detalleVentap, Detalle_Venta_Producto.class);
            cvp.generarVenta(dvp);
            out = gson.toJson(dvp);
            
        } catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
