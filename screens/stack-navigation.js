import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Starter } from "./Starter";
import { Home } from "./Home";
import { CreateAccount } from "./CreateAccount";
import { Signin } from "./Signin";
import { Auctions } from "./Auctions";
import { MyAuctions } from "./MyAuctions";
import { Category } from "./Category";
import { UpdateAuction } from "./UpdateAuction";
import { AuctionDetails } from "./AuctionDetails";
import { Pay } from "./Pay";

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
            <Stack.Screen name="category" component={Category} options={{headerShown:true}}/>
            <Stack.Screen name="update auction" component={UpdateAuction} options={{headerShown:true}}/>
            <Stack.Screen name="auction details" component={AuctionDetails} options={{headerShown:true}}/>
            <Stack.Screen name="payment" component={Pay} options={{headerShown:true}}/>
        </Stack.Navigator>
    )
}