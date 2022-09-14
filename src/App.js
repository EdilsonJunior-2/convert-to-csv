import "./App.css";
import { useState, useEffect } from "react";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
import { CSVLink } from "react-csv";

function App() {
  const [file, setFile] = useState();
  const [initialData, setInitialData] = useState(null);
  const [currentSheet, setCurrentSheet] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
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
    <div className="App">
      <input type="file" accept=".xlsx" onChange={handleUpload} />
      <ReactExcel
        initialData={initialData}
        onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
        activeSheetClassName="active-sheet"
        reactExcelClassName="react-excel"
      />

      <button onClick={save}>Download</button>
      {file && (
        <CSVLink style={{ display: "hidden" }} data={file} id="csv-button">
          Download
        </CSVLink>
      )}
    </div>
  );
}

export default App;
