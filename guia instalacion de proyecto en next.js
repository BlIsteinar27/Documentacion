1) npx create-next-app . // probar con npm run dev
2) npm install bootstrap@5.3.3
3) crear las carpetas components y libs dentro de src
    
    limpiar globals.css y page.modules.css
    actualizar src/app/layout.js "en por es",  "title"
    limpiar page.js con rafce "hola mundo"

    configurar el css bootstrap
    -- agregar en el archivo src/layout.jsx antes de import "./globals.css";
    -- import 'bootstrap/dist/css/bootstrap.min.css';
        listo el css de bootstrap
        congigurar fondo y text en el src/app/layout.js
            <body className={`bg-dark text-white-50 ${inter.className}`}>{children}</body>
    
    configurar el js de bootstrap
    -- crear BootstrapClient.jsx dentro de la carpeta components con este codigo
            
            "use client"
            import { useEffect } from "react"
            function BootstrapClient() {
                useEffect(() => {
                    require('bootstrap/dist/js/bootstrap.bundle.min.js')
                }, [])
                return null
            }
            export default BootstrapClient

    --- importar el componente dentro de src/layout.jsx antes de export const metadata = {
            import BootstrapClient from "../components/BootstrapClient";

    --- agregar en el layout.jsx antes del </body>
            <BootstrapClient/>

---------------------------------------------------------------------------

4) crear los componentes Header.jsx y Footer.jsx con el contenido base de bootstrap
    agregar el Header y el Footer
    <body className={`bg-dark text-white-50 ${inter.className}`}>
        <Header />
          {children}
        <Footer />
        <BootstrapClient/>
      </body>

------------------------------


FRONTEND

5) crear las carpetas del frontend segun el proyecto dentro de src/app
en este primer ejemplo se creara un sistema de gestion de TODO o Tareas
    -- Inicio : Donde se mostraran todos las tareas en un card
                y se podran Editar, Cambiar el estatus a Completado y Eliminar las tareas
    -- Crear : Para crerar las nuevas tareas desde un formulario
    -- realizadas : Para filtrar las tareas realizadas
    -- porrealizar : Para filtrar las tareas por realizar
    -- Habilidades : Una pagina estatica para describir lo aprendido

   
    dentro de las carpetas agregar las paginas  page.jsx ejemplo
           
            const page = () => {
                return (
                    <h3 className="text-center py-4">Inicio</h3>
                )
            }
            export default page
6) crear la navegacion
    en el componente Header.jsx crear las rutas en los href 
       href="/inicio"
7) crear el redirect en page.jsx 
            import React from 'react'
            import { redirect } from 'next/navigation'
            const page = () => {
                return (
                    redirect('/inicio')
                )
            }
            export default page


8) instalar driver de base de datos
    npm i serverless-mysql
    en la carpeta src/libs crear el pool de conexion 

    mysql.js

    import mysql from "serverless-mysql";
    export const pool = mysql({
        config: {
            host: 'localhost',
            user: 'root',
            password: '',
            port:3306,
            database: 'todo'
        }
    })

9) crear la logica y el render para mostrar las tareas en un card en inicio, realizadas y por realizar
   trabajar con Cardbase y Card para explicar el uso de "use client"

-----------------------------------------------
BACKEND
-----------------------------------------------
crear los endpoint
dentro de src/app crear una carpeta llamada api
dentro de api crear la carpeta todo con la siguiente estructura

src/app/api/todo
    dentro un archivo base llamado route.jsx
    tambien crear una carpeta [id] y dentro la pagina route.jsx
    







