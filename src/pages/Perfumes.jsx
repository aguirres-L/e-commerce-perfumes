import React, { useState } from "react";
import AnimatedSection from "../utils/AnimatedSection";
import { useSelectHero } from "../context/SelectHeroContext";
import HomePath from "../components/ui/path/HomePath";
import { useCart } from "../context/CartContext";

// ui 
import ShopPath from "../components/ui/path/ShopPath";
import Encargos from "./Encargos";
import { useProducts } from "../context/ProductsContext";


const Perfumes = () => {
  const { setSelectedHero, setIsModalShop, isModalShop } = useSelectHero();
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const [addShop, setAddShop] = useState(null); // Estado para el carrito

  const { addToCart, cart } = useCart();

  const { products, loading, error, reserveProduct, refreshProducts } = useProducts();
  let perfumeData = products; // Asignar productos a perfumeData

  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calcular el total de artículos en el carrito

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

const nextImage = () => {
  setCurrentImageIndex((prevIndex) => 
    prevIndex === selectedPerfume.image.length - 1 ? 0 : prevIndex + 1
  );
};

const prevImage = () => {
  setCurrentImageIndex((prevIndex) => 
    prevIndex === 0 ? selectedPerfume.image.length - 1 : prevIndex - 1
  );
};
  
  // Función para manejar el clic en "Añadir al carrito"
  const handleAddToCart = (product) => {
    try {
      addToCart(product); // Agregar el producto al carrito
      setAddShop(true);
      setTimeout(() => {
        setAddShop(false);
      }, 3000); // Aumenta el tiempo a 3000 ms (3 segundos)
    } catch (error) {
      console.error("Error al añadir al carrito:", error); 
    }
  };

  const openModal = () => {
    setIsModalShop(true)
    console.log(isModalShop);
  }; // Función para abrir el modal de la tienda

  // Filtrar y ordenar perfumes
  const filteredPerfumes = perfumeData
    ?.filter((perfume) => {
      // Filtrar por origen si no es "all"
      if (filter !== "all" && perfume.origin.toLowerCase() !== filter.toLowerCase()) {
        return false;
      }
      // Filtrar por término de búsqueda
      if (searchTerm && !perfume.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Ordenar por precio o nombre
      if (sortBy === "price") {
        return a.price - b.price; // Orden ascendente por precio
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name); // Orden alfabético por nombre
      }
      return 0;
    });

  const brands = [...new Set(perfumeData?.map((perfume) => perfume.brand))];

  return (


    <>

      {!isModalShop ? (

        <>
          <div className="min-h-screen bg-gradient-to-b bg-black to-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8">

            <button
              className="absolute top-4  left-4 bg-gold cursor-pointer px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
              onClick={() => {
                setSelectedHero(""); // Resetear el héroe seleccionado
              }}
            >
              <HomePath /> {/* Icono de inicio */}
            </button>

            {cart.length > 0 && (
              
              <div className="flex flex-row items-center">
              <button
                className="absolute top-4 right-4 bg-gold cursor-pointer px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition flex items-center"
                onClick={openModal}
              >
                <ShopPath /> {/* Icono del carrito */}
                {totalItems > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
              
              )}

            {/* Encabezado con AnimatedSection */}
            <AnimatedSection delay={0.2}>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gold">Catálogo de Masculino</h1>
               {/*  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Descubre nuestra exclusiva colección de perfumes árabes e importados.
                </p> */}
              </div>
            </AnimatedSection>

            {/* Filtros con AnimatedSection */}
            <AnimatedSection delay={0.4}>
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

                <div className="flex flex-wrap items-center gap-4">
                  <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    {console.log(filteredPerfumes, 'filter')}
                    <option value="all">Todos los Perfumes</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>

                  <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="price">Ordenar por precio</option>
                    <option value="name">Ordenar por nombre</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Buscar perfumes..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold w-full md:w-64"
                />
              </div>
            </AnimatedSection>

            {/* Grid de perfumes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPerfumes.map((perfume, index) => (
                <AnimatedSection key={perfume.id} delay={0.1 * index}>
                  <PerfumeCard
                    perfume={perfume}
                    onClick={() => setSelectedPerfume(perfume)}
                  />
                </AnimatedSection>
              ))}
            </div>

            {/* Modal de detalle */}
            {selectedPerfume && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedPerfume(null)}
              >
                <AnimatedSection delay={0}>
                  <div
                    className="bg-[#1d1d1d] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-white"
                      onClick={() => setSelectedPerfume(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">

                        <div className="md:w-1/2">
                          <div className="bg-gray-800 rounded-lg h-64 md:h-80 flex items-center justify-center">
                            {/* Imagen principal */}
                            <img
                              src={selectedPerfume.image[currentImageIndex]}
                              alt={selectedPerfume.name}
                              className="h-full w-full object-cover transition-opacity duration-300"
                            />

                            {/* Controles del slider */}
                            <div className="absolute left-0 right-0 flex justify-center gap-2">
                              {selectedPerfume.image.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`w-3 h-3 rounded-full mt-40 ${currentImageIndex === index ? 'bg-gold' : 'bg-gray-500'}`}
                                  aria-label={`Ir a imagen ${index + 1}`}
                                />
                              ))}

                              {/* Flechas de navegación */}
                              {selectedPerfume.image.length > 1 && (
                                <>
                                  <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                    aria-label="Imagen anterior"
                                  >
                                    &lt;
                                  </button>
                                  <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                    aria-label="Siguiente imagen"
                                  >
                                    &gt;
                                  </button>
                                </>
                              )}

                            </div>
                          </div>
                        </div>
                       
                        <div className="md:w-1/2">
                          <h2 className="text-2xl font-serif text-gold mb-2">{selectedPerfume.name}</h2>
                          <p className="text-xl font-bold mb-6">${selectedPerfume.price}</p>

                          <p className="text-gray-400 mb-4">{selectedPerfume.brand} • {selectedPerfume.origin}</p>
                          {console.log(selectedPerfume, 'selectedPerfume')}
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                            <p className="text-gray-300">Notas : {selectedPerfume.notes}</p>

                            <p className="text-gray-300">Corazón : {selectedPerfume.corazon}</p>
                            <p className="text-gray-300">Base : {selectedPerfume.base}</p>
                          </div>

                          <button
                            onClick={() => handleAddToCart(selectedPerfume)} // Agregar al carrito
                            className="w-full bg-gray-100 cursor-pointer text-black py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                          >
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {addShop && (
                    <div className="fixed inset-0  bg-opacity-90 flex items-start justify-center z-50 pt-16">
                      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 flex items-center animate-fade-in">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Producto añadido</h3>
                          <p className="text-sm text-gray-600">Se ha agregado correctamente al carrito</p>
                        </div>
                      </div>
                    </div>
                  )}

                </AnimatedSection>
              </div>
            )}

       

          </div>
        </>

      )
        : (<Encargos setIsModalShop={setIsModalShop} />)}


      
    </>


  );
};

// Componente de tarjeta de perfume (sin animaciones propias)
const PerfumeCard = ({ perfume, onClick }) => {
  return (
    <div
      className="bg-[#1d1d1d] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Contenedor de la imagen - relación de aspecto 1:1 */}
      <div className="relative pt-[100%] overflow-hidden"> {/* Mantiene relación cuadrada */}
        <img
          src={perfume.image[0]}
          alt={perfume.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Perfume+Image';
          }}
        />
        {/* Capa oscura para mejorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4 bg-[#2c2b2bb8] flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{perfume.name}</h3>
          <span className="text-yellow-500 font-bold whitespace-nowrap">${perfume.price}</span>
        </div>
        <p className="text-gray-400 text-sm mb-3">{perfume.brand} • {perfume.origin}</p>
        <div className="mt-auto">
          <button 
            className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfumes;