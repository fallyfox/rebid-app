import {useState} from 'react';
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
import * as yup from 'yup';
import { theme } from '../config/theme';
import { authentication } from '../config/firebase.config';
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebase.config';
import { setDoc,doc } from 'firebase/firestore';
import { ScreenLoaderIndicator } from '../utilities/screen-loader-indicator';

const schema = yup.object().shape({
    fName:yup.string().min(3).required(),
    lName:yup.string().min(3).required(),
    email:yup.string().min(8).max(60).required(),
    password:yup.string().min(8).max(32).required(),
    passwordConfirmation:yup.string()
    .oneOf([yup.ref('password'),null],'password must match')
});

export function CreateAccount({navigation}) {
    const [showScreenLoader,setShowScreenLoader] = useState(false);

    const handleCreateAccount = async (email,pass,fName,lName) => {
        setShowScreenLoader(true);

        await createUserWithEmailAndPassword(authentication,email,pass)
        .then(() => {            
            onAuthStateChanged(authentication,(user) => {
                const uid = user.uid;

                const res = setDoc(doc(db,'users',uid),{
                    firstName:fName,
                    lastName:lName,
                    email:email,
                    createdAt:new Date().getTime(),
                });

                setShowScreenLoader(false);

                res 
                ?
                Alert.alert(
                    'Report',
                    'Success! You can now sign in to your new account',
                    [{
                        text:'Proceed',
                        onPress:() => navigation.navigate('signin')
                    }]
                )
                : (e) => console.log('auth successfull BUT failed to write to firestore',e)
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
    }

    return (
        showScreenLoader
        ?
        <ScreenLoaderIndicator/>
        :
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.brandName}>Rebid</Text>

                <View style={styles.form}>
                    <Formik
                        initialValues={{ fName:'',lName:'',email:'',password:'',passwordConfirmation:'' }}
                        onSubmit={values => {
                            handleCreateAccount(values.email,values.password,values.fName,values.lName)
                        }}
                        validationSchema={schema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched,errors }) => (
                            <>
                             <View>
                                <TextInput
                                mode='outlined'
                                value={values.fName}
                                onChangeText={handleChange('fName')}
                                onBlur={handleBlur('fName')}
                                placeholder='first name'/>
                                {errors.fName && touched.fName 
                                ? <Text style={styles.errorText}>{errors.fName}</Text> 
                                : null}
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                value={values.lName}
                                onChangeText={handleChange('lName')}
                                onBlur={handleBlur('lName')}
                                placeholder='last name'/>
                                {errors.lName && touched.lName 
                                ? <Text style={styles.errorText}>{errors.lName}</Text> 
                                : null}
                            </View>
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
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='default'
                                secureTextEntry={true}
                                value={values.passwordConfirmation}
                                onChangeText={handleChange('passwordConfirmation')}
                                onBlur={handleBlur('passwordConfirmation')}
                                placeholder='confirm password'/>
                            </View>

                            <Button 
                            mode='contained'
                            buttonColor={theme.colors.navy}
                            textColor={theme.colors.dullRed0}
                            style={{paddingVertical:8}}
                            onPress={handleSubmit}>Create Account</Button>
                            </>
                        )}
                    </Formik>
                </View>

                <View style={styles.existingUser}>
                    <Text style={styles.existingUserText}>Already have a Rebid account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('signin')}>
                        <Text style={[styles.existingUserText,{color:theme.colors.dullRed1}]}>Go to Sign in</Text>
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