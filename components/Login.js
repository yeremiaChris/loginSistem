import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
import axios from "axios";

export default function Register({ navigation, login, error }) {
  const toggleDrawer = () => {
    navigation.openDrawer();
  };
  console.log(error);
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
              {error.error.map((item, key) => {
                return (
                  <View key={key}>
                    {item.Email === undefined ? null : item.Email.length ===
                      1 ? (
                      <Text style={styles.error}> {item.Email[0]}</Text>
                    ) : (
                      <View>
                        <Text style={styles.error}>{item.Email[0]}</Text>
                        <Text style={styles.error}>{item.Email[1]}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                placeholder="Email"
                style={styles.input}
              />
              {error.error.map((item, key) => {
                return (
                  <Text key={key} style={{ color: "red" }}>
                    {item.Password === undefined
                      ? null
                      : item.Password.map((item) => item.toString())}
                  </Text>
                );
              })}
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
                style={styles.input}
              />
              <Button title="Login" onPress={handleSubmit} />
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
  error: {
    color: "red",
  },
});
