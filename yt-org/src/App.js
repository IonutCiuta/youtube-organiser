import { useState, useEffect } from 'react';
import './App.css';
import YTVideo from './components/YTVideo/YTVideo'

function App() {
  const [videos, setVideos] = useState([])

  const getVideos = () => {
    fetch('videos.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      console.log(response)
      return response.json();
    }).then(jsonData => {
      console.log(jsonData)
      setVideos(jsonData);
    })
  }

  useEffect(() => {
    console.log("useEffect")
    getVideos()
  }, [])

  return (
    <div className="App">
      {
        videos
        && videos.length > 0
        && videos.map(v => <YTVideo content={v} key={v.url}></YTVideo>)
      }
    </div>
  );
}

export default App;
