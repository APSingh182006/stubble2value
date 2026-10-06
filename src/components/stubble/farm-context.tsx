import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialFarm, type Farm } from '@/lib/stubble';
const FarmContext = createContext<{farm:Farm;setFarm:(farm:Farm)=>void;calculated:boolean;setCalculated:(value:boolean)=>void}|null>(null);
export function FarmProvider({children}:{children:ReactNode}) {const [farm,setFarm]=useState(initialFarm);const [calculated,setCalculated]=useState(false);return <FarmContext.Provider value={{farm,setFarm,calculated,setCalculated}}>{children}</FarmContext.Provider>}
export function useFarm() {const context=useContext(FarmContext);if(!context)throw new Error('FarmProvider is required');return context;}
