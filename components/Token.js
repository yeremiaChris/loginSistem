import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
import axios from "axios";
export default function Register({ navigation }) {
  const toggleDrawer = ({ navigation }) => {
    navigation.openDrawer();
  };
  const showAlert = (title, message) =>
    Alert.alert("", message, [
      {
        text: "Ok",
        onPress: () => navigation.navigate(title),
      },
    ]);
  const kirim = (token, { resetForm }) => {
    const obj = {
      token: token,
    };
    axios
      .post("http://apidev.pluginesia.com/api/verify-email", obj)
      .then((data) => {
        resetForm();
        navigation.navigate("Login");
      })
      .catch((err) => {
        showAlert("Register", "Error");
        resetForm();
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{
        token: "",
      }}
      onSubmit={kirim}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text onPress={toggleDrawer} style={styles.textHeader}>
              MENU
            </Text>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <Text style={styles.regis}>Token </Text>
              <TextInput
                onChangeText={handleChange("token")}
                value={values.token}
                placeholder="Token dari email"
                style={styles.input}
              />
              <Button title="Kirim" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 20,
    padding: 10,
  },
  regis: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  regisButton: {
    width: "50%",
  },
  containerButton: {
    display: "flex",
    alignItems: "flex-end",
  },
  header: {
    backgroundColor: "purple",
    height: 80,
    display: "flex",
    justifyContent: "center",
  },
  textHeader: {
    color: "white",
    marginLeft: 10,
  },
});
