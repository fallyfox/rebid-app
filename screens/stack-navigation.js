import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Starter } from "./Starter";
import { Home } from "./Home";
import { CreateAccount } from "./CreateAccount";
import { Signin } from "./Signin";
import { Auctions } from "./Auctions";
import { MyAuctions } from "./MyAuctions";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
    return (
        <Stack.Navigator 
        initialRouteName="signin"
        screenOptions={{headerShown:false}}>
            <Stack.Screen name="my-home" component={Home}/>
            <Stack.Screen name="starter" component={Starter}/>
            <Stack.Screen name="create-account" component={CreateAccount}/>
            <Stack.Screen name="signin" component={Signin}/>
            <Stack.Screen name="auctions" component={Auctions} options={{headerShown:true}}/>
            <Stack.Screen name="myauctions" component={MyAuctions} options={{headerShown:true}}/>
        </Stack.Navigator>
    )
}