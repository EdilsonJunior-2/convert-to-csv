import "./App.css";
import { useState, useEffect } from "react";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
import { CSVLink } from "react-csv";

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [initialData, setInitialData] = useState(null);
  const [currentSheet, setCurrentSheet] = useState([]);

  const handleUpload = (event) => {
    const newFile = event.target.files[0];
    //read excel file
    console.log(newFile);
    setFileName(newFile.name);
    readFile(newFile)
      .then((readedData) => setInitialData(readedData))

      .catch((error) => console.error(error));
  };

  const save = () => {
    const result = generateObjects(currentSheet);
    setFile(result);
    //save array of objects to backend
  };

  useEffect(() => {
    if (file) {
      document.getElementById("csv-button").click();
    }
  }, [file]);

  return (
    <div className="container">
      <label for="file-input">Carregar arquivo .xlsx</label>
      <input
        id="file-input"
        type="file"
        accept=".xlsx"
        onChange={handleUpload}
      />
      {fileName && (
        <>
          <span>Nome do arquivo: {fileName}</span>
          <ReactExcel
            initialData={initialData}
            onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
            activeSheetClassName="active-sheet"
            reactExcelClassName="react-excel"
          />

          <button onClick={save}>Download</button>
          {file && (
            <div className="csv-button">
              <CSVLink data={file} id="csv-button">
                Download
              </CSVLink>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
