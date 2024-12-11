export function UseComponents(message) {
    const list = getCode(message.split("\n"))
    const lista_check = list.map((element, index, array) => {
        if (element.slice(0, 5).includes("#")) {
            return Title(element)
        }
        if (element.slice(0, 5).includes("-") && !element.slice(0, 5).includes("|")) {
            return UnorderList(element, index, array)
        }
        if (element.slice(0, 5).includes("|")) {
            return Table(element, index, array)
        }
        if (element.slice(0, 5).includes("[[")) {
            return link(element)
        }
        if (element.slice(0, 5).includes("```")) {
            return Code(element)
        }
        if (element == "") {
            return <></>
        }
        else {
            return <p key={Math.random() * 123456789}>{handleBoldText(element)}</p>
        }
    })

    return (lista_check)
}

function getCode(list) {
    let code = []
    let indices = []
    let estado = "q0"

    for (let index = 0; index < list.length; index++) {
        const row = list[index];
        switch (estado) {
            case "q0":
                if (row.slice(0, 5).includes("```")) {
                    code.push(row)
                    indices.push(index)
                    estado = "q1"
                }
                break;
            case "q1":
                code.push(row)
                indices.push(index)
                if (row.slice(0, 5).includes("```")) {
                    estado = "q2"
                }
                break;
            case "q2":
                //Estado de finalizacion
                break;
            default:
                break;
        }
    }
    let resultados = list.map((row, index) => {
        if (index == indices[0]) {
            return code.join("\n")
        } else if (indices.includes(index)) {
            return []
        } else {
            return row
        }
    })
    return resultados.flat()
}

function Code(element) {

    return (
        <code>
            {
                element.split("\n").slice(1, -1).map(
                    texto => {
                        return <span key={texto.replace(" ", "")} >{texto}</span>
                    }
                )
            }
        </code>
    )
}

function link(text) {
    let match = text.replace("[[", "").replace("]]", "")
    let url = `http://localhost:3000/excel?data=${match}`

    return (
        <a href={url}><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" viewBox="0 0 16 16">
            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
        </svg></span> Descargar reporte</a>
    )
}

function handleBoldText(text) {
    if (!text) return <></>
    // Usamos una expresión regular para encontrar el texto entre **
    const regex = /\*\*(.*?)\*\*/g;
    return text.split(regex).map((part, index) => {
        // Si el texto está en negritas, lo envolvemos en <strong>
        if (index % 2 === 1) {
            return <strong key={index}>{part}</strong>;
        }
        return part; // Texto normal
    })
}

function UnorderList(element, index, array) {
    if (array[index - 1].slice(0, 5).includes("-")) return <></>

    let lista = []

    while (index < array.length && element.slice(0, 5).includes("-")) {
        lista.push(element);
        index++;
        element = array[index];
    }

    return (
        <ul>
            {lista.map((element) => {
                return <li key={Math.random() * 12345678}>
                    <p>
                        {handleBoldText(element.split("- ")[1])}
                    </p>
                </li>
            })}
        </ul>
    )
}


function Title(message) {
    const regex = /^(#{1,6})\s+(.*)$/; // Regex para capturar títulos con # (1 a 4)

    const match = message.match(regex);
    const nivel = match[1].length; // Captura la cantidad de # para determinar el nivel
    const contenido = match[2]; // Captura el contenido del título

    // Renderiza el título basado en el nivel
    if (nivel === 6) {
        return <h6 key={Math.random() * 123656789}>{handleBoldText(contenido)}</h6>;
    }
    if (nivel === 5) {
        return <h5 key={Math.random() * 125456789}>{handleBoldText(contenido)}</h5>;
    }
    if (nivel === 4) {
        return <h4 key={Math.random() * 123456789}>{handleBoldText(contenido)}</h4>;
    }
    if (nivel === 3) {
        return <h3 key={Math.random() * 123456789}>{handleBoldText(contenido)}</h3>;
    }
    if (nivel === 2) {
        return <h2 key={Math.random() * 123456789}>{handleBoldText(contenido)}</h2>;
    }
    if (nivel === 1) {
        return <h1 key={Math.random() * 123456789}>{handleBoldText(contenido)}</h1>;
    } else {
        return <p key={Math.random() * 123456789}>{handleBoldText(contenido)}</p>;
    }
}

function Table(element, index, array) {
    if (array[index - 1].slice(0, 3).includes("|")) return <></>
    let headerTable = element.split("|").map(element => element.trim()).slice(1, -1);

    let bodyTable = []

    index += 2;
    element = array[index];

    while (index < array.length && element.slice(0, 5).includes("|")) {
        bodyTable.push(element.split("|").map(element => element.trim()).slice(1, -1));
        index++;
        element = array[index];
    }

    return (
        <div className="table-assistant">
            <table>
                <thead>
                    <tr>
                        {headerTable.map((header, index) => (
                            <th key={index}>{handleBoldText(header)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bodyTable.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{handleBoldText(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
