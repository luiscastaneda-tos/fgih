/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { } from "../../assets/icons/icons.jsx";
import "./styles.css"

export function Inicio() {
    return (
        <main>
            <Nav />
            <Main />
        </main>
    )
}
function Nav() {
    return (
        <nav>
            <img className="logo_main" src="https://www.app.noktos.com/img/noktos_logo.svg" alt="" />
        </nav>
    )
}

function Main() {
    return (
        <section className="main">
            <Reveal>
                <section className="container">
                    <div>
                        <p>Completa este formulario para que podamos mandarte un mensaje en caso de que necesites ayuda con tu reservación</p>
                    </div>
                    <Form />
                </section>
            </Reveal>
            <hr />
            <Reveal>
                <section className="container">
                    <div>
                        <p>Hola, si quieres puedes usar el siguiente formulario para buscar el id de tu reservación en caso de que necesites mayor información</p>
                    </div>
                    <BuscarId />
                </section>
            </Reveal>
        </section>
    )
}

const Form = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        codigo_postal: '',
        ciudad: '',
        folio: '',
        terminos: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>
                    Nombres:
                    <input
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Apellidos:
                    <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Folio de tu ticket:
                    <input
                        type="number"
                        name="folio"
                        value={formData.folio}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Telefono:
                    <input
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Codigo postal:
                    <input
                        type="number"
                        name="codigo_postal"
                        value={formData.codigo_postal}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div>
                <label>
                    Ciudad:
                    <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div className="terminos">
                <label>
                    Acepto los términos
                    <input
                        type="checkbox"
                        name="terminos"
                        checked={formData.terminos}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

const BuscarId = () => {
    const [folio, setfolio] = useState("")

    const handleChange = (e) => {
        setfolio(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ folio })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Folio:
                <input
                    type="number"
                    name="folio"
                    value={folio}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Enviar</button>
        </form>
    )
}

import { motion, useAnimation, useInView } from "framer-motion";

const Reveal = ({ children }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            console.log(mainControls)
        } else {
            mainControls.set("hidden")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{ position: "relative", width: "100%", overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: .5, delay: 0.4 }}
            >
                {children}
            </motion.div>
        </div>
    )
}

/***************************************************/
export const ConfettiCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let confetti = [];
        const numConfetti = 200;
        const colors = ['#EABE3F', '#C0C0C0','#EABE3F'];

        // Asegurarnos que el canvas cubra toda la pantalla
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Función para crear las partículas de confeti
        const createConfetti = () => {
            for (let i = 0; i < numConfetti; i++) {
                confetti.push({
                    x: (Math.random() * canvas.width) + 20,      // Posición aleatoria en X
                    y: 0, // Posición aleatoria en Y
                    size: Math.random() * 5 + 5,          // Tamaño aleatorio de la pieza de confeti
                    speed: Math.random() * 5 + 1,         // Velocidad aleatoria de caída
                    direction: Math.random() + 1, // Dirección de movimiento aleatoria
                    color: colors[Math.floor(Math.random() * colors.length)], // Color aleatorio
                });
                console.log(confetti[confetti.length - 1].direction)
            }
        };

        // Función para animar el confeti
        const animateConfetti = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

            confetti.forEach((piece, index) => {
                // Dibujar cada pieza de confeti
                ctx.beginPath();
                ctx.fillRect(piece.x, piece.y, piece.size, piece.size * piece.x / canvas.width - 10);
                ctx.fillStyle = piece.color;
                ctx.fill();

                // Mover el confeti
                piece.x += Math.cos(piece.direction) * piece.speed;
                piece.y += Math.sin(piece.direction) * piece.speed;

                // Si el confeti se sale de la pantalla, lo reubicamos
                if (piece.x < 0 || piece.x > canvas.width || piece.y < 0 || piece.y > canvas.height) {
                    confetti[index] = {
                        x: Math.random() * canvas.width,
                        y: -10,  // Aparece en la parte superior
                        size: Math.random() * 5 + 5,
                        speed: Math.random() * 5 + 1,
                        direction: Math.random() * Math.PI * 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                    };
                }
            });

            requestAnimationFrame(animateConfetti); // Animación continua
        };

        createConfetti(); // Crear las partículas de confeti
        animateConfetti(); // Iniciar la animación

        // Limpiar el canvas cuando el componente se desmonte
        return () => {
            confetti = [];
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }} />;
};

export default ConfettiCanvas;
