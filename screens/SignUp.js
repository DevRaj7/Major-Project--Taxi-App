import React ,{useState,createRef} from 'react';
import {View,KeyboardAvoidingView,Keyboard, StyleSheet, Text,TextInput, Image,SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';

import Input from '../components/Inputs';
import Submit from '../components/Submit';
import firebase from '../firebase'
const SignUp = ({ navigation }) => {
    const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext("");
    if (!name) return alert("Please fill Name");
    if (!email) return alert("Please fill Email");
    if (!password) return alert("Please fill Address");

    firebase.auth().createUserWithEmailAndPassword(
        email,
       password
      )
      .then((user) => {
        console.log(
          "Registration Successful. Please Login to proceed"
        );
        console.log(user);
        if (user) {
         firebase.auth()
            .currentUser.updateProfile({
              displayName: name,
              photoURL:
                "https://aboutreact.com/profile.png",
            })
            .then(() => navigation.replace("Home"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext(
            "That email address is already in use!"
          );
        } else {
          setErrortext(error.message);
        }
      });
  };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FEAFAF" }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
          }}
        >
            <View style={styles.container}> 
                <Image source={require('../assets/login1.png')} resizeMode="center" style={styles.image} />
                <Text style={styles.textTitle}>Let's Get Started</Text>
                <Text style={styles.textBody}>Create an account to get all features</Text>
                <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(name) =>
                setName(name)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) =>
                setEmail(email)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) =>
                setPassword(password)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext}{" "}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.7}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textBody5}>Already have an account ?</Text>
                    <Text style={[styles.textBody5, {color: 'blue'}]} onPress={() => navigation.navigate('login')}> Login here</Text>
 
                </View>
                
            </View>
            
        </ScrollView>  
        </SafeAreaView>  
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sectionStyle: {
        flexDirection: "row",
        height: 50,
        marginTop: 20,
      
        width:'80%'
      },
      buttonStyle: {
        
        backgroundColor:'green',
        width:100,
       height:60,
        borderRadius:10,
        alignItems:'center',
        alignSelf:'center',
        borderWidth:5,
        borderColor:'white',
        justifyContent:'center',
        marginTop:17
      },
      buttonTextStyle: {
        color: "#FdFFcF",
        paddingVertical: 10,
        fontSize: 15,
      },
      inputStyle: {
        flex: 1,
        fontWeight:'bold',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "black",
      },
      errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
      },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 40,
        // fontFamily: 'Foundation',
        marginVertical: 5
    },
    textBody: {
        fontSize: 16,
        // fontFamily: 'Foundation'
    },
    textBody5: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 8,
        
        

    },
});

export default SignUp;