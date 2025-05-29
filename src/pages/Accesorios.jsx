import React, { useState } from "react";
import AnimatedSection from "../utils/AnimatedSection"; 
import { useSelectHero } from "../context/SelectHeroContext";
import HomePath from "../components/ui/path/HomePath";
import { useCart } from "../context/CartContext";
import ShopPath from "../components/ui/path/ShopPath";
import Encargos from "./Encargos";
import { useProducts } from "../context/ProductsContext";
import ARow from "../components/ui/svg/ARow";
import TwoRow from "../components/ui/svg/TwoRow";
import DetailProducto from "../components/cardDetail/DetailProducto";
import { useBackButtonClose } from "../components/cardDetail/useBackButtonClose";

// Datos simulados de accesorios premium
const accessoriesData = [
  {
    id: 1,
    name: "Reloj Royal Gold",
    brand: "Patek Philippe",
    category: "Relojes",
    price: 12500,
    description: "Reloj de pulsera de edición limitada con mecanismo automático y acabados en oro de 18k.",
    materials: "Oro 18k, Cristal de zafiro, Cuero italiano",
    image: "https://example.com/reloj1.jpg",
    isNew: true
  },
  {
    id: 2,
    name: "Collar Diamante Eterno",
    brand: "Cartier",
    category: "Joyeria",
    price: 8500,
    description: "Collar de diamantes con corte princesa y engaste invisible en platino.",
    materials: "Platino, Diamantes (2.5 quilates total)",
    image: "https://example.com/collar1.jpg",
    isNew: false
  },
  {
    id: 3,
    name: "Bolso Clásico Heritage",
    brand: "Hermès",
    category: "Bolsos",
    price: 9800,
    description: "Bolso de piel de cocodrilo hecho a mano con herrajes dorados y costura sellada.",
    materials: "Piel de cocodrilo, Oro 24k, Seda",
    image: "https://example.com/bolso1.jpg",
    isNew: true
  },
  {
    id: 4,
    name: "Anillo Solitario Imperial",
    brand: "Tiffany & Co.",
    category: "Joyeria",
    price: 15000,
    description: "Anillo de compromiso con diamante central de 3 quilates y baguettes laterales.",
    materials: "Platino, Diamante D-Flawless",
    image: "https://example.com/anillo1.jpg",
    isNew: false
  },
  {
    id: 5,
    name: "Gafas Aviador Diamantadas",
    brand: "Dior",
    category: "Accesorios",
    price: 3200,
    description: "Gafas de sol con montura de oro rosa y detalles de diamantes incrustados.",
    materials: "Oro rosa 18k, Diamantes, Cristal mineral",
    image: "https://example.com/gafas1.jpg",
    isNew: true
  },
  {
    id: 6,
    name: "Brazalete Serpiente",
    brand: "Bulgari",
    category: "Joyeria",
    price: 6800,
    description: "Brazalete rígido con diseño de serpiente y ojos de esmeraldas colombianas.",
    materials: "Oro blanco, Esmeraldas, Diamantes",
    image: "https://example.com/brazalete1.jpg",
    isNew: true
  }
];

