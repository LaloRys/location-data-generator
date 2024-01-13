"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";

// Interfaz para el tipo de resultFile
interface ResultFile {
  new_filename: string;
  original_filename: string;
  file_path: string;
}
interface File {}

function ElevationGoogle() {
  const [file, setFile] = React.useState<any>();
  const [apiKey, setapiKey] = useState("");
  const [resultFile, setResultFile] = React.useState<ResultFile | null>(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    console.log(file);
  };
  const handleApiKeyChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setapiKey(e.target.value);
  };

  const url = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

  const handleSaludar = async () => {
  
    try {
      console.log(process.env.API_LOCAL)
      console.log(process.env.NEXT_PUBLIC_API_LOCAL)
      console.log("URL", url)
      const response = await axios.get(`${url}`)
      console.log(response)
    } catch (error) {
      console.error("Error al saludar:", error);
    }
  }

  const handleUpload = async () => {
    if (file && apiKey) {
      const formData = new FormData();
      formData.append("api_key", apiKey);
      formData.append("file", file);

      try {
        // Utilizando axios para hacer la petición POST
        const response = await axios.post(
          `${url}/uploadfile/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const result = response.data as ResultFile;
        console.log(result);
        setResultFile(result);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file or API key provided");
      alert("No file or API key provided");
    }
  };

  const handleDownload = () => {
    if (resultFile && resultFile.file_path) {
      const downloadUrl = `${url}/download/${resultFile.file_path}`;
  
      // Crear un enlace temporal y hacer clic en él para iniciar la descarga
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = resultFile.file_path;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <Input type="file" className="w-1/2" onChange={handleFileChange} />
      <Input
        placeholder="Api Key"
        className="w-1/4"
        onChange={handleApiKeyChange}
      />
      <Button onClick={handleUpload} color="primary">
        Upload and Process
      </Button>
      <Button onClick={handleSaludar} color="primary">
        Saludar
      </Button>
      {resultFile && (
        <div>
          <p>Processed File:</p>
          <p>Original Filename: {file?.name ?? "Sin nombre"}</p>
          <p>New Filename: {resultFile?.file_path}</p>
          <Button onClick={handleDownload} color="secondary">Download Processed File</Button>
        </div>
      )}
    </div>
  );
}

export default ElevationGoogle;
