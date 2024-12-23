import { Main } from "./components/Main/Main.jsx";
import { UploadFiles } from "./views/upload_files/UploadFiles.jsx";
import { Prueba } from "./views/prueba/Prueba.jsx";
import { Switch, Route } from "wouter";

function App() {
    return (
        <>
            <Switch>
                <Route path="/" component={Main} />
                <Route path="/upload" component={UploadFiles} />
                <Route path="/prueba" component={Prueba} />
            </Switch>
        </>
    )
}

export default App