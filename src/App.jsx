import { ClimaProvider } from "./context/ClimaProvider";

import Pantalla from "./components/Pantalla";

function App() {

  return (
    <ClimaProvider>
      <Pantalla/>
    </ClimaProvider>
  )
}

export default App
