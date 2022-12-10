// #6 Email Authentication using Firebase Authentication in React Native App
// https://aboutreact.com/react-native-firebase-authentication/

// Import React and Component
import React, { useEffect, useState } from "react";
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import MapView from 'react-native-maps';
import firebase from  '../firebase' 
import * as Location from 'expo-location';
const RiderHome = ({ navigation }) => {
  
  const [user, setUser] = useState();
  const [txt, setTxt] = useState('No ride');
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
 var [latt,setLatt]=useState(31.708632);
  var [long,setLong]=useState(76.52365);
var [isShown5,setIsShown5]=useState(false);
  var [id,setId]=useState('');
  var flag=false;
 var txtt='No Ride Found';
var id;
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
var [name,setName]=useState('Aaditya');

var [lat,setLat]=useState(31.708632);
  var [lon,setLon]=useState(76.52365);
  var tokyoRegion = {
    latitude: 31.708632,
    longitude: 76.52365,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  
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

let textt = 'Waiting..';
if (errorMsg) {
  textt = errorMsg;
} else if (location) {
  textt = JSON.stringify(location);
  // setLat(location.coords.latitude);
  // setLon(location.coords.longitude);
}


  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      
      setUser(user);
    });

    return subscriber;
  }, []);
  var text="No ride found!"
  var findRide=() =>{ 
    flag=true;
    setIsShown(true);
    setIsShown5(false);
    firebase.app().firestore()
  .collection('Ride Search')
  .get()
  .then(collectionSnapshot => {
      
      
      collectionSnapshot
        .forEach(documentSnapshot => {
            // text='Ride Found ' +documentSnapshot.data().name +' is looking for a ride';
            setTxt('Ride Found \n' +documentSnapshot.data().name +' is looking for a ride');
            setLatt(documentSnapshot.data().latitude);
            setLong(documentSnapshot.data().longitude);
            setId(documentSnapshot.id);
           
            // console.log(latt);
            // console.log(long);
            // console.log(id);
            if(id=='AClkIUPAqwW2KqSaUHdX')
            {
              setIsShown(false);
              setIsShown5(true);
              setIsShown2(false);
              setIsShown1(false);
            }
            else{
            setIsShown1(true);
            setIsShown2(true);
            }
            
        });
     
       
});
};
const reject=()=>{   
  var size;
  const usersCollection = firebase.app().firestore()
    .collection('Rider Search')
    .get()
    .then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        size=collectionSnapshot.size;
    });
    if(id=='AClkIUPAqwW2KqSaUHdX')
    {
      setIsShown(false);
      setIsShown5(true);
      setIsShown2(false);
      setIsShown1(false);
    }
    else{
      firebase.app().firestore()
      .collection('Ride Search')
      .doc(id)
      .delete()
      .then(() => {
          console.log('User Deleted!');
      });
     setIsShown2(false);
     setIsShown1(false);
     findRide();
      
    }
  
};
const accept=()=>{ 
  var tokyoRegion = {
    latitude: latt,
    longitude: long,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  setIsShown3(true);
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
      <View style={{ flex: 1, padding: 0 }}>
      {isShown3 && (
            <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={
        {
          latitude: latt,
    longitude: long,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
        }
      } //your region data goes here.
    >
      {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
      <Marker coordinate={tokyoRegion} />
    </MapView>
  </View>
      
      
  )}
      
      <Image 
                    source={require('../assets/login1.png')} 
                    resizeMode="center" 
                    style={styles.image} />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          {user ? (
            <Text 
              style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 180,
              paddingTop:20
            }}
            >
              Welcome Rider {" "}
              {user.displayName
                ? user.displayName
                : user.email}
                  
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle2}
            activeOpacity={0.5}
            onPress={findRide}
          >
            <Text style={styles.buttonTextStyle}>
             Find Rider

            </Text>
          
          </TouchableOpacity>
         
        
          {isShown && (
    <Text style={styles.textstyle}>
      {txt}
      </Text> 
      
      
  )}  

  {isShown5 && (
    <Text style={styles.textstyle}>
      {txtt}
      </Text> 
      
      
  )}


  {isShown1 && (
    <TouchableOpacity
            style={styles.buttonStyle3}
            activeOpacity={0.5}
            onPress={accept}
          >
            <Text style={styles.buttonTextStyle}>
           Accept

            </Text>
          
          </TouchableOpacity>
      
      
  )}
  {isShown2 && (
    <TouchableOpacity
            style={styles.buttonStyle4}
            activeOpacity={0.5}
            onPress={reject}
          >
            <Text style={styles.buttonTextStyle}>
            Reject

            </Text>
          
          </TouchableOpacity>
      
      
  )}
          
          
          <TouchableOpacity
            style={styles.buttonStyle1}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle1}>
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

export default RiderHome;

const styles = StyleSheet.create({
  textstyle:{
    fontSize:20,
    marginTop:15,
    alignItems: "center",
    textAlign:'center',
    lineHeight:40
  },
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
    minWidth: 200,
    backgroundColor: "red",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 60,
    alignItems: "center",
  marginTop:50,
  borderRadius:20,
  bottom:2
  },
  image:{
    width:390,
    height:300,
   
      },
  buttonStyle2: {
    minWidth: 200,
    backgroundColor: "#ADD8E6",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
  marginTop:30,
     borderRadius:10,
     marginBottom:10,
  },
  buttonStyle3: {
    minWidth: 100,
    backgroundColor: "green",
    borderWidth: 0,
    color: "FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
  marginTop:70,
  marginLeft:5,
  right:100,
  borderRadius:10
  
  },
  buttonStyle4: {
    minWidth: 100,
    backgroundColor: "red",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
 
  left:100,
  bottom:50,
  borderRadius:10
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize:20,
  },
  buttonTextStyle1: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize:30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    
    justifyContent: 'flex-end',
    alignItems: 'center',
   height:800,
   marginTop:20,
    borderColor:'black',
    zIndex:100
  },
});