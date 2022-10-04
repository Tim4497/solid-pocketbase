import PocketBase from 'pocketbase';
import { createContext, JSX } from 'solid-js'

export const PocketBaseContext = createContext<PocketBase>()

interface PocketBaseProviderProps {
  client: PocketBase;
  children: JSX.Element
}

export const PocketBaseProvider = (props: PocketBaseProviderProps) => {
  return (
    <PocketBaseContext.Provider value={props.client}>
      {props.children}
    </PocketBaseContext.Provider>
  )
}