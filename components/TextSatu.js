import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native";
import { Formik } from "formik";
export default function Register({ navigation }) {
  const toggleDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Formik
      initialValues={{
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text onPress={toggleDrawer} style={styles.textHeader}>
              MENU
            </Text>
          </View>
          <Text style={styles.textSatu}>Ini Text Satu</Text>
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
  textSatu: {
    marginLeft: 10,
  },
});
