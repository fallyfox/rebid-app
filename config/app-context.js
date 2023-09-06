import { useState,createContext,useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [UID,setUID] = useState(null);
    const [userToken,setUserToken] = useState(null);
    const [isLoading,setIsLoading] = useState(false); 

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('uid');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = AsyncStorage.getItem('userToken');
            let uid = AsyncStorage.getItem('uid');
            setUserToken(userToken);
            setUID(uid);
            setIsLoading(false);
        } catch (error) {
            Alert.alert(
                'Error handling',
                'An error has occured! @ context',
                [{
                    text:'Dismiss',
                    onPress:console.error(error)
                }]
            )
        }
    }

    useEffect(() => {
        isLoggedIn();
    },[])

    return (
        <AppContext.Provider value={{UID,setUID,userToken,setUserToken,isLoading,setIsLoading,logout}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }