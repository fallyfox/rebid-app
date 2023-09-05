import { useContext } from "react";
import { AppContext } from "../config/app-context";
import { StackNavigation } from "./stack-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ScreenLoaderIndicator } from "../utilities/screen-loader-indicator";

export function AppNav() {
    const {userToken,isLoading} = useContext(AppContext);

    if (isLoading) {
        <ScreenLoaderIndicator/>
    }

    return (
        <NavigationContainer>
            {
            userToken 
            ? <StackNavigation initRoute='my-home'/> 
            : <StackNavigation initRoute='signin'/>
            }
        </NavigationContainer>
    )
} 