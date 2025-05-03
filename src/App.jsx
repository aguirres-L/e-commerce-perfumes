import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AnimatedSection from './utils/AnimatedSection'
import { ProductsProvider } from './context/ProductsContext'
import { CartProvider } from './context/CartContext'
import Perfumes from './pages/Perfumes'
import Accesorios from './pages/Accesorios'
import Encargos from './pages/Encargos'
import { useSelectHero } from './context/SelectHeroContext'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  const { selectedHero, isModalShop  } = useSelectHero();

  return (
    <>
    <AnimatedSection delay={0.6} >
       {!selectedHero && (
         <Home />
       ) }
       <ProductsProvider>
        
       <CartProvider>
        
       {selectedHero === "perfumes" && (<Perfumes />)}
       {selectedHero === "accessories" && (<Accesorios/>)}
       {selectedHero === "shop" && (<Encargos/>)}
     
       </CartProvider>
       
       </ProductsProvider>
       
    </AnimatedSection >
    </>
  )
}

export default App
