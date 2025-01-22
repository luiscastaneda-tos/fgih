/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useRef } from "react"

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
        if (element.includes('{"cupon":')) {
            return ImagenCupon(element);
        }
        if (element.includes('{"dataCupon":')) {
            return ImagenCuponAerolinea(element);
        }
        else {
            return <p key={Math.random() * 123456789}>{handleBoldText(element)}</p>
        }
    })
    return (lista_check);
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
    let url = `https://noktos-back.vercel.app/excel?data=${match}`

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

function separarTexto(texto, limite) {
    const textoSeparado = texto.split(" ");
    const almacenarTextoSeparado = [];
    if (textoSeparado.length > limite) {
        const splitsOptimos = Math.round(textoSeparado.length / limite);
        for (let i = 0; i < splitsOptimos; i++) {
            if (i + 1 == splitsOptimos) {
                almacenarTextoSeparado.push(textoSeparado.slice(limite * i, textoSeparado.length).join(" "));
            }
            else {
                almacenarTextoSeparado.push(textoSeparado.slice(limite * i, limite * (i + 1)).join(" "));
            }

        }
        return almacenarTextoSeparado;
    }
    return [textoSeparado.join(" ")];
}

function acomodarNumero(numero) {
    let stringNumber = numero.toFixed(2).split("")
    let index = stringNumber.indexOf(".")
    if (index < 4) {
        return stringNumber.join("")
    } else {
        stringNumber.splice(index - 3, 0, ",")
        return stringNumber.join("")
    }
}

function ImagenCupon(element) {
    const parseado = JSON.parse(element.replaceAll("!", ""));
    const objetoCupon = parseado.cupon;
    const { hotel, checkin, checkout, noches, noktos, desayuno, notas, precio, impuestos } = objetoCupon;
    const direccion = separarTexto(objetoCupon.direccion, 10);
    const precioPersona = acomodarNumero(precio);
    const precioImpuestos = acomodarNumero(impuestos);
    const nota = separarTexto(String(notas) + ' ' + String(desayuno), 10);

    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Función para dibujar rectángulos con texto
        function drawTextRect(x, y, width, height, text, textColor, bgColor) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(x, y, width, height);

            ctx.fillStyle = textColor;
            ctx.font = "16px Calibri";
            ctx.textAlign = "center";
            ctx.fillText(text, x + width / 2, y + height / 2 + 5);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const centro = canvas.width / 2;
        ctx.font = "bold 20px Calibri";
        ctx.textAlign = "center"
        ctx.fillStyle = "#002060";
        ctx.fillText("KONE México SA DE CV", centro + centro / 2, 40);
        ctx.fillText("Cotización - Host", centro + centro / 2, 60);

        ctx.font = "20px Calibri";
        ctx.textAlign = "left"
        ctx.fillStyle = "#FF0000";
        ctx.fillText("Nota:", 20, 570);
        ctx.fillStyle = "#002060";
        ctx.fillText("HOTEL", 20, 130);
        ctx.fillText("Dirección", 20, 190);
        ctx.fillStyle = "#002060";
        ctx.textAlign = "center"
        ctx.fillText(hotel, centro, 160);
        for (let y = 0; y < direccion.length; y++) {
            ctx.fillText(direccion[y], centro, 220 + y * 25);
        }
        ctx.fillStyle = "#002060";
        ctx.font = "bold 20px Calibri";
        ctx.fillText("Check in", centro / 2, 280);
        ctx.fillText("Check out", centro + centro / 2, 280);
        ctx.font = "20px Calibri";
        ctx.fillText(checkin, centro / 2, 310);
        ctx.fillText(checkout, centro + centro / 2, 310);
        ctx.fillText(`Total de noches: ${noches}`, centro, 350);
        ctx.textAlign = "right"
        ctx.fillText("Precio por noche por habitación", centro, 390);
        ctx.fillText("Precio por noche por habitación", centro, 450);
        ctx.textAlign = "center"
        ctx.fillText(`Noktos por noche: ${noktos}`, centro, 510);

        ctx.textAlign = "right"
        ctx.fillStyle = "#002060";
        ctx.fillText("(sin impuestos)", centro, 410);
        ctx.fillText("(incluye impuestos)", centro, 470);

        ctx.textAlign = "left"
        ctx.font = "bold 20px Calibri";
        ctx.fillText("$ " + precioPersona, centro + 20, 410);
        ctx.fillText("$ " + precioImpuestos, centro + 20, 470);
        ctx.font = "20px Calibri";
        ctx.textAlign = "left"
        ctx.fillStyle = "#002060";
        for (let y = 0; y < nota.length; y++) {
            ctx.fillText(nota[y], 70, 570 + y * 25);
        }

        ctx.textAlign = "center"
        drawTextRect(0, 580, canvas.width, 85, "", "#002060", "#ffffff");

        ctx.font = "bold 20px Calibri";
        ctx.fillStyle = "#06304b";
        ctx.fillText("Tarifa no reembolsable (No aplica cambio y/o cancelaciones)", centro, 615);
        ctx.fillText("Tarifa sujeto disponibilidad", centro, 645);
        ctx.textAlign = "left"
        ctx.fillStyle = "#002060";
        ctx.fillText("Quedo al pendiente del Vo.Bo.", 10, 690);
        ctx.fillText("Saludos,", 10, 720);
        ctx.fillText("Noktos", 10, 750);
        const img = new Image();
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCnXXDdUwbDQkIKpIgnllhb-febE-E2isQQ&s";
        img.onload = () => {
            ctx.drawImage(img, 20, 18, 80, 60);
        };

        const kone = new Image();
        kone.src = "https://cdn.worldvectorlogo.com/logos/kone-3.svg";
        kone.onload = () => {
            ctx.drawImage(kone, 150, 20, 110, 55);
        };
    }, []);

    return (
        <div>
            <h2>{hotel}</h2>
            <canvas ref={canvasRef} width={700} height={750} />
            <hr />
        </div>
    );

}

