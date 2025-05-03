import { 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc 
  } from "firebase/firestore";
  import { perfumesRef, variosRef } from "../firebase/config";
  
  // Obtener todos los perfumes
  export const getPerfumes = async () => {
    const snapshot = await getDocs(perfumesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  // Obtener todos los productos de "varios"
  export const getVarios = async () => {
    const snapshot = await getDocs(variosRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  // Reservar un perfume (actualizar campo "reserved")
  export const reservePerfume = async (perfumeId, deposit) => {
    const perfumeDoc = doc(perfumesRef, perfumeId);
    await updateDoc(perfumeDoc, { 
      reserved: true,
      deposit,
      lastUpdated: new Date() 
    });
  };
  
  // Añadir nuevo producto (ejemplo)
  export const addProduct = async (productData, collectionName) => {
    const collectionRef = collectionName === "perfumes" ? perfumesRef : variosRef;
    await addDoc(collectionRef, productData);
  };