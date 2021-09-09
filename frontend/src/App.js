
// import './App.css';
import { Redirect,BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Texteditor from './components/texteditor'; 
import {v4 as uuidV4} from 'uuid'; 
import Video from './components/video';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact >
          {/* here we will provide our own route address */}
          <Redirect to={`/documents/${uuidV4()}`} />
          </Route>
          <Route path="/documents/:id" >
          <div style={{display: 'flex', flexDirection: 'row' }}>
            {/* <div>
            <Texteditor/>
            
            </div> */}
            
            <Video/>
            </div>
          </Route>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
