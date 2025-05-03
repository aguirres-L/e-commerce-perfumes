import React from "react";

const ConfirmationAlert = ({ type, onConfirm, onCancel, productName }) => {
  // Determinar el contenido basado en el tipo de alerta
  const isShopAlert = type === "shop";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Encabezado */}
        <div className={`p-4 ${isShopAlert ? "bg-green-500" : "bg-red-500"} text-white`}>
          <h3 className="text-lg font-semibold">
            {isShopAlert ? "¡Producto añadido!" : "Eliminar producto"}
          </h3>
        </div>
        
        {/* Cuerpo del mensaje */}
        <div className="p-6">
          <div className="flex items-start">
            {isShopAlert ? (
              <>
                <svg className="w-8 h-8 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-gray-700 mb-2">"{productName}" ha sido añadido al carrito.</p>
                  <p className="text-sm text-gray-500">¿Deseas ir al carrito o seguir comprando?</p>
                </div>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 text-red-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-gray-700 mb-2">¿Estás seguro de que quieres eliminar "{productName}" del carrito?</p>
                  <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between sm:px-6">
          {isShopAlert ? (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Seguir comprando
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ir al carrito
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;