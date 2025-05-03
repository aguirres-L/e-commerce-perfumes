import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useSelectHero } from "../context/SelectHeroContext";
import imgPerfumesMujer from "../assets/2perf-mujer.jpg"

import imgPerfumesHombre from "../assets/2perf-hombre.jpg";
/* const HERO_IMAGES = {
  perfumes: 'https://firebasestorage.googleapis.com/v0/b/verdu-shop.appspot.com/o/hero%2Fsxss.png?alt=media&token=ba205acd-b1cd-4130-9246-aadfe1e52bde',
  accessories: 'https://firebasestorage.googleapis.com/v0/b/verdu-shop.appspot.com/o/hero%2Frelojs.png?alt=media&token=44d60f78-4bca-4f10-a3f2-2f34bcbe2e7b'
};
 */
const HERO_IMAGES = {
  perfumes: imgPerfumesHombre,
  accessories:imgPerfumesMujer
};


const Home = () => {
  const scrollContainerRef = useRef(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(null); // Estado para la sección activa
  const { selectedHero, setSelectedHero } = useSelectHero();
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleOptionClick(option) {
    setSelectedHero(option);
    setActiveSection(option); // Establecer la sección activa
    console.log(`Opción seleccionada: ${option}`);
  }

  const handleScroll = (e) => {
    if (!isMobile && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 10;
      e.preventDefault();
    }
  };

  // Animaciones para desktop
  const desktopPerfumeVariants = {
    initial: { width: "50%", x: 0 },
    hover: { width: "70%", x: 0 }
  };

  const desktopAccessoryVariants = {
    initial: { width: "50%", x: 0 },
    hover: { width: "70%", x: "-20%" }
  };

  // Animaciones para mobile - modificadas para ocupar todo el ancho
  const mobileVariants = {
    initial: { height: "50%", width: "100%" },
    hover: { height: "70%", width: "100%" }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const logoVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };

  const containerClass = isMobile 
    ? "flex flex-col h-screen w-full overflow-y-auto snap-y snap-mandatory"
    : "flex h-screen w-full overflow-x-hidden snap-x snap-mandatory";

  const sectionClass = isMobile 
    ? "w-full h-full flex-shrink-0" 
    : "h-full flex-shrink-0";

  return (
    <div className="min-h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* Logo central */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        variants={logoVariants}
        initial="visible"
        animate={hoveredSection ? "hidden" : "visible"}
        transition={{ duration: 0.3 }}
      >
        <h1 className={`${isMobile ? "text-5xl" : "text-8xl"} font-serif text-white opacity-90`}>
          {/* OPULENTIA */}AURUM
        </h1>
      </motion.div>

      {/* Mostrar contenido interactivo si hay una sección activa */}
      {activeSection && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 text-center">
            <h2 className="text-3xl font-serif text-gold mb-4">
              {activeSection === "perfumes" ? "Colección de Perfumes" : "Accesorios Premium"}
            </h2>
            <p className="text-gray-300 mb-6">
              {activeSection === "perfumes"
                ? "Explora nuestra exclusiva colección de perfumes de lujo."
                : "Descubre accesorios premium diseñados para destacar."}
            </p>
            <button
              onClick={() => setActiveSection(null)} // Cerrar el contenido interactivo
              className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        ref={scrollContainerRef}
        onWheel={handleScroll}
        className={containerClass}
      >
        {/* Sección Perfumes */}
        <motion.div
          className={`relative snap-start overflow-hidden ${sectionClass}`}
          initial="initial"
          animate={hoveredSection === 'perfumes' ? 'hover' : 'initial'}
          variants={isMobile ? mobileVariants : desktopPerfumeVariants}
          onMouseEnter={() => !isMobile && setHoveredSection('perfumes')}
          onTouchStart={() => isMobile && setHoveredSection('perfumes')}
          onTouchEnd={() => isMobile && setHoveredSection(null)}
          onMouseLeave={() => !isMobile && setHoveredSection(null)}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img 
            src={HERO_IMAGES.perfumes} 
            alt="Perfumes de lujo"
            className="w-full h-full object-cover object-center"
            onClick={() => handleOptionClick('perfumes')} // Activar sección al hacer clic
          />
        </motion.div>

        {/* Sección Accesorios */}
        <motion.div
          className={`relative snap-start overflow-hidden ${sectionClass}`}
          initial="initial"
          animate={hoveredSection === 'accessories' ? 'hover' : 'initial'}
          variants={isMobile ? mobileVariants : desktopAccessoryVariants}
          onMouseEnter={() => !isMobile && setHoveredSection('accessories')}
          onTouchStart={() => isMobile && setHoveredSection('accessories')}
          onTouchEnd={() => isMobile && setHoveredSection(null)}
          onMouseLeave={() => !isMobile && setHoveredSection(null)}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img 
            src={HERO_IMAGES.accessories} 
            alt="Accesorios de lujo"
            className="w-full h-full object-cover object-center"
            onClick={() => handleOptionClick('accessories')} // Activar sección al hacer clic
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;