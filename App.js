import * as React from "react";
import { Button, View, Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./components/Register";
import Login from "./components/Login";
import Token from "./components/Token";
import TextSatu from "./components/TextSatu";
import TextDua from "./components/TextDua";
import { login, logoutAction } from "./components/util/util";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AsyncStorage } from "react-native";

const Drawer = createDrawerNavigator();

// login
// alert error

// alert login
const showAlert = (message) =>
  Alert.alert("", message, [
    {
      text: "Ok",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
  ]);

export default function App() {
  // error handling login
  const [error, setError] = React.useState({
    error: [],
  });

  // user state
  const [user, setUser] = React.useState({
    isVerified: false,
    jwtToken: "",
  });

  // useEffect mengenali user
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

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => logoutAction(setUser)} />
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
            {(props) => <Login {...props} login={login} setUser={setUser} />}
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
