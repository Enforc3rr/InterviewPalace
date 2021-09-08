
// import './App.css';
import { Redirect,BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Texteditor from './components/texteditor'; 
import {v4 as uuidV4} from 'uuid'; 
import {io} from "socket.io-client"
function App() {
  const [socket, useSocket] = useState()
  useEffect(() => { 
    const s= io("http://localhost:3001")
    setSocket(s)
    return () => {
        s.disconnect(); 
    }
}, [])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact >
          {/* here we will provide our own route address */}
          <Redirect to={`/documents/${uuidV4()}`} />
          </Route>
          <Route path="/documents/:id" >
          <Texteditor/>
          </Route>
        </Switch>
      </Router>
  
    </div>
  );
}

export default App;
