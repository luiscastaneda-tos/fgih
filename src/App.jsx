import { Inicio } from "./views/Inicio.jsx";
import { ContextProviderChat } from "./Context/ContextProviders.jsx";
import { UploadFiles } from "./views/UploadFiles.jsx";
import { Switch, Route, Router } from "wouter";
import { DashBoard } from "./views/DashBoard.jsx";

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
               <Route path="/Dashboard">
                  <ContextProviderChat>
                     <DashBoard />
                  </ContextProviderChat>
               </Route>
            </Switch>
         </Router>
      </>
   )
}

export default App