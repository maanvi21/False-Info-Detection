import React from 'react'
import './NewsInput.css';
import { useState, useEffect } from 'react';
import Button from './Button';
export default function NewsInput() {
    const [news, setNews] = useState("");
    const [response, setResponse] = useState(null);
//  fetch from dataset and compare
    useEffect(() => {
    }, [news]);
    const onNewsInput = (e) => {
    setNews(e.target.value);
    console.log(e.target.value);
    }
// post text
const postNews = async () => {
    const response=await fetch("http://localhost:5000/get-student-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: news }),
    });
    const data = await response.json();

    if (data.error) {
        alert(data.error);
        }
        else {
            alert(data.message);
        }

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
              <Button text="CHECK" onClick={postNews} />
                      </div>
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
