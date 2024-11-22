"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";

import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

export default function CSVupload() {
  const [csvData, setCsvData] = useState([]);
  const [hasHeaders, setHasHeaders] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [userLabels, setUserLabels] = useState({});
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = true; // Simulating an authentication check
    if (!isAuthenticated) {
      setError("Authentication failed. Please log in to continue.");
    }
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("No file selected. Please upload a valid CSV file.");
      return;
    }

    if (file.type !== "text/csv") {
      setError("Invalid file type. Please upload a .csv file.");
      return;
    }

    Papa.parse(file, {
      header: false,
      complete: (result) => {
        if (!result.data.length || result.data[0].length === 0) {
          setError("The uploaded CSV file is empty or invalid.");
          setCsvData([]);
          return;
        }
        setError(""); // Clear any existing error
        setCsvData(result.data);
      },
      error: (err) => {
        setError("Failed to parse CSV file. Please upload a valid file.");
        console.error("Parsing error:", err);
      },
    });
  };

  const handleHeaderOption = (option) => {
    setHasHeaders(option);
    setSelectedRow(null);
  };

  const handleRowSelection = (rowIndex) => {
    setSelectedRow(hasHeaders ? csvData[rowIndex + 1] : csvData[rowIndex]);
  };

  const handleLabelChange = (columnIndex, value) => {
    setUserLabels((prev) => ({
      ...prev,
      [columnIndex]: value,
    }));
  };

  const handleDone = () => {
    if (!csvData.length || !selectedRow) {
      setError("No row selected. Please select a row to continue.");
      return;
    }
    const missingLabels = selectedRow.some((_, index) => !userLabels[index]);
    if (missingLabels) {
      setError("Please provide labels for all columns.");
      return;
    }

    const output = {};
    selectedRow.forEach((_, index) => {
      const columnKey = hasHeaders
        ? csvData[0][index]
        : String.fromCharCode(65 + index); // 'A', 'B', ...
      output[columnKey] = userLabels[index];
    });

    setError(""); // Clear any existing error
    setJsonOutput(output);
  };

  const downloadJsonFile = () => {
    if (!jsonOutput) return;

    const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    setCsvData([]);
    setHasHeaders(null);
    setSelectedRow(null);
    setUserLabels({});
    setJsonOutput(null);
    setError("");
  };

  return (
    <>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          CSV Upload & Data Labeling
        </Typography>

        <Box sx={{ marginBottom: "16px" }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{
              marginBottom: "16px",
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              fontSize: "14px",
            }}
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
            {error !== "Authentication failed. Please log in to continue." && (
              <Button
                onClick={handleRetry}
                color="error"
                sx={{ marginLeft: "16px" }}
              >
                Retry
              </Button>
            )}
          </Alert>
        )}

        {csvData.length > 0 && hasHeaders === null && !error && (
          <Box>
            <Typography>
              Does your file have headers in the first row?
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleHeaderOption(true)}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleHeaderOption(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        )}

        {hasHeaders !== null && !selectedRow && (
          <Box>
            <Typography>Select a row:</Typography>
            <ul style={{ padding: "0", listStyle: "none", margin: "16px 0" }}>
              {csvData.slice(hasHeaders ? 1 : 0).map((row, index) => (
                <li
                  key={index}
                  style={{
                    cursor: "pointer",
                    padding: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "8px",
                  }}
                  onClick={() => handleRowSelection(index)}
                >
                  {row.join(", ")}
                </li>
              ))}
            </ul>
          </Box>
        )}

        {selectedRow && (
          <Box sx={{ paddingBottom: "150px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Column</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRow.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {hasHeaders
                          ? csvData[0][index]
                          : String.fromCharCode(65 + index)}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={userLabels[index] || ""}
                          onChange={(e) =>
                            handleLabelChange(index, e.target.value)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: "16px" }}
              onClick={handleDone}
            >
              Generate JSON
            </Button>
          </Box>
        )}

        {jsonOutput && (
          <Box sx={{ marginTop: "16px", paddingBottom: "100px" }}>
            <Typography variant="h6">Generated JSON:</Typography>
            <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
            <Button
              variant="contained"
              color="info"
              sx={{ marginTop: "16px" }}
              onClick={downloadJsonFile}
            >
              Download JSON
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

// update success