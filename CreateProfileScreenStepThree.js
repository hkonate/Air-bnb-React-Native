import { Text, View, ScrollView, StyleSheet } from "react-native";

import Fields from "../components/Fields";
import LogButton from "../components/LogButtons";
import Json from "../assets/json/en.json"
import { useState } from "react"

const CreateProfileScreenStepThree = ({ profileState, navigation }) => {
    const [errorMsg, setErrorMsg] = useState(null)
    const { createProfile } = Json
    const { nickName, city, setCity, setNickName, setLanguage, language, pressed, setPressed } = profileState
    const obj = {
        width: 318,
        pressed,
        setPressed,
        setErrorMsg,
        navigate: navigation.navigate,
        path: "Step 4",
        nickName,
        city,
        setCity,
        setNickName,
        setLanguage,
        language,
        currentPage: "Step 3"
    }
    return <ScrollView style={styles.profil} contentContainerStyle={{ alignItems: "center" }}>
        <View style={styles.nickName}>
            <Fields text={createProfile.nickName} {...obj} />
        </View>
        {
            (errorMsg && !nickName) && <Text style={{ color: "red" }}>{errorMsg}</Text>
        }
        <View style={styles.city}>
            <Fields text={createProfile.city} {...obj} />
        </View>
        {
            (errorMsg && !language) && <Text style={{ color: "red" }}>{errorMsg}</Text>
        }
        <View style={styles.language}>
            <Fields text={createProfile.nativeLanguage} {...obj} />
        </View>
        <View style={styles.btn}>
            <LogButton text={createProfile.button_1} {...obj} />
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    profil: {
        backgroundColor: "white",
        flex: 1,
    },
    nickName: {
        marginTop: 234,
    },
    city: {
        marginTop: 15,
    },
    language: {
        marginTop: 15,
    },
    btn: {
        marginTop: 130
    }
})

export default CreateProfileScreenStepThree