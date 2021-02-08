import './App.css';
import Home from './components/Home/Home'
import Details from './components/Details/Details'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <div style={{position: 'sticky', top: '0', zIndex: '100', background: 'white', width: '100%', textAlign: 'center'}}>
        <h2>Banii in miscare</h2>
      </div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/details/:id" component={Details}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
