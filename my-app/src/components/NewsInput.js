import React, { useState, useEffect } from 'react';
import './NewsInput.css';
import Button from './Button';

export default function NewsInput() {
  const [news, setNews] = useState("");
  const [response, setResponse] = useState(null);
  const [topMatches, setTopMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const onNewsInput = (e) => {
    setNews(e.target.value);
    console.log(e.target.value);
  }

  // post text
  const postNews = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/get-student-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: news }),
        // news in frontend is getting sent as text to backend
      });
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        // Successfully posted news, now fetch the top matches
        fetchTopMatches();
      }
    } catch (error) {
      console.error("Error posting news:", error);
      alert("Failed to process the news");
    } finally {
      setLoading(false);
    }
  }

  const fetchTopMatches = async () => {
    try {
      console.log("Fetching top matches...");
      const response = await fetch("http://localhost:5000/get-top-matches");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Raw data received:", data);

      // Check if data exists first
      if (!data) {
        throw new Error("No data received from server");
      }

      // Convert to string if it's not already a string
      let csvString = data.results;
      if (typeof csvString !== 'string') {
        csvString = JSON.stringify(data.results);
        console.log("Converted non-string data to string:", csvString);
      }

      // Additional check to make sure we have valid data
      if (!csvString || csvString.trim().length === 0) {
        throw new Error("Empty or invalid CSV data received");
      }

      const parsedData = parseCSV(csvString);
      console.log("Parsed data:", parsedData);
      
      if (parsedData.length > 0) {
        setTopMatches(parsedData);
      } else {
        console.warn("No matches found in the parsed data");
      }
    } catch (error) {
      console.error("Error fetching top matches:", error);
      alert("Failed to fetch top matches: " + error.message);
    }
  }

  const parseCSV = (csvString) => {
    try {
      // Split by newline to get rows
      const rows = csvString.split('\n').filter(row => row.trim().length > 0);
      console.log("Raw rows:", rows);
      
      if (rows.length < 2) {
        console.warn("Not enough rows in CSV data");
        return [];
      }
      
      // Extract header row
      const headers = rows[0].split(',').map(h => h.trim());
      console.log("Headers:", headers);
      
      const results = [];
      
      // Process each data row
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        
        // Handle quoted strings with commas inside them
        const values = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let j = 0; j < row.length; j++) {
          const char = row[j];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue);
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        
        // Don't forget to add the last value
        values.push(currentValue);
        
        // Create object from header and values
        const rowObj = {};
        headers.forEach((header, index) => {
          // Remove surrounding quotes if present
          let value = values[index] || '';
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          }
          rowObj[header] = value.trim();
        });
        
        results.push(rowObj);
      }
      
      console.log("Parsed results:", results);
      return results;
    } catch (error) {
      console.error("Error parsing CSV:", error);
      return [];
    }
  };

  return (
    <div>
      <div className="card news-card">
        <h2 className="news-header">Check Your News Here:</h2>
        <div className="news-content">
          <label>NEWS:</label>
          <input
            type="text"
            placeholder="TYPE YOUR INPUT HERE..."
            className="news-input"
            onChange={onNewsInput}
          />
          <Button text={loading ? "CHECKING..." : "CHECK"} onClick={postNews} disabled={loading} />
        </div>
        
        {topMatches
  .filter(match => match.Original_Text && match.Original_Text.trim().length > 0)
  .map((match, index) => (
    <div key={index} className="match-item">
      <h4>Match #{index + 1}</h4>
      <p>{match.Original_Text}</p>
      <p className="match-score">
        Similarity Score: {match.Final_Score ? match.Final_Score : "N/A"}
      </p>
    </div>
  ))
}
        
        {response && (
          <div className="response">
            <p>Status: {response.status}</p>
            {response.status === "False" && <p>Correct Info: {response.correct_info}</p>}
          </div>
        )}
      </div>
    </div>
  )
}