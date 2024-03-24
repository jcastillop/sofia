"use client"
import { FC, useState } from "react"
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

export const ImageUpload: FC = () => {

    const [imageUrl, setImageUrl] = useState<string>('')
    
    return(
        <div>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                // console.log("Files: ", res);
                //     alert("Upload Completed");
                    setImageUrl(res[0].url)
                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}
                content={{
                    button({ ready }) {
                      if (ready) return <div>Cargar imagen</div>;
                 
                      return "Getting ready...";
                    },
                    allowedContent({ ready, fileTypes, isUploading }) {
                      if (!ready) return "Checking what you allow";
                      if (isUploading) return "Cargando..";
                      return `tipo: ${fileTypes.join(", ")}`;
                    },
                  }}
            />
            { 
                imageUrl.length
                ?<div><Image  src={imageUrl} alt='Producto' width={500} height={300}/></div>
                :null 
            }
        </div>    
    )
}