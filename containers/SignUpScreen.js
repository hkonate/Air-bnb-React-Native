import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { useState } from "react";
import Color from "../Style/Color";

export default function SignUpScreen({ setToken }) {
  const [isSecure, setIsSecure] = useState(true);
  const [isSecureSecond, setIsSecureSecond] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [description, setDescription] = useState(null);
  const [passwordConfirmed, setPasswordConfirmed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.signUpContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png",
            }}
          />
        </View>
        <Text style={styles.title}>Sign up</Text>
        <View>
          <TextInput
            style={[
              styles.inputBorderTop,
              { marginBottom: Platform.OS === "android" ? 20 : 30 },
            ]}
            placeholder="username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={[
              styles.inputBorderTop,
              { marginBottom: Platform.OS === "android" ? 20 : 30 },
            ]}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={[
              styles.multilines,
              { marginBottom: Platform.OS === "android" ? 20 : 30 },
            ]}
            placeholder="Describe yourself in a few words..."
            multiline={true}
            numberOfLines={5}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsSecure(false);
            }}
          >
            <FontAwesome
              name="eye-slash"
              size={24}
              color="black"
              style={[
                styles.hidePwd,
                {
                  top: Platform.OS === "android" ? 0 : -10,
                  display: isSecure ? "flex" : "none",
                },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsSecure(true);
            }}
          >
            <FontAwesome
              name="eye"
              size={24}
              color="black"
              style={[
                styles.hidePwd,
                {
                  top: Platform.OS === "android" ? 0 : -10,
                  display: isSecure ? "none" : "flex",
                },
              ]}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.inputBorderBottom}
            placeholder="password"
            secureTextEntry={isSecure}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setIsSecureSecond(false);
            }}
          >
            <FontAwesome
              name="eye-slash"
              size={24}
              color="black"
              style={[
                styles.hidePwd,
                {
                  top: Platform.OS === "android" ? 0 : -10,
                  display: isSecureSecond ? "flex" : "none",
                },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsSecureSecond(true);
            }}
          >
            <FontAwesome
              name="eye"
              size={24}
              color="black"
              style={[
                styles.hidePwd,
                {
                  top: Platform.OS === "android" ? 0 : -10,
                  display: isSecureSecond ? "none" : "flex",
                },
              ]}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.inputBorderBottom}
            placeholder="confirm password"
            secureTextEntry={isSecureSecond}
            value={passwordConfirmed}
            onChangeText={(text) => {
              setPasswordConfirmed(text);
            }}
          />

          <View style={styles.btnContainer}>
            {isLoading ? (
              <View
                style={{
                  display: isLoading ? "flex" : "none",
                  marginBottom: 20,
                }}
              >
                <ActivityIndicator size="large" color={pink} />
              </View>
            ) : (
              <Text style={styles.errorMsg}>{errormsg}</Text>
            )}
            <TouchableOpacity
              style={styles.signUpBtn}
              disabled={isLoading ? true : false}
              onPress={async () => {
                try {
                  if (password && email && username && description) {
                    let same = false;
                    if (password.length === passwordConfirmed.length) {
                      same = true;
                      setErrormsg(null);
                      for (let i = 0; i < password.length; i++) {
                        if (password[i] !== passwordConfirmed[i]) {
                          same = false;
                          break;
                        }
                      }
                    }
                    if (same) {
                      setIsLoading(true);
                      const response = await axios.post(
                        " https://express-airbnb-api.herokuapp.com/user/sign_up",
                        {
                          email: email,
                          password: password,
                          username: username,
                          description: description,
                        }
                      );
                      setIsLoading(false);
                      if (response.data) {
                        setToken(response.data.token);
                        alert("Signup succeed");
                      }
                    } else {
                      setErrormsg("Please fill all fields");
                    }
                  } else {
                    setErrormsg("Passwords must be the same");
                  }
                } catch (error) {
                  if (error.response.status === 400) {
                    setIsLoading(false);
                    setErrormsg("username or email already exist");
                  }
                }
              }}
            >
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.navigateContainer}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.navigateText}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const { pink, lightpink, grey, lightgrey } = Color;
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
    marginTop: 45,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 25,
    color: grey,
    textAlign: "center",
    marginBottom: 40,
  },
  inputBorderTop: {
    borderBottomWidth: 2,
    borderBottomColor: lightpink,
    marginBottom: 30,
    paddingBottom: 4,
  },
  multilines: {
    borderColor: lightpink,
    borderWidth: 2,
    textAlignVertical: "top",
    marginTop: 15,
    padding: 10,
  },
  inputBorderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: lightpink,
    marginBottom: 30,
    paddingBottom: 4,
  },
  hidePwd: {
    position: "absolute",
    left: 330,
  },
  errorMsg: {
    marginBottom: 20,
    color: "#F97B7E",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpBtn: {
    width: 202,
    height: 59,
    backgroundColor: "white",
    borderColor: pink,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnText: {
    color: grey,
    fontSize: 22,
  },
  navigateContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navigateText: {
    color: "#C6C6C6",
    marginBottom: 45,
  },
});
