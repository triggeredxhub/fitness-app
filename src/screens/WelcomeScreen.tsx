import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";
import colors from "../themes/colors";



// Define navigation prop types
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen(props: Props) {
  const { navigation } = props; // destructure navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VISUALS</Text>

      <View style={styles.buttonContainer}>
        <Button title="Get Started" onPress={() => navigation.navigate("Gender", { fitnessData: {} })} variant="secondary"/>
        <Button
          title="Already have an account?"
          onPress={() => console.log("Navigate to login")}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centers "VISUALS"
    alignItems: "center",
    backgroundColor: "#fafbfa",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 40,
    color: colors.text,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0, // Stick to bottom
    left: 0,
    right: 0,
    backgroundColor: colors.purple, // dark purple background
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

