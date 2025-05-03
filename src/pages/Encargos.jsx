import { useState } from 'react';
import BackPath from "../components/ui/path/BackPath";
import { useCart } from "../context/CartContext";
import AnimatedSection from "../utils/AnimatedSection";
import { addDocumentFirebase } from '../firebase/data-firebase';

const Encargos = ({ setIsModalShop }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    clearCart 
  } = useCart();

  const [buyerInfo, setBuyerInfo] = useState({
    nombre: '',
    direccion: '',
    telefono: '' ,
    email :''
  });
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleQuantityChange = (id, e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalShop(false);
  };

  const handlePayment = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year:  'numeric' });
    const orderData = {
      buyerInfo,
      cart,
      totalPrice,
      fecha: formattedDate, // Fecha en formato humanizado (ej: "11 de abril de 2025")
      estado: false // Estado inicial
    };
    // Implementa aquí la lógica para enviar orderData a Firebase.
     // Aquí iría tu lógica para enviar a Firebase
  //console.log('Compra procesada:', orderData);
  addDocumentFirebase('orders', orderData)
  // Mostrar confirmación
  setIsOrderConfirmed(true);
  // Limpiar el carrito después de 3 segundos
  setTimeout(() => {
    clearCart();
    setIsOrderConfirmed(false);
    setIsModalShop(false);
  }, 4600);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Botón para volver atrás */}
      <button
        onClick={closeModal}
        className="absolute top-1 mb-2 left-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800 transition"
      >
        <BackPath/>
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4 border-gray-300">
        Tus Encargos
      </h1>

      {cart.length === 0 ? (
        <AnimatedSection delay={0.6}>
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-gray-500 text-lg mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-4">Tu carrito está vacío</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Explorar Productos
            </button>
          </div>
        </AnimatedSection>
      ) : (
        <AnimatedSection delay={0.6}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Productos ({totalItems})</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                          <img 
                            src={item.image[0] || '/placeholder-product.jpg'} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <h3 className="font-medium text-gray-900">{item?.name}</h3>
                       {/*    <p className="text-gray-600">${item?.price.toFixed(2)}</p>
                        */}   <p className="text-gray-600">${item?.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e)}
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          >
                            {[...Array(10).keys()].map(num => (
                              <option key={num} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                

                <div className="px-6 py-4 border-t border-gray-300 bg-gray-50 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-gray-600 hover:text-gray-900 flex items-center text-sm transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Resumen del pedido y Datos del Comprador */}
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900">Resumen del Pedido</h2>
                </div>
                
                <div className="px-6 py-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">Tarifa Uber</span>
                  </div>
                  
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Impuestos</span>
                    <span className="font-medium">$0.00</span>
                  </div> */}
                  
                  <div className="flex justify-between text-lg font-semibold pt-4 border-t border-gray-300">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Sección para ingresar los datos del comprador */}
                <div className="px-6 py-4 border-t border-gray-300 bg-gray-50">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Datos del Comprador</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={buyerInfo.nombre}
                      onChange={handleBuyerChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      value={buyerInfo.direccion}
                      onChange={handleBuyerChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                      type="text"
                      name="telefono"
                      placeholder="Teléfono"
                      value={buyerInfo.telefono}
                      onChange={handleBuyerChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    /> 

                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={buyerInfo.email}
                      onChange={handleBuyerChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />


                  </div>

                </div>
                
                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-300">
                 <button
  disabled={!buyerInfo.nombre || !buyerInfo.direccion || !buyerInfo.telefono}
  onClick={handlePayment}
  className={`w-full py-3 rounded-md font-medium transition-colors ${
    (!buyerInfo.nombre || !buyerInfo.direccion || !buyerInfo.telefono)
      ? "bg-white text-gray-400 border-2 border-gray-300 cursor-not-allowed"
      : "bg-gray-900 text-white hover:bg-gray-800 border-2 border-transparent"
  }`}
>
  Pagar por Transferencia
</button>
                  <p className="mt-2 text-sm text-gray-600">
                    Después de confirmar el pedido, recibirás las instrucciones para realizar la transferencia bancaria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

{isOrderConfirmed && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 text-center animate-fade-in">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-16 w-16 text-green-500 mx-auto mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h3>
      <p className="text-gray-600 mb-6">Hemos recibido tu pedido correctamente. Nuestro equipo de Ventas se comunicara por WhatsApp.</p>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
      <p className="text-sm text-gray-500 mt-4">Redirigiendo...</p>
    </div>
  </div>
)}
    </div>
  );
};

export default Encargos;