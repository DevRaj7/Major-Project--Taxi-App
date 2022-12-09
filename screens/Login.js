import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';


const Login = props => {
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <Image 
                    source={require('../assets/login1.png')} 
                    resizeMode="center" 
                    style={styles.image} />
                <Text style={styles.textTitle}>Welcome to MyCab</Text>
                <Text style={styles.textBody4}>Log In</Text>
                <View style={{marginTop: 20}} />
                
               
                <View style={{flexDirection: 'column', marginVertical: 5}}>
                <View style={styles.container3}>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Image 
                    source={require('../assets/Rider.png')} 
                    resizeMode="center" 
                    style={styles.image2} />
                    <Text style={[styles.textBody2, {color: 'blue'}]} onPress={() => props.navigation.navigate('Login1')}> Passenger</Text>
                </View>
                </View>
                <View style={styles.container3}>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Image 
                    source={require('../assets/cab.png')} 
                    resizeMode="center" 
                    style={styles.image2} />
                    <Text style={[styles.textBody3, {color: 'blue'}]} onPress={() => props.navigation.navigate('Login2')}> Driver</Text>
                </View>
                </View>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                    <Text style={styles.textBody5}>Dont Have an account ?</Text>
                    <Text style={[styles.textBody5, {color: 'blue'}]} onPress={() => props.navigation.navigate('SignUpSelector')}> Sign Up</Text>
                </View>
              
            </View>
        </ScrollView>      
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    container3: {
       
        textAlign:'center',
        backgroundColor:'#68abdf',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        margin: 5,
        width:300,
        color:'black',
       
      

        
    },
    container2:{
        width: '90%',
        height: 50,
        borderColor: 'blue',
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 0,
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10
    },
    image2: {
        width: 100,
        height: 100,
        marginVertical: 10
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
    textBody2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 10,

    },
    textBody3: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 10,
        paddingLeft: 30,

    },
    textBody4: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'green',
        alignSelf: 'center',
        

    },
    textBody5: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        margin: 8,
        
        

    },

});

export default Login