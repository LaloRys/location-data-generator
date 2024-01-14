"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Spinner,
} from "@nextui-org/react";
import ModalOpenCage from "@/components/ModalOpenCage";
import { CheckIcon } from "@/components/icons/icons";

// Interfaz para el tipo de resultFile
interface ResultFile {
  new_filename: string;
  original_filename: string;
  file_path: string;
}
interface File {}

function OpenCage() {
  const [file, setFile] = React.useState<any>();
  const [apiKey, setapiKey] = useState("");
  const [resultFile, setResultFile] = React.useState<ResultFile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event?.target?.files[0]);
    console.log(file);
  };

  const handleApiKeyChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setapiKey(e.target.value);
  };

  const url = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  const handleSaludar = async () => {
    try {
      console.log(process.env.API_LOCAL);
      console.log(process.env.NEXT_PUBLIC_API_LOCAL);
      console.log("URL", url);
      const response = await axios.get(`${url}`);
      console.log(response);
    } catch (error) {
      console.error("Error al saludar:", error);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (file && apiKey) {
      const formData = new FormData();
      formData.append("api_key", apiKey);
      formData.append("file", file);

      try {
        // Utilizando axios para hacer la petición POST
        const response = await axios.post(`${url}/opencage/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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
    setLoading(false);
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
    <div className="flex items-center justify-center">
      <Card className="py-4 m-4">
        <CardHeader className="grid grid-cols-1 items-center">
          <div className="flex flex-col items-center justify-center">
            <ModalOpenCage />
          </div>
        </CardHeader>
        <Divider className="my-4" />

        <CardBody className="overflow-visible py-2">
          <div className="flex items-center justify-around py-2 gap-2">
            <div>
              <input type="file" onChange={handleFileChange} />
              <Chip variant="light" color="primary" className="mt-1">
                File: {file?.name ?? "No file selected"}
              </Chip>
            </div>
            <Input
              label="Api Key"
              variant="bordered"
              onChange={handleApiKeyChange}
            />
          </div>
          <Divider className="my-4" />

          {loading ? (
            <Spinner
              label="Processing..."
              color="primary"
              labelColor="primary"
            />
          ) : (
            <Button onClick={handleUpload} color="primary">
              Upload and Process
            </Button>
          )}
          <Divider className="my-4" />

          {resultFile && (
            <div className="grid grid-cols-1 gap-2">
              <Chip
                startContent={<CheckIcon size={18} />}
                variant="flat"
                color="success"
              >
                Processed File
              </Chip>
              <Chip color="warning" variant="dot">Original Filename: {file?.name ?? "Sin nombre"}</Chip>
              <Chip color="success" variant="dot">New Filename: {resultFile?.file_path}</Chip>
              <Button onClick={handleDownload} color="secondary">
                Download Processed File
              </Button>
            </div>
          )}
          <Divider className="my-4" />
          <Button onClick={handleSaludar} color="primary">
            Saludar
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default OpenCage;
