import './App.css';
import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register";
//import IO from "./IO.jsx"

function App() {

  const [authUser , setAuthUser] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <Login authUser={authUser} setAuthUser={setAuthUser}/>
        <Register authUser={authUser} setAuthUser={setAuthUser}/>
      </header>
    </div>
  );
}

export default App;
