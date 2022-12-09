import React ,{useState,useEffect,createRef}from 'react';
import {View,KeyboardAvoidingView,Keyboard, StyleSheet, Text,TextInput, Image, ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase';

import Inputs from '../components/Inputs';
import Submit from '../components/Submit';
import Account from '../components/Account';

const Login1 = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errortext, setErrortext] = useState("");
    //const navigation = useNavigation()
    const passwordInputRef = createRef();
   
   
  
    const handleLogin = () => {
       
          setErrortext("");
          if (!email) {
            alert("Please fill Email");
            return;
          }
          if (!password) {
            alert("Please fill Password");
            return;
          }
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
              console.log(user);
              // If server response message same as Data Matched
              if (user) navigation.navigate("Home")
            })
            .catch((error) => {
              console.log(error);
              if (error.code === "auth/invalid-email")
                setErrortext(error.message);
              else if (error.code === "auth/user-not-found")
                setErrortext("No User Found");
              else {
                setErrortext(
                  "Please check your email id or password"
                );
              }
            });
        };
  
    return ( 
    
       <ScrollView style={{backgroundColor: 'white'}}>
           <View style={styles.container}>

          
                <Image 
                    source={require('../assets/login1.png')} 
                    resizeMode="center" 
                    style={styles.image} />
                <Text style={styles.textTitle}>Welcome User</Text>
                <Text style={styles.textBody}>Log in to your existant account</Text>
                <View style={{marginTop: 20}} />
               
        <View style={styles.inputContainer}>
        <View style={styles.inputContainer2}>
          <TextInput
           
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
            placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
          />
          </View>
          <View style={styles.inputContainer2}>
          <TextInput
           
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
            placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
          />
          </View>
        </View>
        {errortext != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errortext}{" "}
              </Text>
            ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
         
        </View>
        <Text style={styles.textBody}>Or connect using</Text>
                <View style={{flexDirection: 'row'}}>
                    
                    <Account color="#ec482f" icon="google" title="Google" />
                </View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <Text style={styles.textBody5}>Don't Have an account</Text>
                    <Text style={[styles.textBody5, {color: 'blue'}]} onPress={() => navigation.navigate('SignUpSelector')}> Sign Up</Text>
                </View>
                <Text style={[styles.textBody5, {color: 'blue'}]} onPress={() => navigation.navigate('login')}> Go Back</Text>
                </View>
        </ScrollView>
      

    )
  }
  
  export default Login1

  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image:{
    width:400,
    height:300,
    marginBottom:5,
    paddingBottom:5,
      },

      inputContainer: {
        width: '90%',
      
       
      
      },
      inputContainer2: {
        width: '90%',
        borderWidth:5,
        borderColor:'white',
        backgroundColor:'blue',
        height:50,
        borderRadius:50,
      
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        fontSize:15
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom:10
      },
      button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
      },
    textTitle: {
        // fontFamily: 'Foundation',
        fontSize: 40,
        marginVertical: 10,
    },
    textBody: {
        // fontFamily: 'Foundation',
        fontSize: 16
    },
    textBody5: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 8,
        
        

    },
});

