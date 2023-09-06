import { useContext,useEffect } from 'react';
import { AppContext } from '../config/app-context';
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
    Alert
} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import { theme } from '../config/theme';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication } from '../config/firebase.config';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { ScreenLoaderIndicator } from '../utilities/screen-loader-indicator';
import { generateAlphaNumChars } from '../utilities/generate-alpha-num-chars';

const schema = yup.object().shape({
    email:yup.string().min(8).max(60).required(),
    password:yup.string().min(8).max(32).required(),
});

export function Signin({navigation}) {
    const { isLoading,setIsLoading,userToken,setUserToken,setUser,user } = useContext(AppContext);

    // AUTHORIZATION
    const checkUserToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            token ? navigation.navigate('my-home') : null;
        } catch (error) {
            Alert.alert('Error','problem fetching authorization token');
            console.error(error);
        }
    }

    useEffect(() => {
        checkUserToken();
    },[userToken]);
    //AUTHORIZATION

    const login = async (email,pass) => {
        setIsLoading(true);

        await signInWithEmailAndPassword(authentication,email,pass)
        .then(() => {
            onAuthStateChanged(authentication, async (user) => {
                let token_ = generateAlphaNumChars(36);
                let dataForStorage = {
                    token:token_,
                    user_uid:user.uid
                }

                setUser(user.uid);
                setUserToken(token_);
                await AsyncStorage.setItem('userToken',JSON.stringify(token_));
                await AsyncStorage.setItem('user',JSON.stringify(dataForStorage));

                setIsLoading(false);
            })
        })
        .catch(e => console.error(e))
    }

    return (
        isLoading 
        ?
        <ScreenLoaderIndicator/>
        :
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.brandName}>Rebid</Text>

                <View style={styles.form}>
                    <Formik
                        initialValues={{ email:'',password:''}}
                        onSubmit={values => {
                           login(values.email,values.password)
                        }}
                        validationSchema={schema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched,errors }) => (
                            <>
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='email-address'
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder='email address'/>
                                {errors.email && touched.email 
                                ? <Text style={styles.errorText}>{errors.email}</Text> 
                                : null}
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='default'
                                secureTextEntry={true}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder='create password'/>
                                {errors.password && touched.password 
                                ? <Text style={styles.errorText}>{errors.password}</Text> 
                                : null}
                            </View>
                             
                            <Button 
                            mode='contained'
                            buttonColor={theme.colors.navy}
                            textColor={theme.colors.dullRed0}
                            style={{paddingVertical:8}}
                            onPress={handleSubmit}>Sign in</Button>
                            </>
                        )}
                    </Formik>
                </View>

                <View style={styles.existingUser}>
                    <Text style={styles.existingUserText}>Don't have a Rebid account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('create-account')}>
                        <Text style={[styles.existingUserText,{color:theme.colors.dullRed1}]}>Go to Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container:{
        flex:1,
        paddingHorizontal:8,
        flexDirection:'column',
        gap:16,
    },
    brandName:{
        fontSize:42,
        fontWeight:'bold',
        color:theme.colors.dullRed1
    },
    form:{
        flexDirection:'column',
        gap:8,
    },
    errorText:{
        fontSize:12,
        color:theme.colors.red,
    },
    existingUser:{
        flexDirection:'row',
        gap:4,
    },
    existingUserText:{
        fontSize:18
    }
})