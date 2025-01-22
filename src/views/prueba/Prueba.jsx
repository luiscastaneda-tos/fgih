/* eslint-disable react/prop-types */
import { Drawer } from "../../components/Drawer.jsx";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import "./Prueba.css"

export function Prueba() {
  const [chat, setChats] = useState([])
  const [show, setShow] = useState(false)


  const handleAdd = (input) => {
    if (input == "") return
    setChats([...chat, {
      title: input,
      clases: []
    }])
  }

  const handleAddChats = (index, newObject) => {
    let newChats = chat
    newChats[index].clases.push(newObject)
    console.log(newChats)
    setChats(newChats)
  }

  useEffect(() => {
    console.log(chat)
  }, [chat])

  return (
    <>
      <MainStyled>
        {
          chat.map((element, index) => <Materia key={Math.random() * 123456789} title={element.title} handleAddChats={handleAddChats} index={index} clases={element.clases} />)
        }
        <HandlerStart setShow={setShow} />
      </MainStyled>
      {show &&
        <Drawer onClose={setShow}>
          <FormAdd
            handleAdd={handleAdd}
          />
        </Drawer>
      }
    </>
  )
}

function HandlerStart({ setShow }) {
  return (
    <div className="buttons" >
      <ButtonStyled onClick={() => { setShow(true) }}>Agregar chat</ButtonStyled>
      <ButtonStyled secondary="true">Resetear chat</ButtonStyled>
    </div>
  )
}

function FormAdd({ handleAdd }) {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAdd(input)
    setInput("")
  }

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h3>Ingresa el nombre del chat</h3>
      <InputStyled type="text" name="" id="" placeholder="chat de..." value={input} onChange={(e) => { setInput(e.target.value) }} />
      <ButtonStyled type="submit">Continuar</ButtonStyled>
    </FormStyled>
  )
}

function Materia({ title, clases = [], index, handleAddChats }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <SectionMateriaStyled>
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Asistente</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase, index) => {
              const { profesor, grupo } = clase
              return (
                <tr key={index + profesor + grupo}>
                  <td>{profesor}</td>
                  <td>{grupo}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <ButtonStyled onClick={() => { setShow(true) }} >Agregar asistente</ButtonStyled>
      </SectionMateriaStyled>
      {show &&
        <Drawer onClose={setShow}>
          <FormClass
            index={index}
            handleAddChats={handleAddChats}
          />
        </Drawer>
      }
    </>
  )
}

const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

const generateHours = () => {
  const hours = [];
  const startHour = 7;  // 7 AM
  const endHour = 22;   // 10 PM

  let currentDate = new Date();
  currentDate.setHours(startHour, 0, 0, 0);  // Inicia a las 7 AM

  while (currentDate.getHours() < endHour) {
    const formattedTime = formatTime(currentDate);
    hours.push({ value: currentDate.getTime(), time: formattedTime });
    currentDate.setMinutes(currentDate.getMinutes() + 15); // Incrementa de 15 en 15 minutos
  }
  return hours;
};

const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHour}:${formattedMinutes} ${ampm}`;
};

const horas = generateHours()

function FormClass({ handleAddChats, index }) {
  const [hours,] = useState(horas);
  const [data, setData] = useState({
    profesor: "",
    grupo: ""
  })
  const [selectedTimes, setSelectedTimes] = useState({
    lunes: { inicio: '', final: '' },
    martes: { inicio: '', final: '' },
    miercoles: { inicio: '', final: '' },
    jueves: { inicio: '', final: '' },
    viernes: { inicio: '', final: '' }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddChats(index, { ...data, selectedTimes })
  }

  const handleTimeChange = (day, type, value) => {
    setSelectedTimes(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [type]: value
      }
    }));
  };

  const renderTimeOptions = (start) => {
    return hours
      .filter(hour => start ? hour.value >= start : true)  // Filtra las horas que son mayores que la hora de inicio
      .map(({ value, time }) => (
        <option key={value} value={value}>{time}</option>
      ));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  return (
    <FormStyled onSubmit={handleSubmit} >
      <div>
        <label> Maestro: </label>
        <InputStyled type="text" value={data.profesor} onChange={handleDataChange} name="profesor" placeholder="Garcia Juan..." />
      </div>
      <div>
        <label>Grupo:</label>
        <InputStyled type="number" value={data.grupo} onChange={handleDataChange} name="grupo" placeholder="1356" />
      </div>
      <ContainerStyledSeparated>
        <label>Prioridad:</label>
        <br />
        <SelectStyled name="prioridad">
          <option value="1">Alta</option>
          <option value="2">Media</option>
          <option value="3">Baja</option>
        </SelectStyled>
      </ContainerStyledSeparated>

      {daysOfWeek.map(day => (
        <div key={day}>
          <label>{day}:</label>
          <ContainerStyledSeparated>
            <label>Hora en que comienza:</label>
            <SelectStyled
              name={`inicio_${day.toLowerCase()}_horas`}
              value={selectedTimes[day.toLowerCase()].inicio}
              onChange={(e) => handleTimeChange(day.toLowerCase(), 'inicio', e.target.value)}
            >
              <option value="">Selecciona la hora de inicio</option>
              {hours.map(({ value, time }) => (
                <option key={value} value={value}>{time}</option>
              ))}
            </SelectStyled>
          </ContainerStyledSeparated>

          <ContainerStyledSeparated>
            <label>Hora en que termina:</label>
            <SelectStyled
              name={`final_${day.toLowerCase()}_horas`}
              value={selectedTimes[day.toLowerCase()].final}
              onChange={(e) => handleTimeChange(day.toLowerCase(), 'final', e.target.value)}
            >
              <option value="">Selecciona la hora de fin</option>
              {renderTimeOptions(selectedTimes[day.toLowerCase()].inicio, day.toLowerCase())}
            </SelectStyled>
          </ContainerStyledSeparated>
        </div>
      ))}

      <ButtonStyled type="submit">Confirmar</ButtonStyled>
    </FormStyled>
  );
}


const MainStyled = styled.main`
  padding: 1rem;
  flex: 1;
  width: 100vw;
  overflow: auto;`

const ButtonStyled = styled.button`
  width: 100%;
  max-width: 300px;
  padding: .5rem;
  border: ${props => (!props.secondary ? "1px solid transparent" : "1px solid var(--purple-500)")};;
  border-radius: 10px;
  background-color: ${props => (!props.secondary ? "var(--blue-500)" : "var(--purple-50)")};
  color: ${props => (!props.secondary ? "var(--blue-50)" : "var(--purple-500)")};;
  font-weight: 500;
  cursor: pointer;
  transition: transform .3s ease;

  &:hover{
    transform: scale(95%);
    background-color: ${props => (!props.secondary ? "var(--blue-600)" : "var(--purple-300)")};;
  }`

const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 1rem;
  `

const ContainerStyledSeparated = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

const InputStyled = styled.input`
  width: 100%;
  max-width: 400px;
  padding: .3rem;
  background-color: #d9d6fe;
  border-radius: 5px;
  border: 1px solid var(--purple-500);`

const SelectStyled = styled.select`
  width: 45%;
  padding: .3rem;
  border-radius: 5px;
  background-color: #d9d6fe;
  border: 1px solid var(--purple-500);`

const SectionMateriaStyled = styled.section`
    max-width: 600px;
  width: 100%;
  background-color: var(--purple-50);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  padding: .5rem;
  color: var(--purple-950);`