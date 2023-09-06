import { AppProvider } from "./config/app-context";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./screens/stack-navigation";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StackNavigation/> 
      </NavigationContainer>
    </AppProvider>
  )
}
