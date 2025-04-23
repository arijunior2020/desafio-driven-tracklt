import AppRoutes from "./routes";
import { GlobalStyle } from "./styles/GlobalStyle";
import { UserProvider } from "./contexts/UserContext";
import { ProgressProvider } from "./contexts/ProgressContext";

function App() {
  return (
    <UserProvider>
      <ProgressProvider>
        <GlobalStyle />
        <AppRoutes />
      </ProgressProvider>
    </UserProvider>
  );
}

export default App;
