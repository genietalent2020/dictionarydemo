  
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import WordList from "./components/wordlist";
import EditWord from "./components/edit-word.component";
import CreateWord from "./components/create-word";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={WordList} />
      <Route path="/edit/:id" component={EditWord} />
      <Route path="/create" component={CreateWord} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;