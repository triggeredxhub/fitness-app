import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import TileButton from "../components/TileButton";
import Button from "../components/Button";
import colors from "../themes/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";
import { Ionicons } from "@expo/vector-icons"; // expo vector icons

type Props = NativeStackScreenProps<RootStackParamList, "Goal">;

export default function GoalScreen({route, navigation }: Props) {
  const { fitnessData } = route.params;
  const [selected, setSelected] = useState<string | null>(null);

  
  const totalSteps = 7;
  const currentStep = 6;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

       
      </View>

      {/* MAIN CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.contentHeader}>
            <Text style={styles.title}>What is your desired weight?</Text>
            <Text style={styles.subtitle}>
              This will be used to calibrate your custom plan.
            </Text>
          </View>

          <View style={styles.tileContainer}>
            <TileButton
              label="Lose Weight"
              selected={selected === "Lose Weight"}
              onPress={() => setSelected("Lose Weight")}
              align="left"
            />
            <TileButton
              label="Maintain"
              selected={selected === "Maintain"}
              onPress={() => setSelected("Maintain")}
              align="left"
            />
            <TileButton
              label="Gain Weight"
              selected={selected === "Gain Weight"}
              onPress={() => setSelected("Gain Weight")}
              align="left"
            />
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={() => {
            if(!selected) {
              console.log("No selection yet");
              return;
            }
            const updatedFitnessData = {
              ...fitnessData,
              goal: selected,
            };
            console.log("DesiredWeight screen:");
            navigation.navigate("DesiredWeight", { fitnessData: updatedFitnessData });
          }}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.purple,
    borderRadius: 2,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 20,
    height: 14,
    marginRight: 4,
    borderRadius: 2,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  contentHeader: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtext,
    textAlign: "left",
    lineHeight: 22,
  },
  tileContainer: {
    marginTop: 60,
    flexDirection: "column",
    
    gap: 10,
   
  },
  footer: {
    padding: 24,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor:colors.background,
    backgroundColor: colors.background,
  },
});