const Accesorios = () => {
  //const navigate = useNavigate(); // Hook para manejar la navegación
    const {  setSelectedHero ,setIsModalShop ,isModalShop} = useSelectHero();

  const { products, loading, error, reserveProduct, refreshProducts } = useProducts();
  let perfumeData = products; // Asignar productos a perfumeData


      const { addToCart, cart } = useCart();
    
   let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calcular el total de artículos en el carrito
  
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
    const [selectedPerfume, setSelectedPerfume] = useState(null);
    const [setselcetTypeRow, setSelcetTypeRow] = useState(2);
  
  // Hook para ir al Home con el botón atrás, solo si no hay modal ni carrito abierto
  useBackButtonClose(() => setSelectedHero(""), !isModalShop && !selectedPerfume && !selectedAccessory);

  const filteredAccessories = accessoriesData
    .filter(accessory => {
      const matchesFilter = filter === "all" || accessory.category.toLowerCase() === filter.toLowerCase();
      const matchesSearch = accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           accessory.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "new") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });

    const filteredPerfumesFemenino = perfumeData.filter(perfume => 
      perfume.genero === "unisex" || perfume.genero === "femenino"
    );
    
    console.log(filteredPerfumesFemenino, 'perfumes filtrados (unisex y femenino)');
    
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
     const filteredPerfumes = filteredPerfumesFemenino
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

      
// Asumiendo que filteredPerfumesFemenino es un array de objetos como el que muestras
  const brands = [...new Set(filteredPerfumesFemenino?.map((perfume) => perfume.brand))];

    console.log(brands,'brands')

    const openModal = () => {
      setIsModalShop(true)
    }; // Función para abrir el modal de la tienda
  




  return (
    <>
    {!isModalShop?(

<>
{selectedPerfume ? (
<DetailProducto 
perfume={selectedPerfume} 
onClose={() => setSelectedPerfume(null)}
onAddToCart={handleAddToCart}
/>
)
:(<div className="min-h-screen bg-gradient-to-b bg-black to-[#141414] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Botón para volver al inicio */}
     {/*  <button
        className="absolute top-4 left-4 bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
        onClick={() => {
          setSelectedHero(""); // Resetear el héroe seleccionado
        }   }
    >
        Volver al inicio
      </button> */}

      <button
        className="absolute cursor-pointer hover:shadow-orange-50 top-4 ms:left-4 md:left-4 bg-gold px-4 py-2 rounded-lg font-bold hover:bg-opacity-90 transition"
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



      {/* Encabezado */}
      <AnimatedSection delay={0.2}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gold">Cátalogo Femenino</h1>
         {/*  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Piezas exclusivas de alta relojería, joyería fina y accesorios de lujo.
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
        <div className={`grid ${setselcetTypeRow === 2 ? 'grid-cols-2' : 'grid-cols-1'} md:grid-cols-3 lg:grid-cols-4 gap-6`}>
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
      {selectedAccessory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAccessory(null)}
        >
          <AnimatedSection delay={0}>
            <div 
              className="bg-[#1d1d1d] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedAccessory(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <div className="bg-gray-800 rounded-lg h-64 md:h-80 flex items-center justify-center p-4">
                      <img 
                        src={selectedAccessory.image} 
                        alt={selectedAccessory.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    {selectedAccessory.isNew && (
                      <div className="mt-4 bg-gold text-[#6a6969] text-sm font-bold px-3 py-1 rounded-full inline-block">
                        NUEVO
                      </div>
                    )}
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-serif text-gold mb-2">{selectedAccessory.name}</h2>
                    <p className="text-gray-400 mb-1">{selectedAccessory.brand} • {selectedAccessory.category}</p>
                    <p className="text-xl font-bold mb-6">${selectedAccessory.price.toLocaleString()}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Materiales</h3>
                      <p className="text-gray-300">{selectedAccessory.materials}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                      <p className="text-gray-300">{selectedAccessory.description}</p>
                    </div>
                    
                    <button className="w-full bg-gold text-black py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>)}
    </>

    )        : (<Encargos setIsModalShop={setIsModalShop} />)}

    </>
  );
};
// Componente de tarjeta de perfume (sin animaciones propias)
const PerfumeCard = ({ perfume, onClick }) => {
  return (
    <div
      className="bg-[#1d1d1d] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full md:hover:scale-105 md:transition-transform"
      onClick={onClick}
    >
      {/* Contenedor de la imagen - relación de aspecto 1:1 */}
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={perfume.image[0]}
          alt={perfume.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
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
      {/* Contenido de la tarjeta */}
   {/*    <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-500 font-bold whitespace-nowrap text-base md:text-lg">${perfume.price}</span>
          <span className="text-gray-400 text-xs md:text-sm">{perfume.brand}</span>
        </div>
        <div className="mt-auto hidden md:block">
          <button 
            className="w-full text-xs bg-gold text-black hover:bg-yellow-400 px-3 py-1 rounded-full transition font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Ver más
          </button>
        </div>
      </div> */}
    </div>
  );
};
// Componente de tarjeta de accesorio
/* const AccessoryCard = ({ accessory, onClick }) => {
  return (
    <div
      className="bg-[#1d1d1d] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      onClick={onClick}
    >
      {accessory.isNew && (
        <div className="absolute top-4 right-4 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full z-10">
          NUEVO
        </div>
      )}
      
      <div className="h-48 bg-gray-700 flex items-center justify-center p-4">
        <img 
          src={accessory.image} 
          alt={accessory.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{accessory.name}</h3>
          <span className="text-gold font-bold">${accessory.price.toLocaleString()}</span>
        </div>
        <p className="text-gray-400 text-sm mb-3">{accessory.brand} • {accessory.category}</p>
        <p className="text-gray-300 text-sm line-clamp-2">{accessory.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500 line-clamp-1">{accessory.materials.split(", ").slice(0, 2).join(", ")}</span>
          <button className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full transition">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}; */

export default Accesorios;