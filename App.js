import { AppProvider } from "./config/app-context";
import { AppNav } from "./screens/AppNav";

export default function App() {
  return (
    <AppProvider>
      <AppNav/>
    </AppProvider>
  )
}
