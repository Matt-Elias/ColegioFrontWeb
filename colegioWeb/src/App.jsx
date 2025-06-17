import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import RouterAdmin from "../src/routers/routerAdmin";
import {PrimeReactProvider} from "primereact/api";

function App() {
  return (
    <>
      <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <RouterAdmin />  
        </AuthProvider>
      </BrowserRouter>
    </PrimeReactProvider>
    </>
  )
}

export default App;
