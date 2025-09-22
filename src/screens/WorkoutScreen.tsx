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

import Button from "../components/Button";
import colors from "../themes/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";
import { Ionicons } from "@expo/vector-icons"; // expo vector icons
import InfoTile from "../components/InfoTile";

type Props = NativeStackScreenProps<RootStackParamList, "Workout">;

export default function WorkoutScreen({ route, navigation }: Props) {
  const { fitnessData } = route.params;
  
  const [selected, setSelected] = useState<string | null>(null);

  // Progress bar: Workout is step 3 of 7
  const totalSteps = 7;
  const currentStep = 3;
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
            <Text style={styles.title}>
              How many workouts do you do per week?
            </Text>
            <Text style={styles.subtitle}>
              This will be used to calibrate your custom plan.
            </Text>
          </View>

          <View style={styles.tileContainer}>
            <InfoTile
              icon="radio-button-on"
              title="0-2"
              subtitle="Workouts now and then"
              selected={selected === "0-2"}
              onPress={() => setSelected("0-2")}
            />
            <InfoTile
              icon="ellipsis-vertical-sharp"
              title="3-5"
              subtitle="A few workouts per week"
              selected={selected === "3-5"}
              onPress={() => setSelected("3-5")}
            />
            <InfoTile
              icon="grid"
              title="6+"
              subtitle="Dedicated athlete"
              selected={selected === "6+"}
              onPress={() => setSelected("6+")}
            />
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={() => {
            if (!selected) {
              console.log("No selection yet");
              return;
            }
            const updatedFitnessData = {
              ...fitnessData,
              workoutsPerWeek: selected,
            };
            console.log("workout screen");

            navigation.navigate("HeightWeight", {
              fitnessData: updatedFitnessData,
            });
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
  //   languageContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
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
    alignItems: "flex-start",
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
    borderTopColor: colors.background,
    backgroundColor: colors.background,
  },
});
