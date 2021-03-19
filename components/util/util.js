import * as Yup from "yup";
import axios from "axios";
import { AsyncStorage } from "react-native";
import { Alert } from "react-native";

export const regisSchema = Yup.object().shape({
  fullName: Yup.string().required("The FullName field is required."),
  email: Yup.string()
    .email("The Email field is not a valid e-mail address.")
    .required("The Email field is required."),
  password: Yup.string()
    .required("The Password field is required.")
    .min(
      6,
      "The field Password must be a string or array type with a minimum length of '6'."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("The ConfirmPassword field is required."),
});

export const tokenSchema = Yup.object().shape({
  token: Yup.string().required("The Token field is required."),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("The Email field is not a valid e-mail address.")
    .required("The Email field is required."),
  password: Yup.string()
    .required("The Password field is required.")
    .min(
      6,
      "The field Password must be a string or array type with a minimum length of '6'."
    ),
});

// login
// alert login
const showAlert = (message) =>
  Alert.alert("", message, [
    {
      text: "Ok",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
  ]);
export const login = (data, resetForm, setUser) => {
  const obj = {
    email: data.email,
    password: data.password.toString(),
  };
  axios({
    method: "POST",
    url: "http://apidev.pluginesia.com/api/authenticate",
    headers: {
      "Content-Type": "application/json",
    },
    data: obj,
  })
    .then((res) => {
      let UID123_object = {
        isVerified: false,
        jwtToken: "",
      };
      let UID123_delta = {
        isVerified: res.data.data.isVerified,
        jwtToken: res.data.data.jwtToken,
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
      err.response.data.message !== undefined
        ? showAlert(err.response.data.message)
        : null;
      resetForm();
    });
};
export const logoutAction = async (setUser) => {
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
