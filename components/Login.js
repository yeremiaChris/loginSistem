import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
import axios from "axios";

export default function Register({ navigation, login }) {
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(data, { resetForm }) => login(data, resetForm, navigation)}
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
              <Text style={styles.regis}>Login </Text>
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