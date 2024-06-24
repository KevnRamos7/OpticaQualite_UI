package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerLentesContacto;
import com.redata.oq.model.LenteContacto;
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
 * @author marib
 */

@Path("lentesContacto")
public class RESTLentesContacto {
    
    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosLentesC") @DefaultValue("") String datosLentesC) {
        String out = null;
        Gson gson = new Gson();
        LenteContacto len = null;
        ControllerLentesContacto clc = new ControllerLentesContacto();

        try {
            len = gson.fromJson(datosLentesC, LenteContacto.class);
            if (len.getIdLenteContacto()== 0) {
                clc.insert(len);
            } else {
                clc.update(len);
            }
            out = gson.toJson(len);

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
    public Response delete(@FormParam("datosLentesC") @DefaultValue("") String datosLentesC) {
        String out = null;
        Gson gson = new Gson();
        LenteContacto lentes = null;
        ControllerLentesContacto cs = new ControllerLentesContacto();
        try {
            lentes = gson.fromJson(datosLentesC, LenteContacto.class);
            cs.delete(lentes);
            out = gson.toJson(lentes);
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
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerLentesContacto ce = null;
        List<LenteContacto> lentes = null;
        try {
            ce = new ControllerLentesContacto();
            lentes = ce.getAll(filtro);
            out = new Gson().toJson(lentes);
        } catch (Exception e) {
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
        ControllerLentesContacto ce = null;
        List<LenteContacto> lent = null;
        try
        {
            ce = new ControllerLentesContacto();
            lent = ce.search(filtro);
            out = new Gson().toJson(lent);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }

}
