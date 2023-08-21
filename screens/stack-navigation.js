import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Starter } from "./Starter";
import { Home } from "./Home";
import { CreateAccount } from "./CreateAccount";
import { Signin } from "./Signin";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
    return (
        <Stack.Navigator 
        initialRouteName="create-account"
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="my-home" component={Home}/>
            <Stack.Screen name="starter" component={Starter}/>
            <Stack.Screen name="create-account" component={CreateAccount}/>
            <Stack.Screen name="signin" component={Signin}/>
        </Stack.Navigator>
    )
}