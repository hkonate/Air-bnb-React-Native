import { Button, Text, View, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import MapView from 'react-native-maps'
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location"
import axios from 'axios'
import Color from "../Style/Color";

export default function AroundMeScreen() {
    const [apartments, setApartmens] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { pink } = Color
    const navigation = useNavigation()

    useEffect(() => {
        const fecthData = async () => {
            let permissionResponse = await Location.requestForegroundPermissionsAsync();
            const { data } = await axios.get("https://express-airbnb-api.herokuapp.com/rooms/around")
            console.log(data);
            setApartmens(data)
            setIsLoading(false)
        }
        fecthData()
    }, [])
    console.log(apartments);
    return (isLoading ?
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={pink} />
        </View> :
        <ScrollView>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    latitude: apartments[0].location[1],
                    longitude: apartments[0].location[0],
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.4,
                }}
            >
                {
                    apartments.map((apart, index) => {
                        return (<MapView.Marker
                            onPress={() => {
                                navigation.navigate("Room", { userId: apartments[index]._id })
                            }}
                            key={index}
                            coordinate={{
                                latitude: apart.location[1],
                                longitude: apart.location[0],
                            }}
                        />)
                    })
                }
            </MapView>

        </ScrollView>
    );
}
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    map: {
        width: width,
        height: height,
    },
})