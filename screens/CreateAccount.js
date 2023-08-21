import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import { theme } from '../config/theme';
import * as yup from 'yup';

const schema = yup.object().shape({
    fName:yup.string().min(3).required(),
    lName:yup.string().min(3).required(),
    email:yup.string().min(8).max(60).required(),
    password:yup.string().min(8).max(32).required(),
    passwordConfirmation:yup.string()
    .oneOf([yup.ref('password'),null],'password must match')
});

export function CreateAccount({navigation}) {

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.brandName}>Rebid</Text>

                <View style={styles.form}>
                    <Formik
                        initialValues={{ fName:'',lName:'',email:'',password:'',passwordConfirmation:'' }}
                        onSubmit={values => console.log(values.email)}
                        validationSchema={schema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, touched }) => (
                            <>
                             <View>
                                <TextInput
                                mode='outlined'
                                value={values.fName}
                                onChangeText={handleChange('fName')}
                                onBlur={handleBlur('fName')}
                                placeholder='first name'/>
                                <Text style={styles.errorText}>error</Text>
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                value={values.lName}
                                onChange={handleChange('lName')}
                                onBlur={handleBlur('lName')}
                                placeholder='last name'/>
                                <Text style={styles.errorText}>error</Text>
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='email-address'
                                value={values.email}
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder='email address'/>
                                <Text style={styles.errorText}>error</Text>
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='default'
                                secureTextEntry={true}
                                value={values.password}
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder='create password'/>
                                <Text style={styles.errorText}>error</Text>
                            </View>
                             <View>
                                <TextInput
                                mode='outlined'
                                keyboardType='default'
                                secureTextEntry={true}
                                value={values.passwordConfirmation}
                                onChange={handleChange('passwordConfirmation')}
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
        
    },
    existingUser:{
        flexDirection:'row',
        gap:4,
    },
    existingUserText:{
        fontSize:18
    }
})