import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import RouterAdmin from "../src/routers/routerAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RouterAdmin />  
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
