import * as React from "react";
import { Button, View, Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./components/Register";
import Login from "./components/Login";
import Token from "./components/Token";
import TextSatu from "./components/TextSatu";
import TextDua from "./components/TextDua";
import { AsyncStorage } from "react-native";
import axios from "axios";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

// login
const showAlert = (message) =>
  Alert.alert("", message, [
    {
      text: "Ok",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
  ]);

export default function App() {
  const [user, setUser] = React.useState({
    isVerified: false,
    jwtToken: "",
  });

  React.useEffect(() => {
    AsyncStorage.getItem("USER", (err, result) => {
      const obj = JSON.parse(result);
      obj === null
        ? null
        : setUser({
            isVerified: obj.isVerified,
            jwtToken: obj.jwtToken,
          });
    });
  }, []);

  // function login
  const login = (data, resetForm, navigation) => {
    const obj = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("http://apidev.pluginesia.com/api/authenticate", obj)
      .then((data) => {
        let UID123_object = {
          isVerified: false,
          jwtToken: "",
        };
        let UID123_delta = {
          isVerified: data.data.data.isVerified,
          jwtToken: data.data.data.jwtToken,
        };
        AsyncStorage.setItem("USER", JSON.stringify(UID123_object), () => {
          AsyncStorage.mergeItem("USER", JSON.stringify(UID123_delta), () => {
            AsyncStorage.getItem("USER", (err, result) => {
              const obj = JSON.parse(result);
              console.log(obj);
              setUser({
                isVerified: obj.isVerified,
                jwtToken: obj.jwtToken,
              });
            });
          });
        });
        resetForm();
        showAlert("Anda sudah login");
      })
      .catch((err) => {
        showAlert("ada yang salah");
        console.log(err);
      });
  };

  const logoutAction = async () => {
    try {
      await AsyncStorage.removeItem("USER");
      setUser({
        isVerified: false,
        jwtToken: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={logoutAction} />
      </DrawerContentScrollView>
    );
  }
  return (
    <NavigationContainer>
      {!user.isVerified ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Register">
            {(props) => <Register {...props} />}
          </Drawer.Screen>
          <Drawer.Screen name="Login">
            {(props) => <Login {...props} login={login} />}
          </Drawer.Screen>
          <Drawer.Screen name="Token" component={Token} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Text Satu" component={TextSatu} />
          <Drawer.Screen name="Text Dua" component={TextDua} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
