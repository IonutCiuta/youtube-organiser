import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store.js'
import YTList from './components/YTList/YTList'
import Details from './components/Details/Details'
import { putVideosAction } from './actions/putVideos.js'

function App() {

  const getVideos = () => {
    fetch('videos.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(jsonData => {
      let idToVideoMap = new Map()
      jsonData.forEach(video => {
        idToVideoMap.set(video.url, video)
      });
      store.dispatch(putVideosAction(idToVideoMap));
    })
  }

  useEffect(() => {
    console.log("useEffect")
    getVideos()
  }, [])

  return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <div style={{position: 'sticky', top: '0', zIndex: '100', background: 'white', width: '100%', textAlign: 'center'}}>
              <h2>Banii in miscare</h2>
            </div>
            <YTList></YTList>
          </div>
        </Provider>

        <Switch>
          <Route path="/details/:id" component={Details}/>
        </Switch>
      </Router>
  );
}

export default App;
