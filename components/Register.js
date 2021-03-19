import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { regisSchema } from "./util/util";
export default function Register({ navigation }) {
  // alert
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

  // function regis
  const regis = async (data, { resetForm }) => {
    const obj = {
      title: "User",
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      acceptTerms: true,
    };
    axios({
      method: "POST",
      url: "http://apidev.pluginesia.com/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: obj,
    })
      .then((res) => {
        console.log(res);
        resetForm();
        showAlert("Token", res.data.message);
      })
      .catch((err) => {
        err.response.data.message !== undefined
          ? showAlert("Register", err.response.data.message)
          : null;
        resetForm();
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
      validationSchema={regisSchema}
      onSubmit={regis}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
      }) => (
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
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                placeholder="Fullname"
                style={styles.input}
              />
              {errors.fullName && touched.fullName ? (
                <Text style={styles.error}>{errors.fullName}</Text>
              ) : null}
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
                style={styles.input}
              />
              {errors.email && touched.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
                style={styles.input}
              />
              {errors.password && touched.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}
              <TextInput
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={true}
                placeholder="Confirm Password"
                style={styles.input}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              ) : null}
              <Button title="Register" onPress={handleSubmit} />
              <View style={styles.reset}>
                <Button title="Reset" color="red" onPress={resetForm} />
              </View>
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
  error: {
    color: "red",
  },
  reset: {
    marginTop: 10,
  },
});
