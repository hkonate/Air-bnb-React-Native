import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen() {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        style={{
          width: 500,
          height: 500,
        }}
        source={require("../assets/lotties/56502-home-location.json")}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
