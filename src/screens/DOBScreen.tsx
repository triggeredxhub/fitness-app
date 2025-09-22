import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import Button from "../components/Button";
import colors from "../themes/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";
import { Ionicons } from "@expo/vector-icons";
import WheelPicker from "@quidone/react-native-wheel-picker";

type Props = NativeStackScreenProps<RootStackParamList, "DOB">;

export default function DOBScreen({ route, navigation }: Props) {
  const { fitnessData } = route.params;
  const totalSteps = 7;
  const currentStep = 5;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  const [month, setMonth] = useState(0);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2000);

  // Generate options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((m, i) => ({ label: m, value: i }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

  const years = Array.from({ length: 123 }, (_, i) => {
    const y = 2023 - i; // last 123 years
    return { label: `${y}`, value: y };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>

      {/* CONTENT */}
      <View style={styles.container}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>When were you born?</Text>
          <Text style={styles.subtitle}>
            This will be used to calibrate your custom plan.
          </Text>
        </View>

        {/* Date pickers */}
        <View style={styles.pickerRow}>
          {/* Month */}
          <WheelPicker
            data={months}
            value={month}
            onValueChanged={(e) => setMonth(e.item.value)}
            style={styles.picker}
            visibleItemCount={5}
          />
          {/* Day */}
          <WheelPicker
            data={days}
            value={day}
            onValueChanged={(e) => setDay(e.item.value)}
            style={styles.picker}
            visibleItemCount={5}
            width={80}
          />
          {/* Year */}
          <WheelPicker
            data={years}
            value={year}
            onValueChanged={(e) => setYear(e.item.value)}
            style={styles.picker}
            visibleItemCount={5}
            width={100}
          />
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          title="Next"
          onPress={() => {
            const dobString = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;

            const updatedFitnessData = {
              ...fitnessData,
              dob: dobString,
            };
            console.log("dob screen:");
            navigation.navigate("Goal", { fitnessData: updatedFitnessData });
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
  container: {
    flex: 1,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 18,
  },
  contentHeader: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtext,
    lineHeight: 22,
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 60,
    gap: -40,
  },
  picker: {
    width: 100,
    height: 150,
  },
  footer: {
    padding: 24,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: colors.background,
    backgroundColor: colors.background,
  },
});
