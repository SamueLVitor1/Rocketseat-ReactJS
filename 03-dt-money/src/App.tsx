import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";
import { Transaction } from "./pages/Transactions";
import { TransactionsContextProvider } from "./contexts/TransactionsContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsContextProvider>
        <Transaction />
      </TransactionsContextProvider>
    </ThemeProvider>
  )
}


