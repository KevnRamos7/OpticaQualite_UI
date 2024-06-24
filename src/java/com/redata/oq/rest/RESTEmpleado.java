package com.redata.oq.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.oq.core.ControllerAcceso;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.oq.core.ControllerEmpleado;
import com.redata.oq.model.Empleado;
import com.redata.oq.model.Usuario;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.QueryParam;
import java.sql.SQLException;
import java.util.List;

@Path("empleado")
public class RESTEmpleado {

    @POST
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) {
        String out = null;
        Gson gson = new Gson();
        Empleado emp = null;
        ControllerEmpleado ce = new ControllerEmpleado();

        try {
            emp = gson.fromJson(datosEmpleado, Empleado.class);
            if (emp.getIdEmpleado() == 0) {
                ce.insert(emp);
            } else {
                ce.update(emp);
            }
            out = gson.toJson(emp);

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
    public Response delete(@FormParam("datosEmpleado")@DefaultValue("") String datosEmpleado)
    {
        String out = null;
        Gson gson = new Gson();
        Empleado emp = null;
        ControllerEmpleado cs = new ControllerEmpleado();
        try
        {
            emp = gson.fromJson(datosEmpleado, Empleado.class);
            cs.delete(emp);
            out = gson.toJson(emp);
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
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControllerEmpleado ce = null;
        List<Empleado> empleados = null;
        try {
            ce = new ControllerEmpleado();
            empleados = ce.getAll(filtro);
            out = new Gson().toJson(empleados);
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
        ControllerEmpleado ce = null;
        List<Empleado> empleados = null;
        try
        {
            ce = new ControllerEmpleado();
            empleados = ce.search(filtro);
            out = new Gson().toJson(empleados);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            out = "{\"exception\":\"Error interno del servidor.\"}";
            
        }
        return Response.status(Response.Status.OK).entity(out).build();
        
    }
    
    @GET
    @Path("verificarLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verificar(@QueryParam("nombreUsuario") @DefaultValue("") String nombreUsuario,
            @QueryParam("contrasenia") @DefaultValue("") String contrasenia) throws Exception {
        String out = null;
        ControllerAcceso controllera = new ControllerAcceso();
        Usuario u = new Usuario();
        u.setNombre(nombreUsuario);
        u.setContrasenia(contrasenia);
       out = contrasenia;
        
            Empleado e = controllera.acceder(u);
            if (e != null) {
                e.getUsuario().setLastToken();
                controllera.guardarToken(e);
                out = new Gson().toJson(e);
            }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("out")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response logOut(@FormParam("empleado") @DefaultValue("") String e) throws SQLException {
        String out = null;
        Empleado empleado = null;
        ControllerAcceso ca = null;
        Gson gson = new Gson();

            
            empleado = gson.fromJson(e, Empleado.class);
            ca = new ControllerAcceso();
            if (ca.eliminarToken(empleado)){
            out = "{\"ok\":\"ok\"}";
            
            } else {
            out = "{\"error\">\"Eliminacion de token no realizada\"}";
            }
        /*catch (JsonParseException jpe){
            out = "{\"error\"😕"Formato de datos no valido\"}";
            jpe.printStackTrace();
        } catch (Exception ex){
            out = "{\"error\"😕"Acceso no concedido\"}"; 
            ex.printStackTrace();
        } */
        return Response.status(Response.Status.OK).entity(out).build();
    
}
}
