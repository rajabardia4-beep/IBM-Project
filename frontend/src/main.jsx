import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);