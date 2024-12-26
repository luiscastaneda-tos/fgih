import { div, text } from "framer-motion/client"
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

function separarTexto(texto, limite){
    const textoSeparado = texto.split(" ");
    const almacenarTextoSeparado = [];
    const inicial = 0;
    if(textoSeparado.length > limite){
        const splitsOptimos = Math.round(textoSeparado.length/limite);
        console.log(splitsOptimos);
        for(let i = 0;i< splitsOptimos;i++){
            if(i+1 == splitsOptimos){
                almacenarTextoSeparado.push(textoSeparado.slice(limite*i,textoSeparado.length).join(" "));
            }
            else{
                almacenarTextoSeparado.push(textoSeparado.slice(limite*i,limite*(i+1)).join(" "));
            }
            
        }
        return almacenarTextoSeparado;
    }
    return [textoSeparado.join(" ")];
}

function ImagenCupon(element) {
    const parseado = JSON.parse(element.replaceAll("!", ""));
    const objetoCupon = parseado.cupon;
    const hotel = objetoCupon.hotel;
    const direccion = separarTexto(objetoCupon.direccion,5);
    const checkin = objetoCupon.checkin;
    const checkout = objetoCupon.checkout;
    const noches = objetoCupon.noches;
    const noktos = objetoCupon.noktos;
    const precioPersona = objetoCupon.precio.toFixed(2);   
    const precioImpuestos = objetoCupon.impuestos.toFixed(2);
    const nota = separarTexto(String(objetoCupon.notas)+' '+String(objetoCupon.desayuno),5);

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

        // Fondo blanco
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const centro = canvas.width/2;
        // Títulos principales
        ctx.font = "bold 20px Calibri";
        ctx.textAlign = "center"
        ctx.fillStyle = "#002060";
        ctx.fillText("KONE México SA DE CV", centro+centro/2, 40);
        ctx.fillText("Cotización - Host", centro+centro/2, 60);

        //drawTextRect(0, 90, centro, 70, "", "#000000", "#002060");
        ctx.font = "20px Calibri";
        //ctx.fillStyle = "#FFF";
        ctx.fillText("HOTEL", centro/2, 130);
        ctx.fillStyle = "#002060";
        ctx.fillText(hotel,centro+centro/2,130)
        ctx.fillStyle = "#002060";
        ctx.fillText("Periodo de estancia", centro/2, 280);
        ctx.font = "20px Calibri";
        ctx.fillText(checkin+" - "+checkout,centro+centro/2,280);
        
        ctx.fillText("Precio por noche por habitación", centro/2, 320);
        ctx.fillStyle = "#FF0000"
        ctx.fillText("(sin impuestos)", centro/2, 340);
        ctx.fillText("$ "+precioPersona, centro+centro/2, 320);
        ctx.fillStyle = "#002060";
        ctx.fillText("Precio por noche por habitación", centro/2, 380);
        ctx.fillText("(incluye impuestos)", centro/2, 400);
        ctx.fillText("$ "+precioImpuestos, centro+centro/2, 380);
        ctx.fillText("Noktos por noche", centro/2, 450);
        ctx.fillText(noktos, centro+centro/2, 450);
        ctx.font = "20px Calibri";
        ctx.fillStyle = "#002060";
        ctx.fillText("Dirección:", centro/2, 210);
        for(let y = 0; y < direccion.length; y++){
            ctx.fillText(direccion[y], centro+centro/2, 190+y*25);
        }
        ctx.fillText("Nota:", centro/2, 510);
        const alerta = new Image();
        alerta.src="https://img.freepik.com/vector-premium/sirena-alarma_592324-17380.jpg?w=740";
        alerta.onload = () => {
            // Dibuja la imagen completa en el canvas
            ctx.drawImage(alerta, 75, 460, 70,70);
        };
        ctx.textAlign = "center"
        ctx.fillStyle = "#002060";
        for(let y = 0; y < nota.length; y++){
            ctx.fillText(nota[y], centro+centro/2, 510+y*25);
        }

        ctx.textAlign = "center"
        drawTextRect(0, 580, canvas.width, 85, "", "#000000", "#f8fc03");
        
        ctx.font = "bold 20px Calibri";
        ctx.fillStyle = "#002060";
        //ctx.fillText("No aplica cambio y/o cancelaciones", centro, 600);
        ctx.fillText("Tarifa no reembolsable (No aplica cambio y/o cancelaciones)", centro, 615);
        ctx.fillText("Tarifa sujeto disponibilidad", centro, 645);
        ctx.textAlign = "left"
        ctx.fillText("Quedo al pendiente del Vo.Bo.", 10, 690);
        ctx.fillText("Saludos,", 10, 720);
        ctx.fillText("Noktos", 10, 750);
        const img = new Image();
        img.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCnXXDdUwbDQkIKpIgnllhb-febE-E2isQQ&s";
        img.onload = () => {
            // Dibuja la imagen completa en el canvas
            ctx.drawImage(img, 20, 18, 80,60);
        };

        const kone = new Image();
        kone.src="https://cdn.worldvectorlogo.com/logos/kone-3.svg";
        kone.onload = () => {
            // Dibuja la imagen completa en el canvas
            ctx.drawImage(kone, 150, 20, 110,55);
        };
        /*
        // Fondo blanco
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const centro = canvas.width / 2;
        // Títulos principales
        ctx.font = "bold 18px Calibri";
        ctx.textAlign = "left"
        ctx.fillStyle = "#002060";
        ctx.fillText("KONE México SA DE CV", centro, 90);
        ctx.fillText("Cotización - Host", centro, 115);

        ctx.textAlign = "center"
        ctx.font = "bold 18px Calibri";

        ctx.fillText("HOTEL", centro / 2, 150);
        ctx.fillStyle = "#0070C0";
        ctx.fillText(hotel, centro, 190)
        ctx.fillStyle = "#002060";
        ctx.fillText("Dirección", centro / 2, 220);
        ctx.font = "18px Calibri";
        for(let y = 0; y < direccion.length; y++){
            ctx.fillText(direccion[y], centro, 260+y*25);
        }
        

        ctx.font = "bold 18px Calibri";
        ctx.fillText("Check in", centro / 2, 320);
        ctx.fillText("Check out", centro + centro / 2, 320);
        ctx.font = "18px Calibri";
        ctx.fillText(checkin, centro / 2, 350);
        ctx.fillText(checkout, centro + centro / 2, 350);
        ctx.font = "bold 18px Calibri";
        ctx.fillText("TOTAL DE NOCHES", centro / 2, 390);
        ctx.fillText(noches, centro + centro / 2, 390);

        ctx.fillText("PRECIO POR NOCHE POR PERSONA", centro / 2, 430);
        ctx.fillStyle = "#E97132"
        ctx.fillText("(SIN IMPUESTOS)", centro / 2, 450);
        ctx.fillStyle = "#002060";
        ctx.fillText("PRECIO POR NOCHE POR PERSONA", centro / 2, 490);
        ctx.fillStyle = "#FF0000"
        ctx.fillText("(INCLUYE IMPUESTOS)", centro / 2, 510);
        ctx.textAlign = "right"
        ctx.fillStyle = "#002060";
        ctx.fillText(precioPersona, canvas.width - 20, 440);
        ctx.fillText(precioImpuestos, canvas.width - 20, 500);
        ctx.fillText("NOKTOS POR NOCHE", centro, 550);
        ctx.fillText("DESAYUNO:", centro, 590);
        ctx.fillStyle = "#FF0000"
        ctx.fillText("NOTA:", centro, 630);
        ctx.textAlign = "center"
        ctx.fillStyle = "#002060";
        ctx.fillText(noktos, centro + centro / 2, 550);
        ctx.fillStyle = "#FF0000"
        for(let y = 0; y < desayuno.length; y++){
            ctx.fillText(desayuno[y], centro + centro / 2, 590+y*25);
        }
        drawTextRect(0, 640, 600, 85, "", "#000000", "#f8fc03");
        ctx.font = "bold 18px Calibri";
        ctx.fillStyle = "#002060";
        ctx.fillText("No aplica cambio y/o cancelaciones", centro, 660);
        ctx.fillText("No es reembolsable", centro, 685);
        ctx.fillText("Tarifas sujetos a cambio sin previo aviso", centro, 710);
        ctx.textAlign = "left"
        ctx.fillText("Quedo al pendiente de el Vo.Bo.", 10, 760);
        ctx.fillText("Saludos.", 10, 800);
        const img = new Image();
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCnXXDdUwbDQkIKpIgnllhb-febE-E2isQQ&s";
        img.onload = () => {
            // Dibuja la imagen completa en el canvas
            ctx.drawImage(img, 80, 60, 80, 60);
        };

        const kone = new Image();
        kone.src = "https://cdn.worldvectorlogo.com/logos/kone-3.svg";
        kone.onload = () => {
            // Dibuja la imagen completa en el canvas
            ctx.drawImage(kone, 150, 20, 110, 55);
        };*/
    }, []);



    return (
        <div>
            <h2>{hotel}</h2>
            <canvas ref={canvasRef} width={700} height={750}/>
            <hr />
        </div>
);

}
