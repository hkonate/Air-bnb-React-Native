import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import Color from "../Style/Color";

const { lightpink, pink, lightgrey } = Color;

export default function SettingsScreen({ setToken, token }) {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const navigation = useNavigation();

  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (result.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.uri);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      setSelectedPicture(result.uri);
    } else {
      alert("Permission refusée");
    }
  };

  const updateInfos = async () => {
    if (selectedPicture) {
      let tab = selectedPicture.split(".");
      const extension = tab[tab.length - 1];
      tab.pop();
      tab = tab.join(".");
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `photo.${extension}`,
        type: `image/${extension}`,
      });

      try {
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/upload_picture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            {selectedPicture && (
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 50 }}
                source={{ uri: selectedPicture }}
              />
            )}
          </View>
          <View>
            <Entypo
              onPress={getPermissionAndGetPicture}
              style={{ marginBottom: 45 }}
              name="images"
              size={35}
              color="grey"
            />
            <MaterialIcons
              onPress={getPermissionAndTakePicture}
              name="photo-camera"
              size={35}
              color="grey"
            />
          </View>
        </View>
        <TextInput
          style={styles.inputBorderTop}
          placeholder="Email"
        ></TextInput>
        <TextInput style={styles.inputBorderTop} placeholder="Name"></TextInput>
        <TextInput
          style={styles.multiline}
          placeholder="Description"
          multiline={true}
          numberOfLines={5}
        ></TextInput>

        <TouchableOpacity onPress={updateInfos} style={styles.btnTop}>
          <Text style={styles.textBtn}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBottom}>
          <Text
            onPress={() => {
              setToken(null);
            }}
            style={styles.textBtn}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 30,
    paddingBottom: 40,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  imageContainer: {
    width: 171,
    height: 166,
    borderColor: lightpink,
    borderWidth: 2,
    borderRadius: 83,
    marginRight: 20,
    overflow: "hidden",
  },
  inputBorderTop: {
    borderBottomWidth: 2,
    borderBottomColor: lightpink,
    marginBottom: 30,
    paddingBottom: 4,
    width: "100%",
  },
  multiline: {
    borderColor: lightpink,
    borderWidth: 2,
    width: "100%",
    textAlignVertical: "top",
    padding: 10,
    marginBottom: 60,
  },
  btnTop: {
    borderColor: pink,
    width: 228,
    height: 67,
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBottom: {
    borderColor: pink,
    width: 228,
    height: 67,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightgrey,
  },
  textBtn: {
    fontSize: 18,
    color: "grey",
  },
});
