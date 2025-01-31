import { Inicio } from "./views/Inicio.jsx";
import { ContextProviderChat } from "./Context/ContextProviders.jsx";
import { UploadFiles } from "./views/UploadFiles.jsx";
import { Switch, Route, Router } from "wouter";

function App() {
  return (
    <>
      <Router>
        <Switch>

          <Route path="/">
            <ContextProviderChat>
              <Inicio />
            </ContextProviderChat>
          </Route>

          <Route path="/upload" component={UploadFiles} />
        </Switch>
      </Router>
    </>
  )
}

export default App