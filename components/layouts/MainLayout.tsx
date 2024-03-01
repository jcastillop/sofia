import Head from "next/head"
import { FC, ReactNode } from "react";
import { Alerta, Navbar, SideMenu } from "../ui";

interface Props {
    children?: ReactNode;
    title: string;
    pageDescription : string;
    imageFullUrl?: string;
}
export const MainLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            <meta name="description" content={ pageDescription }/>

            <meta name="og:title" content={ title }/>      
            <meta name="og:description" content={ pageDescription }/>  

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl }/> 
                )
            }    
        </Head>

        <nav>
            <Navbar/>
        </nav>

        <SideMenu />
        
        <Alerta/>

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>
            { children }
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: Footer */}
        </footer>
    </>
  )
}
