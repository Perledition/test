// Import the main component
/* eslint-disable */
import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { ChartDataContext } from '../countChart/ChartContext';
import { MetaData } from '../metaSidebar/MetaSidebar';

import './PDFViewer.css';

interface Props{
    className: string;
}

function savePdfToLocalStorage(pdfFile: File) {
    sendFileAndSaveResponse(pdfFile);
    const reader = new FileReader();
    reader.onloadend = function () {
      const pdfDataUrl = reader.result;
      console.log("savetopdf", pdfDataUrl);
      localStorage.setItem('pdfDataUrl', `${pdfDataUrl}`);
    };
    reader.readAsDataURL(pdfFile);
  }


async function sendFileAndSaveResponse(file: File) {
  // Show the loading spinner
  const spinner = document.getElementById("spinner");
  const text = document.getElementById("uploadText") as HTMLElement;

  if (spinner != null) {
    spinner.classList.add("displayLoadingSpinner");
    text.style.display = "none";

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async function () {
      const base64Data = reader.result?.toString().split(',')[1];
      // const body = JSON.stringify({ file: `data:${file.type};base64,${base64Data}` });
      const body = JSON.stringify({ file: `data:${file.type};base64,${base64Data}` });
      console.log(body)
      await fetch("https://apps.beam.cloud/q34u4", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate",
          Authorization: "Basic ZjU2NWU4NWU2ZDFjNDhkNTU3NzhmOWJmZGM5YzIwMTE6OTk3NjNhNTlhYzU5N2YxMzBjMzVmYjkxNzkxNDZkNDc=",
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((response) => response.json())
        .then((responseText) => {
          // Save the response to localStorage
          console.log(responseText);
          localStorage.setItem("documentContent", JSON.stringify(responseText));
          spinner.classList.remove("displayLoadingSpinner");
        })
        .catch((error) => {
          console.error("Error:", error);
          text.style.display = "block";
        });
    };
  }
}

export default function PdfUploadView({className}: Props) {
  
    const [pdfFile, setPdfFile] =  useState<string | null>(null);
    const { globalChartData, updateGlobalChartData } = useContext(ChartDataContext );

    useEffect(() => {
        const pdfDataUrl = localStorage.getItem('pdfDataUrl');
        if (pdfDataUrl) {
            setPdfFile(pdfDataUrl);
        } else {
            setPdfFile(null);
        }
      }, []);
    
      const handleDrop = (event: any) => {
        event.preventDefault();
    
        const file = event.dataTransfer.files[0];
    
        if (file.type === 'application/pdf') {
            savePdfToLocalStorage(file);
            setPdfFile(localStorage.getItem('pdfDataUrl'));            
            const newData: MetaData = {
              PER: [{name: "Test", value: 2}, {name: "Test2", value: 0}], 
              LOC: [{name: "Test3", value: 12}, {name: "Test4", value: 10}], 
              ELSE: [{name: "Test5", value: 2}, {name: "Test6", value: 8}]
            };
            updateGlobalChartData(newData);
        } else {
          alert('Please upload a PDF file.');
        }
      };
  
    const handleDragOver = (event: any) => {
      event.preventDefault();
      const zone = document.getElementById("uploadBox");
      zone?.classList.add("highlightBorder");

    };

    const handleDragOverLeave = (event: any) => {
      event.preventDefault();
      const zone = document.getElementById("uploadBox");
      zone?.classList.remove("highlightBorder");
    };

  return (
    <>
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragOverLeave}
      className={className}
    >
      {pdfFile ? (
        <>

        <Box sx={{alignContent: "middle", height: '100vh', width: '100%'}}>
            <embed src={pdfFile} type="application/pdf" width="100%" height="100%" />
        </Box>
        </>
      ): (
        <Box sx={{alignContent: "middle", height: '50%', width: '100%'}}>
          <div id="uploadBox" className="uploadArea">
            <div id="spinner" className="loadingSpinner"></div>
            <h2 id="uploadText">Ziehe eine PDF Datei hier her</h2>
          </div>
        </Box>
      )}
    </div>
    </>
  );
};