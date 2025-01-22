import { Inicio } from "./views/Inicio.jsx";
import { UploadFiles } from "./views/UploadFiles.jsx";
import { Prueba } from "./views/prueba/Prueba.jsx";
import { Switch, Route, Router } from "wouter";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Inicio} />
          <Route path="/upload" component={UploadFiles} />
          <Route path="/extra" component={Prueba} />
        </Switch>
      </Router>
    </>
  )
}

export default App