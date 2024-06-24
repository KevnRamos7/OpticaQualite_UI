/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.redata.oq.rest;

import com.google.gson.Gson;
import com.oq.core.ControllerMaterial;
import com.oq.core.ControllerTratamiento;
import com.redata.oq.model.Material;
import com.redata.oq.model.Tratamiento;
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
@Path("material")
public class RESTMaterial {
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
         ControllerMaterial cma = null;
        List<Material> material = null;

        try {
            cma = new ControllerMaterial();
            material = cma.getAll(filtro);
            out = new Gson().toJson(material);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
