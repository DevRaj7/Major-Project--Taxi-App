// #6 Email Authentication using Firebase Authentication in React Native App
// https://aboutreact.com/react-native-firebase-authentication/

// Import React and Component
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from 'expo-location';

import firebase from  '../firebase' ;
import MapView from 'react-native-maps';

const Home = ({ navigation }) => {
  const [user, setUser] = useState();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  var [name,setName]=useState('Aaditya');
  var lat=31.708447;
  var lon=76.52371;
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    lat=location.coords.latitude;
    lon=location.coords.longitude;
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      console.log("user", JSON.stringify(user));
      setUser(user); 
      if(user)
      {
        setName(user.displayName
          ? user.displayName
          : user.email);
        }
    });

    return subscriber;
  }, []);

  const FindRide=()=>{
    firebase.app().firestore()
    .collection('Ride Search')
    .add({
       name: name,
        latitude: lat,
        longitude: lon,
    })
    .then(() => {
        
        setTimeout(()=>{
                alert("taxi is on the way");
        },5000);
    });
  };
  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure? You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => {
            firebase.auth()
              .signOut()
              .then(() => navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Auth");
                else alert(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <View style={styles.container}>
     <MapView
       //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: lat,
         longitude: lon,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
      <View style={{ flex: 1, padding: 16,marginTop:590}}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          {user ? (
            <Text  style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 16,
              
            }}>
              Welcome {" "}
              {user.displayName
                ? user.displayName
                : user.email}
            </Text>
          ) : null}
         <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={FindRide}
           
          >
            <Text style={styles.buttonTextStyle}>
              Find Your Ride 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle1}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "grey",
          }}
        >
          
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
         
        </Text>
      </View>
     
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    margin:10
  },
  buttonStyle1: {
    minWidth: 300,
    backgroundColor: "#FF0000",
    borderWidth: 0,
    color: "#FF0000",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginTop:5
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 580,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth:2,
    borderColor:'black'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});