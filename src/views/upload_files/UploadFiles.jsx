import { useState } from "react";
import "./UploadFiles.css";
import { Link } from "wouter";
import * as XLSX from "xlsx"

const passwordLoggin = "123456789000"

export function UploadFiles() {
    const [loggin, setLoggin] = useState(false)
    const [password, setPassword] = useState("")
    const [file, setFile] = useState([])
    const [message, setMessage] = useState("")

    const handleOnChangePassword = (e) => setPassword(e.target.value)

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        if (password == passwordLoggin) {
            setMessage("")
            setLoggin(true)
        } else {
            setMessage("Ups, ocurrio un error ¿Seguro que escribiste bien la contraseña?")
        }
    }

    const handleFileUpload = (e) =>{
        const fileInput = e.target.files[0]
        if(!fileInput) return
        const reader = new FileReader();

        reader.onload = (ev) => {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {type:"binary"});
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setFile(jsonData)
        }

        reader.readAsBinaryString(fileInput)
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        console.log(file)
    }

    return (
        <main className="upload">
            <nav>
                <Link href="/nav" >
                    <img className="logo_main" src="https://www.app.noktos.com/img/noktos_logo.svg" />
                </Link>
            </nav>

            {
                !loggin &&
                <section>
                    <h2>Ingresa la contraseña para poder continuar</h2>
                    <p>{message}</p>
                    <form onSubmit={handleSubmitPassword}>
                        <input type="password" value={password} onChange={handleOnChangePassword} placeholder="Ingresa tu contraseña..." />
                        <input type="submit" value="Confirmar" />
                    </form>
                </section>
            }

            {
                loggin &&
                <section>
                    <h2>Sube el archivo y actualiza los datos en la base</h2>
                    <form onSubmit={handleSubmitFile}>
                        <input type="file" id="file-upload" onChange={handleFileUpload} />
                        <input type="submit" value="Actualizar archivos" />
                    </form>
                </section>
            }

        </main>
    )
}