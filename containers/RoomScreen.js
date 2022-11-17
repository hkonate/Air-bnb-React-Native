import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Entypo } from "@expo/vector-icons";
import Color from "../Style/Color";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function RoomScreen() {
  const { params } = useRoute();
  const width = Dimensions.get("window").width;
  const arrayStars = [0, 0, 0, 0, 0];
  const { pink } = Color;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      let permissionResponse =
        await Location.requestForegroundPermissionsAsync();
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${params.userId}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [setData]);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={pink} />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.swipeContainer}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          showPagination
          removeClippedSubviews={true}
          data={data.photos}
          renderItem={({ item }) => (
            <View
              style={{
                width: width,
                height: 273,
              }}
            >
              <Image
                style={styles.offerImage}
                source={{
                  uri: item.url,
                }}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.offerPrice}>{data.price} €</Text>
      </View>
      <View style={styles.avatarContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            {data.title}
          </Text>
          <View style={styles.starsContainer}>
            {arrayStars.map((rate, index) => {
              return data.ratingValue > index ? (
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
            <Text style={styles.review}>{data.reviews} reviews</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", { userId: data.user._id });
          }}
        >
          <Image
            style={styles.avatarImage}
            source={{
              uri: data.user.account.photo.url,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.description} numberOfLines={display ? null : 3}>
          {data.description}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.descriptionDefilement,
          { display: display ? "none" : "flex" },
        ]}
        onPress={() => {
          setDisplay(true);
        }}
      >
        <Text style={styles.defilementText}>Show more</Text>
        <AntDesign name="caretdown" size={15} color="#888888" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.descriptionDefilement,
          { display: display ? "flex" : "none" },
        ]}
        onPress={() => {
          setDisplay(false);
        }}
      >
        <Text style={styles.defilementText}>Show less</Text>
        <AntDesign name="caretup" size={15} color="#888888" />
      </TouchableOpacity>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        }}
        style={{ height: 300, width: width }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  swipeContainer: {
    marginBottom: 15,
  },
  offerImage: {
    width: "100%",
    height: "100%",
    marginBottom: 5,
  },
  priceContainer: {
    width: 79,
    height: 51,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 213,
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
    marginBottom: 15,
  },
  avatarContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginLeft: "10%",
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
  description: {
    lineHeight: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  descriptionDefilement: {
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  defilementText: {
    color: "#B9B9B9",
    marginRight: 10,
  },
});
