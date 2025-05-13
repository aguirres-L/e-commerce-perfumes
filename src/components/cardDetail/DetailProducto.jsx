import { useState } from 'react';
import ImagenDetail from './ImagenDetail';
import Left from '../ui/svg/Left';
import Rigth from '../ui/svg/Rigth';
import { useCart } from '../../context/CartContext';
import { useBackButtonClose } from './useBackButtonClose';

const DetailProducto = ({ perfume, onClose, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addShop, setAddShop] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);
  const { addToCart, cart } = useCart();

  useBackButtonClose(onClose, true);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === perfume.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? perfume.image.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    addToCart(perfume);
   // console.log(perfume, 'Added to cart');
   // console.log(cart, 'Added to cart cartcart');
    setAddShop(true);
    setTimeout(() => {
        setAddShop(false);
          onClose()
  
      }, 3000);
};

  return (
    <>
      {/* Componente principal */}
      <div className="bg-[#0a0a0a] h-screen w-full overflow-hidden shadow-lg">
        <div className="relative">
          {/* Botón de cerrar */}
          <button
            className="absolute top-4 right-4 z-10 cursor-pointer text-gray-400 hover:text-white bg-black/50 rounded-full p-2"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Botón para ver imágenes en grande */}
          <button
            className="absolute top-4 left-4 z-10 cursor-pointer text-white bg-black/50 rounded-full p-2 hover:bg-gold transition"
            onClick={() => setShowImageDetail(true)}
            aria-label="Ver imágenes en grande"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Contenido */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sección de imágenes */}
              <div className="md:w-1/2">
                <div className="relative bg-gray-800 rounded-lg aspect-square flex items-center justify-center">
                  <img
                    src={perfume.image[currentImageIndex]}
                    alt={perfume.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setShowImageDetail(true)}
                  />

                  {/* Controles del slider */}
                  {perfume.image.length > 1 && (
                    <>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {perfume.image.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-gold' : 'bg-gray-500'}`}
                            aria-label={`Ir a imagen ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Flechas de navegación */}
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2  text-white p-2 rounded-full hover:bg-opacity-70"
                        aria-label="Imagen anterior"
                      >
                       <Left/>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2  text-white p-2 rounded-full hover:bg-opacity-70"
                        aria-label="Siguiente imagen"
                      >
                        <Rigth/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Sección de detalles */}
              <div className="md:w-1/2 text-white">
                <h2 className="text-2xl font-serif text-gold mb-2">{perfume.name}</h2>
               
                  <div className="flex flex-row justify-between ">

                  <p className="text-xl font-bold mb-6">${perfume.price}</p>

<p className="text-gray-400 mb-4">{perfume.brand} • {perfume.origin}</p>

                  </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                  <p className="text-gray-300">Notas: {perfume.notes}</p>
                  <p className="text-gray-300">Corazón: {perfume.corazon}</p>
                  <p className="text-gray-300">Base: {perfume.base}</p>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-100 text-black py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación de producto añadido */}
      {addShop && (
        <div className="fixed bottom-4  bg-white p-4 rounded-lg shadow-xl max-w-sm w-full  flex items-center animate-fade-in z-50">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
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
      )}

      {/* Visor de imágenes en grande */}
      {showImageDetail && (
        <ImagenDetail 
          images={perfume.image} 
          currentIndex={currentImageIndex}
          onClose={() => setShowImageDetail(false)} 
        />
      )}
    </>
  );
};

export default DetailProducto;