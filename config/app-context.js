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
            onAuthStateChanged(authentication,(user) => {
                setUserToken(`${Math.round(Math.random() * 10)}`);
                AsyncStorage.setItem('userToken',userToken);
            })
        })
        .catch((e) => Alert.alert(
            'Status Report',
            'An error has occured!',
            [{
                text:'Dismiss',
                onPress:console.error(e)
            }]
        ))

        setIsLoading(false);
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