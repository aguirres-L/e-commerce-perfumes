import { useState } from 'react';
import Left from '../ui/svg/Left';
import Rigth from '../ui/svg/Rigth';
import IndicadoresImagen from './IndicadoresImagen';

const ImagenDetail = ({ images, currentIndex = 0, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="relative  max-w-4xl w-full">
        {/* Botón de cerrar */}
        <button
          className="absolute -top-12 right-0 text-white hover:text-gold z-10"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagen principal */}
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
  <img
    src={images[currentImageIndex]}
    alt={`Imagen ${currentImageIndex + 1}`}
    className="w-full h-full object-cover transition-all duration-300 ease-in-out"
  />

          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full hover:bg-gold transition"
                aria-label="Imagen anterior"
              >
                <Left/>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full hover:bg-gold transition"
                aria-label="Siguiente imagen"
              >
                <Rigth/>
              </button>
            </>
          )}
        </div>

        {/* Indicadores */}
        <IndicadoresImagen
          total={images.length}
          currentIndex={currentImageIndex}
          onSelect={setCurrentImageIndex}
        />
      </div>
    </div>
  );
};

export default ImagenDetail;