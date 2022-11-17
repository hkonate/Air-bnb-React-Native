import { useNavigation } from "@react-navigation/core";
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator } from "react-native";
import axios from 'axios'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useState } from "react";
import Color from "../Style/Color"

export default function SignInScreen({ setToken }) {
  const [isSecure, setIsSecure] = useState(true);
  const [errormsg, setErrormsg] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.signUpContainer}>
        <View style={styles.logoContainer}><Image style={styles.logo} source={{
          uri: "https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png"
        }} /></View>
        <Text style={styles.title} >Sign in</Text>
        <View>
          <TextInput
            style={[styles.inputBorderTop, { marginBottom: Platform.OS === "android" ? 20 : 30 }]}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text)
            }} />
          <TouchableOpacity onPress={() => {
            setIsSecure(false)
          }}>
            <FontAwesome
              name="eye-slash"
              size={24}
              color="black"
              style={[styles.hidePwd, { top: Platform.OS === 'android' ? 0 : -10, display: isSecure ? "flex" : "none" }]} /></TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setIsSecure(true)
          }}>
            <FontAwesome
              name="eye"
              size={24}
              color="black"
              style={[styles.hidePwd, { top: Platform.OS === 'android' ? 0 : -10, display: isSecure ? "none" : "flex" }]}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.inputBorderBottom}
            placeholder="Password"
            secureTextEntry={isSecure}
            value={password}
            onChangeText={(text) => {
              setPassword(text)
            }} />

          <View style={styles.btnContainer}>
            {isLoading ?
              <View style={{ display: isLoading ? "flex" : "none", marginBottom: 20 }}>
                <ActivityIndicator size="large" color={pink} />
              </View> :
              <Text style={styles.errorMsg}>{errormsg}</Text>
            }
            <TouchableOpacity
              style={styles.signInBtn}
              disabled={isLoading ? true : false}
              onPress={async () => {
                try {
                  if (password && email) {
                    setIsLoading(true)
                    const response = await axios.post(" https://express-airbnb-api.herokuapp.com/user/log_in", {
                      email: email,
                      password: password,
                    })
                    setIsLoading(false)
                    console.log(response.data.token);
                    setToken(response.data.token)
                    alert('Connected')
                  } else {
                    setErrormsg("Please fill all fields")
                  }
                } catch (error) {
                  if (error.response.status === 401) {
                    setIsLoading(false)
                    setErrormsg("Unauthorized")
                  }
                }

              }}
            >
              <Text style={styles.btnText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.navigateContainer}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.navigateText}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView >

  );
}
const width = Dimensions.get("window").width;
const { pink, lightpink, grey, lightgrey } = Color
const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  signUpContainer: {
    backgroundColor: "white",
    flex: 1,
    width: width,
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 30
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 25,
    color: grey,
    textAlign: "center",
    marginBottom: 100,
  },
  inputBorderTop: {
    borderBottomWidth: 2,
    borderBottomColor: lightpink,
    marginBottom: 30,
    paddingBottom: 4
  },
  inputBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: lightpink,
    marginBottom: 140,
    paddingBottom: 4,
  },
  hidePwd: {
    position: "absolute",
    left: 330,
  },
  errorMsg: {
    marginBottom: 20,
    color: "#F97B7E"
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  signInBtn: {
    width: 202,
    height: 59,
    backgroundColor: "white",
    borderColor: pink,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  btnText: {
    color: grey,
    fontSize: 22
  },
  navigateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navigateText: {
    color: "#C6C6C6",
    marginBottom: 45
  },
})