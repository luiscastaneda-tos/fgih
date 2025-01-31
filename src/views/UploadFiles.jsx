/* eslint-disable react/prop-types */
import { Header } from "../Containers/Header.jsx";
import { useState } from "react";
import * as XLSX from "xlsx"

const passwordLoggin = "1234567890"
const URL = "https://noktos-chatbot.uc.r.appspot.com/upload"

const sendData = async (data, callback) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    callback(json)
  } catch (error) {
    alert(error)
  }
}

export function UploadFiles() {
  const [loggin, setLoggin] = useState(false)
  const [password, setPassword] = useState("")
  const [file, setFile] = useState([])
  const [message, setMessage] = useState("")
  const [feedback, setFeedback] = useState([])

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

  const handleFileUpload = (e) => {
    const fileInput = e.target.files[0];
    if (!fileInput) return;

    const reader = new FileReader();

    reader.onload = (ev) => {
      const text = new TextDecoder("utf-8").decode(new Uint8Array(ev.target.result));
      const workbook = XLSX.read(text, { type: "string" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
      setFile(jsonData);
    };

    reader.readAsArrayBuffer(fileInput);
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()

    const data_file_filter = file.filter((item) => !!item.NoEmpleado == true && item.NoEmpleado != "N/A")
    data_file_filter.sort((a, b) => a.NoEmpleado - b.NoEmpleado)
    const data = data_file_filter.filter((item, index) => item.NoEmpleado != data_file_filter[index + 1]?.NoEmpleado)
    const not_null = data.map(element => {
      if (!isNaN(element.user_id)) {
        return element
      } else {
        return { ...element, user_id: null }
      }
    })

    sendData(not_null, (json) => {
      console.log(json)
    })

    const duplicados = data_file_filter.filter((item, index) => item.NoEmpleado == data_file_filter[index + 1]?.NoEmpleado)
    const noData = file.filter((item) => !!item.NoEmpleado == false || item.NoEmpleado == "N/A")
    let updateFeedback = duplicados.map((item) => { return { ...item, feedback: "Este empleado ya existe (duplicado)" } })
    updateFeedback = [...updateFeedback, ...noData.map((item) => { return { ...item, feedback: "No tiene numero de empleado" } })]
    setFeedback(updateFeedback)
  }

  return (
    <main className="upload">
      <Header></Header>

      {!loggin && <LogginUser handleSubmit={handleSubmitPassword} handleOnChange={handleOnChangePassword} message={message} password={password} />}

      {loggin && <UploadUser handleFile={handleFileUpload} handleSubmit={handleSubmitFile} />}

      {feedback.length > 0 && <Feedback feedback={feedback} />}

    </main>
  )
}

const Feedback = ({ feedback }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>NoEmpleado</th>
          <th>Nombre</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.NoEmpleado}</td>
              <td>{item.Workers}</td>
              <td>{item.feedback}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const LogginUser = ({ password, handleOnChange, handleSubmit, message }) => {
  return (
    <section>
      <h2>Ingresa la contraseña para poder continuar</h2>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={handleOnChange} placeholder="Ingresa tu contraseña..." />
        <input type="submit" value="Confirmar" />
      </form>
    </section>
  )
}

const UploadUser = ({ handleFile, handleSubmit }) => {
  return (
    <section>
      <h2>Sube el archivo y actualiza los datos en la base</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" id="file-upload" onChange={handleFile} />
        <input type="submit" value="Actualizar archivos" />
      </form>
    </section>
  )
}