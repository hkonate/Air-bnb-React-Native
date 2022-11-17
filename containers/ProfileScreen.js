import { useRoute } from "@react-navigation/core";
import { Text, View, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from "./SplashScreen";
import Color from "../Style/Color";
import axios from "axios";

const { lightpink, pink, lightgrey } = Color;
export default function ProfileScreen({ token }) {
  const { params } = useRoute();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(token);
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <SplashScreen />
  ) : (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.infosContainer}>
          <Text style={styles.name}>{data.username},</Text>
          <Text style={{ color: lightpink }}>{data.email}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.imageUser} source={{ uri: data.photo.url }} />
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descTitle}>Bio</Text>
          <Text style={styles.descText}>
            {data.description && data.description}
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  infosContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    color: pink,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  imageUser: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  descContainer: {
    paddingHorizontal: 5,
  },
  descTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
