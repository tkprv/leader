import { BrowserRouter as Router ,Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import Leader from './component/leader';
import TreeDemo from './page/slidebar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
          <Switch>  
          <Route exact path="/tapbar" render={(props) => (<TreeDemo/> )}></Route>
              <Route path="/tapbar/leader" render={(props) => (<Leader/>)}></Route>
              <Redirect to={{pathname: '/tapbar'}}/>
          </Switch>
      </Router>
  );
}

export default App;
