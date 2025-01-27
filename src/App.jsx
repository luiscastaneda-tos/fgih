import { Inicio } from "./views/Inicio.jsx";
import { UploadFiles } from "./views/UploadFiles.jsx";
import { Switch, Route, Router } from "wouter";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Inicio} />
          <Route path="/upload" component={UploadFiles} />
        </Switch>
      </Router>
    </>
  )
}

export default App