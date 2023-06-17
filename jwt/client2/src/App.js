import logo from "./logo.svg";
import "./App.css";
import { UserList } from "./components/UserList";
import { AppRouters } from "./components/Routers";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="display-6 text-center">Authentication With JWT</h1>
      <hr></hr>
      <AppRouters />
    </div>
  );
}

export default App;