function ImagenCuponAerolinea(element) {
    let height = 10
    return CuponVuelo(element, height)
}

const imageNoktos = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCnXXDdUwbDQkIKpIgnllhb-febE-E2isQQ&s"
const imageKonne = "https://cdn.worldvectorlogo.com/logos/kone-3.svg"

function CuponVuelo(element) {
    const parseado = JSON.parse(element.replaceAll("!", ""));
    const { tipoVuelo, vuelos, opcion, imagenUrl, tarifa, noktos, impuestos } = parseado.dataCupon;
    const canvasRef = useRef(null);

    console.log(parseado.dataCupon)

    useEffect(() => {
        let textHeight = 25
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { width } = canvas;
        let font = "600 18px Calibri";
        let align = "left"
        let color = "#002060"

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        writeText(ctx, 20, textHeight, { font, align, color: "#45bddf" }, "KONE México SA DE CV");
        insertImage(ctx, 150, 55, width - 160, textHeight - 10, imageKonne)
        insertImage(ctx, 90, 55, width - 270, textHeight - 10, imageNoktos)

        textHeight = 45
        writeText(ctx, 20, textHeight, { font, align, color: "#45bddf" }, "Cotización - Vuelo");

        textHeight = 90
        writeText(ctx, 20, textHeight, { font, align, color }, `${tipoVuelo}:`);
        for (const vuelo of vuelos) {
            textHeight += 20
            writeText(ctx, 20, textHeight, { font: "18px Calibri", align, color }, `${vuelo}`);
        }

        textHeight = 180
        writeText(ctx, 20, textHeight, { font, align, color }, `${opcion}`);
        insertImage(ctx, width - 40, 40 * vuelos.length, 0, textHeight + 10, imagenUrl)

        textHeight = 350
        writeText(ctx, 20, textHeight, { font: "16px Calibri", align, color }, `${tarifa}`);
        textHeight = 370
        writeText(ctx, 20, textHeight, { font, align, color }, `Costo total: $${impuestos}`);
        writeText(ctx, 250, textHeight, { font: "16px Calibri", align, color }, `${noktos} Noktos`);

        textHeight = 430
        writeText(ctx, 20, textHeight, { font, align, color: "#45bddf" }, `Tarifa no reembolsable, no endosable, cargos por cambio y nivelación tarifaria`);
        font = "18px Calibri"
        textHeight += 20
        writeText(ctx, 20, textHeight, { font, align, color }, `Quedo al pendiente del Vo.Bo`);
        textHeight += 20
        writeText(ctx, 20, textHeight, { font, align, color }, `Saludos`);
        textHeight += 20
        writeText(ctx, 20, textHeight, { font, align, color }, `Noktos`);
    }, []);

    return (
        <div>
            <h2>{opcion}</h2>
            <canvas ref={canvasRef} width={800} height={510} />
            <hr />
        </div>
    );
}

function insertImage(ctx, width, height, x, y, url) {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
    };
}

function writeText(ctx, x, y, { font, align, color }, text) {
    if (font) ctx.font = font;
    if (align) ctx.textAlign = align;
    if (color) ctx.fillStyle = color;
    ctx.fillText(text, x, y)
}