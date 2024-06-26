import logo from "./logo.svg";
import "./App.css";
import User from "./user";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Posts</h1>
        </header>

        <main>
          <User />
        </main>
      </div>
    </>
  );
}

export default App;
