import type { Aplicacion, Empresa, NextAuthOptions, Rol } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Dave"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "nextauth"
                }
            },
            async authorize(credentials) {

                const body = {
                    "user": credentials?.username,
                    "password": credentials!.password
                }      

                const res = await fetch(`${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api/auth/login` , {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" }
                })

                const { usuario: { uid, usuario, nombre, correo, rol, aplicacion, empresa, estado }, token } = await res.json()

                if(usuario){
                    return {
                        id:         uid,
                        usuario:    usuario,
                        nombre:     nombre,
                        correo:     correo,
                        estado:     estado,
                        token:       token,
                        rol:        {
                            _id:            rol._id,
                            nombre:         rol.nombre,
                            descripcion:    rol.descripcion,
                            estado:         rol.estado,
                        },
                        aplicacion:        {
                            _id:            aplicacion._id,
                            nombre:         aplicacion.nombre,
                            descripcion:    aplicacion.descripcion,
                            estado:         aplicacion.estado,
                        },
                        empresa:        {
                            _id:                empresa._id,
                            nombre_comercial:   empresa.nombre_comercial,
                            razon_social:       empresa.razon_social,
                            ruc:                empresa.ruc,
                            estado:             empresa.estado,
                        }                                                
                    }
                }else{
                    return null;
                    //throw new Error( JSON.stringify({ errors: data, status: false }))
                  }
            }
        })
    ], 
    pages: {
        signIn: '/auth',
        error: '/auth/error',
    },
    jwt: {
        // secret: process.env.JWT_SECRET_SEED, // deprecated
    },
    session: {
        maxAge: 2592000,//30d
        strategy: 'jwt',
        updateAge: 86400//cada dia
    },
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = String(token.id)
            session.user.usuario = String(token.usuario)
            session.user.nombre = String(token.nombre)
            session.user.correo = String(token.correo)
            session.user.estado = Boolean(token.estado)
            session.user.rol = token.rol as Rol
            session.user.aplicacion = token.aplicacion as Aplicacion
            session.user.empresa = token.empresa as Empresa
            session.user.token = String(token.token)
            return session 
        },
        async jwt({ token, account, user }) {
            if ( account ) {
              token.id = user.id;
              token.usuario = user.usuario;
              token.nombre = user.nombre;
              token.correo = user.correo;
              token.estado = user.estado;
              token.token = user.token;
              token.rol = user.rol;
              token.aplicacion = user.aplicacion;
              token.empresa = user.empresa;
            }
            return token;
          },        
    }
    
}

export default NextAuth(options)