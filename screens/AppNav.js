import { useContext } from "react";
import { AppContext } from "../config/app-context";
import { StackNavigation } from "./stack-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from './Home';
import { ScreenLoaderIndicator } from "../utilities/screen-loader-indicator";

export function AppNav() {
    const {userToken,isLoading} = useContext(AppContext);

    if (isLoading) {
        <ScreenLoaderIndicator/>
    }

    return (
        <NavigationContainer>
            {userToken ? <Home/> : <StackNavigation/>}
        </NavigationContainer>
    )
} 