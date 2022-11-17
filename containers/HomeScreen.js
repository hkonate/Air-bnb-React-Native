import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      if (response.data) {
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const arrayStars = [0, 0, 0, 0, 0];

  return isLoading ? (
    <SplashScreen />
  ) : (
    <FlatList
      style={{ paddingHorizontal: 20 }}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={styles.offerContainer}
            onPress={async () => {
              navigation.navigate("Room", { userId: item._id });
            }}
          >
            <View>
              <Image
                style={styles.offerImage}
                source={{
                  uri: item.photos[0].url,
                }}
              />
              <View style={styles.priceContainer}>
                <Text style={styles.offerPrice}>{item.price} €</Text>
              </View>
            </View>
            <View style={styles.avatarContainer}>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.titleText}>
                  {item.title}
                </Text>
                <View style={styles.starsContainer}>
                  {arrayStars.map((rate, index) => {
                    return item.ratingValue > index ? (
                      <Entypo
                        key={index}
                        style={styles.stars}
                        name="star"
                        size={24}
                        color="#FFBC25"
                      />
                    ) : (
                      <Entypo
                        key={index}
                        style={styles.stars}
                        name="star"
                        size={24}
                        color="#B0B0B0"
                      />
                    );
                  })}
                  <Text style={styles.review}>{item.reviews} reviews</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", { userId: item.user._id });
                }}
              >
                <Image
                  style={styles.avatarImage}
                  source={{
                    uri: item.user.account.photo.url,
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
  // <Button
  //   title="Go to Profile"
  //   onPress={() => {
  //     navigation.navigate("Profile", { userId: 123 });
  //   }}
  // />
}

const styles = StyleSheet.create({
  offerContainer: {
    paddingBottom: 10,
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  offerImage: {
    width: 371,
    height: 200,
    marginBottom: 10,
  },
  priceContainer: {
    width: 99,
    height: 51,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 140,
  },
  offerPrice: {
    color: "white",
    fontSize: 20,
  },
  titleContainer: {
    width: "75%",
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: "row",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginLeft: "5%",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    marginRight: 5,
  },
  review: {
    color: "#D4D4D4",
    fontSize: 16,
  },
});
