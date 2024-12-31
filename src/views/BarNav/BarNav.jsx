import { Link } from "wouter";
import './BarNav.css'

export function BarNav() {
    return (
        <section id="navegacion">
            <nav>
                <Link href="/" >Inicio</Link>
                <Link href="/upload" >Actualizar base de datos</Link>
                <Link href="/prueba" >Prueba de creacion de imagenes de cotización</Link>
            </nav>
        </section>
    )
}