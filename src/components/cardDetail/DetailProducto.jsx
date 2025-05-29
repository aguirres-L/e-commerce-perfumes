import { useState } from 'react';
import ImagenDetail from './ImagenDetail';
import Left from '../ui/svg/Left';
import Rigth from '../ui/svg/Rigth';
import { useCart } from '../../context/CartContext';
import { useBackButtonClose } from './useBackButtonClose';
import IndicadoresImagen from './IndicadoresImagen';

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
      <div  className="bg-[#0a0a0a] w-full flex items-center justify-center">
        <div className="w-full h-screen max-w-2xl md:max-w-5xl bg-[#181818] shadow-lg overflow-hidden md:flex md:rounded-2xl ">
          {/* Imagen principal */}
          <div className="relative w-full aspect-[4/4] md:w-1/2">
            <div className="flex items-center justify-center flex-col w-full h-full">
              <img
                src={perfume.image[currentImageIndex]}
                alt={perfume.name}
                className="w-full h-full object-cover md:rounded-l-2xl md:rounded-r-none md:max-w-[350px] md:max-h-[350px] md:mx-auto mb-2"
                onClick={() => setShowImageDetail(true)}
                style={{ cursor: 'zoom-in' }}
              />
                 {/* Indicadores debajo de la imagen */}
          {perfume.image.length > 1 && (
            <IndicadoresImagen
              total={perfume.image.length}
              currentIndex={currentImageIndex}
              onSelect={setCurrentImageIndex}
            />
          )}
            </div>
            {/* Botón de cerrar (X) sobre la imagen */}
            <button
              className="absolute top-3 right-3 z-20 cursor-pointer text-gray-400 hover:text-white bg-black/50 rounded-full p-2"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Botón para ver imágenes en grande */}
            <button
              className="absolute top-3 left-3 z-20 cursor-pointer text-white bg-black/50 rounded-full p-2 hover:bg-gold transition"
              onClick={() => setShowImageDetail(true)}
              aria-label="Ver imágenes en grande"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            {/* Flechas de navegación */}
            {perfume.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
                  aria-label="Imagen anterior"
                >
                  <Left/>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
                  aria-label="Siguiente imagen"
                >
                  <Rigth/>
                </button>
              </>
            )}
          </div>
       
          {/* Contenido detalles */}
          <div className="flex flex-col gap-6 p-4 md:p-12 md:w-1/2 justify-center">
            {/* Sección de detalles */}
            <div className="w-full text-white">
              <h2 className="text-2xl md:text-3xl font-serif text-gold mb-2 md:mb-4 md:tracking-wide">{perfume.name}</h2>
              <div className="flex flex-row justify-between items-center md:mb-8">
                <p className="text-xl md:text-2xl font-bold mb-6 md:mb-0">${perfume.price}</p>
                <p className="text-gray-400 mb-4 md:mb-0 md:text-lg">{perfume.brand} • {perfume.origin}</p>
              </div>
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Descripción</h3>
                <p className="text-gray-300">Notas: {perfume.notes}</p>
                <p className="text-gray-300">Corazón: {perfume.corazon}</p>
                <p className="text-gray-300">Base: {perfume.base}</p> 
              </div>
              {perfume.details && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Detalle</h3>
                  <p className="text-gray-300"> {perfume.details}</p> 
                </div>
              )}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-100 text-black py-3 md:py-4 rounded-lg font-bold hover:bg-gold hover:text-white transition text-lg md:text-xl shadow-md md:mt-4"
              >
                Añadir al carrito
              </button>
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