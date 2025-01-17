import { Main } from "./components/Main/Main.jsx";
import { UploadFiles } from "./views/upload_files/UploadFiles.jsx";
import { Prueba } from "./views/prueba/Prueba.jsx";
import { BarNav } from "./views/BarNav/BarNav.jsx";
import { Switch, Route, Router } from "wouter";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" component={Main} />
                    <Route path="/upload" component={UploadFiles} />
                    <Route path="/prueba" component={Prueba} />
                    <Route path="/nav" component={BarNav} />
                </Switch>
            </Router>
        </>
    )
}

export default App