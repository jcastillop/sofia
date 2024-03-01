import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as
     * a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: User;
    }
  
    interface User {
        id: string;
        usuario?: string;
        nombre?: string;
        correo?: string;
        estado?: boolean;
        token?: string;
        rol?: Rol;
        aplicacion?: Aplicacion;
        empresa?: Empresa;
    }

    interface Rol {
      _id: string;
      nombre: string;
      descripcion: string;
      estado: boolean;
    }

    interface Aplicacion {
      _id: string;
      nombre: string;
      descripcion: string;
      estado: boolean;
    }    

    interface Empresa {
      _id: string;
      nombre_comercial: string;
      razon_social: string;
      ruc: string;
      estado: boolean;
    }        
  }