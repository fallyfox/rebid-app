import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Starter } from "./Starter";
import { Home } from "./Home";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
    return (
        <Stack.Navigator 
        initialRouteName="starter"
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="my-home" component={Home}/>
            <Stack.Screen name="starter" component={Starter}/>
        </Stack.Navigator>
    )
}