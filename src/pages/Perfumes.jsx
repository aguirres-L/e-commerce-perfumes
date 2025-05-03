import React, { useState } from "react";
import AnimatedSection from "../utils/AnimatedSection";
import { useSelectHero } from "../context/SelectHeroContext";
import HomePath from "../components/ui/path/HomePath";
import { useCart } from "../context/CartContext";

// ui 
import ShopPath from "../components/ui/path/ShopPath";
import Encargos from "./Encargos";
import { useProducts } from "../context/ProductsContext";
import DetailProducto from "../components/cardDetail/DetailProducto";
import ARow from "../components/ui/svg/ARow";
import TwoRow from "../components/ui/svg/TwoRow";


const Perfumes = () => {
  const { setSelectedHero, setIsModalShop, isModalShop } = useSelectHero();
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const [addShop, setAddShop] = useState(null); // Estado para el carrito

  const [setselcetTypeRow, setSelcetTypeRow] = useState(2);

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
  //  console.log(isModalShop);
  }; // Función para abrir el modal de la tienda

  // Filtrar y ordenar perfumes
  
  const filteredPerfumes = perfumeData
    ?.filter((perfume) => {
      // Filtrar por origen si no es "all"
      if (filter !== "all" && perfume.brand.toLowerCase() !== filter.toLowerCase()) {
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
      } else if (sortBy === "brand") {
        return a.name.localeCompare(b.name); // Orden alfabético por nombre
      }
      return 0;
    });


    const handleSelectTypeRow = (type) => {
      setSelcetTypeRow(type);
    }

  const brands = [...new Set(perfumeData?.map((perfume) => perfume.brand))];

  return (


    <>

      {!isModalShop ? (

        <>
            {selectedPerfume ? (
           <DetailProducto 
           perfume={selectedPerfume} 
           onClose={() => setSelectedPerfume(null)}
           onAddToCart={handleAddToCart}
         />
            )
          :(
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
                    onChange={(e) => {
                      setFilter(e.target.value), console.log(e.target.value,' select filter')
                    }}
                    className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                 {/*    {console.log(filteredPerfumes, 'filter')}
                  */}   <option value="all">Todas las Marcas</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
           
              <div className="flex flex-row justify-between w-full gap-4 ">
              <select
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="price">Ordenar por precio</option>
                    <option value="name">Ordenar por nombre</option>
                  </select>
                  {setselcetTypeRow ===2 
                  ? <button onClick={()=>handleSelectTypeRow(1)} > <ARow/> </button> 
                  :  <button onClick={()=>handleSelectTypeRow(2)} > <TwoRow/> </button> }

              </div>

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
            <div className={`grid ${setselcetTypeRow === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
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
        

       

          </div>
          )}
          
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
      className="bg-[#1d1d1d] rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
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
       {/* Contenedor del nombre con fondo semitransparente */}
       <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
          <h3 className="text-white text-lg font-semibold line-clamp-1">{perfume.name}</h3>
        </div>
      </div>
      
 </div>
  );
};

export default Perfumes;



/* 
      /* Contenido de la tarjeta */
     /*  <div className="p-4 bg-[#2c2b2b25] flex-grow flex flex-col">
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
    */