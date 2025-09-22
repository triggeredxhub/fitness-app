import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import Button from "../components/Button";
import colors from "../themes/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";



type Props = NativeStackScreenProps<RootStackParamList, "Summary">;

export default function SummaryScreen({ route, navigation }: Props) {
  const { fitnessData } = route.params;

  const renderItem = (label: string, value?: string | number) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "—"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Review Your Fitness Data</Text>

        <View style={styles.card}>
          {renderItem("Gender", fitnessData.gender)}
          {renderItem("Workouts per Week", fitnessData.workoutsPerWeek)}
          {renderItem("Height", fitnessData.height)}
          {renderItem("Weight", fitnessData.weight)}
          {renderItem("Date of Birth", fitnessData.dob)}
          {renderItem("Goal", fitnessData.goal)}
          {renderItem("Desired Weight", fitnessData.desiredWeight?.toString())}
        </View>

        <View style={styles.footer}>
          <Button
            title="Confirm & Submit"
            onPress={() => {
              console.log("Submitting:", fitnessData);
              // later: call API here
            }}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    padding: 80,

  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  label: {
    fontSize: 16,
    color: "#6B7280",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  footer: {
    marginTop: 20,
  },
});
