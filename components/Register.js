import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
import axios from "axios";
export default function Register({ navigation }) {
  const showAlert = (title, message) =>
    Alert.alert("", message, [
      {
        text: "Ok",
        onPress: () => navigation.navigate(title),
      },
    ]);
  const toggleDrawer = () => {
    navigation.openDrawer();
  };
  const regis = (data, { resetForm }) => {
    const obj = {
      title: "User",
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      acceptTerms: true,
    };
    // showAlert();
    axios
      .post("http://apidev.pluginesia.com/api/register", obj)
      .then((data) => {
        console.log(data);
        resetForm();
        showAlert("Token", data.data.message);
      })
      .catch((err) => {
        resetForm();
        showAlert("Register", "Error");
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={regis}
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
              <Text style={styles.regis}>Register </Text>
              <TextInput
                onChangeText={handleChange("fullName")}
                value={values.fullName}
                placeholder="Fullname"
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
                style={styles.input}
              />
              <TextInput
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={true}
                placeholder="Confirm Password"
                style={styles.input}
              />
              <Button title="Register" onPress={handleSubmit} />
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
