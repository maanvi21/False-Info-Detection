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
        // news in frontend is gettting sent as text to backend
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
      console.log("Received data:", data);
      
      if (data.results) {
        // Parse CSV data
        const parsedData = parseCSV(data.results);
        console.log("Parsed data:", parsedData);
        setTopMatches(parsedData);
      } else {
        console.error("No results in data:", data);
        alert("No match results returned");
      }
    } catch (error) {
      console.error("Error fetching top matches:", error);
      alert("Failed to fetch top matches: " + error.message);
    }
  }

  // Simple CSV parser
  const parseCSV = (csvString) => {
    const lines = csvString.split('\n');
    const headers = lines[0].split(',');
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',');
      const entry = {};
      
      for (let j = 0; j < headers.length; j++) {
        let value = values[j] || '';
        
        // Handle quoted values
        if (value.startsWith('"') && !value.endsWith('"')) {
          let k = j;
          while (k < values.length && !values[k].endsWith('"')) {
            k++;
          }
          if (k > j) {
            value = values.slice(j, k + 1).join(',');
            j = k;
          }
        }
        
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        
        entry[headers[j].trim()] = value;
      }
      
      result.push(entry);
    }
    
    return result;
  }

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
        
        {/* Display top matches */}
        {topMatches.length > 0 && (
          <div className="top-matches">
            <h3>Top 3 Similar News Items:</h3>
            {topMatches.map((match, index) => (
              <div key={index} className="match-item">
                <h4>Match #{index + 1}</h4>
                <p>{match.Original_Text}</p>
                <p className="match-score">Similarity Score: {parseFloat(match.Final_Score).toFixed(4)}</p>
              </div>
            ))}
          </div>
        )}
        
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