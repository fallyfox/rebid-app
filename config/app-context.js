import { useState,createContext,useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authentication } from "./firebase.config";
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [UID,setUID] = useState(null);
    const [userToken,setUserToken] = useState(null);
    const [isLoading,setIsLoading] = useState(false); 

    const login = async (email,pass) => {
        setIsLoading(true);

        await signInWithEmailAndPassword(authentication,email,pass)
        .then(() => {
            onAuthStateChanged(authentication, async (user) => {
                setUID(user.uid);
                setUserToken('t07464ettyeewttwqt442tt');
                await AsyncStorage.setItem('userToken',String(userToken));

                setIsLoading(false);
            })
        })
        .catch(e => console.error(e))
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (error) {
            Alert.alert(
                'Error handling',
                'An error has occured!',
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
        <AppContext.Provider value={{UID,userToken,isLoading,login,logout}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }