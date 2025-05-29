const IndicadoresImagen = ({ total, currentIndex, onSelect }) => (
  <div className="flex justify-center mt-4 gap-2">
    {Array.from({ length: total }).map((_, index) => (
      <button
        key={index}
        onClick={() => onSelect(index)}
        className={`
          rounded-full
          transition-all duration-300
          ${currentIndex === index
            ? 'bg-gold w-8 h-3 shadow-lg'
            : 'bg-gray-300 w-3 h-3 opacity-80'
          }
        `}
        aria-label={`Ir a imagen ${index + 1}`}
      />
    ))}
  </div>
);

export default IndicadoresImagen; 