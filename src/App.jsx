import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeV1 from "./pages/HomeV1";
import { Web3AuthSignerProvider } from "./components/context/web3-auth-signer";
import { WalletProvider } from "./components/context/WalletContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import HomeV2 from "./pages/HomeV2";
//import HomeV3 from "./pages/HomeV3";
//import HomeV4 from "./pages/HomeV4";

function App() {
  const queryClient = new QueryClient(); // Create an instance of QueryClient

  return (
    <Web3AuthSignerProvider>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeV1 />} />
              {/*<Route path="/home-two" element={<HomeV2 />} />
              <Route path="/home-three" element={<HomeV3 />} />
              <Route path="/home-four" element={<HomeV4 />} />*/}
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </QueryClientProvider>
    </Web3AuthSignerProvider>
  );
}

export default App;
