// components/AnimatedSection.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * AnimatedSection
 * 
 * Este componente envuelve su contenido en una animación que se activa cuando el componente entra en la vista del usuario.
 * Utiliza `framer-motion` para las animaciones y `react-intersection-observer` para detectar si el componente está visible.
 * 
 * Props:
 * - `children` (ReactNode): El contenido que será envuelto por el componente animado.
 * - `delay` (number, opcional): El retraso en segundos antes de que comience la animación. Por defecto es `0`.
 * 
 * Ejemplo de animación:
 * - Cuando el componente entra en la vista, su opacidad pasa de 0 a 1 y se mueve hacia arriba (de `y: 20` a `y: 0`).
 * 
 * Uso:
      <AnimatedSection delay={0.3} >
      </AnimatedSection >
 * 
 * Importa el componente y envuelve cualquier contenido que quieras animar al entrar en la vista.
 */

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;