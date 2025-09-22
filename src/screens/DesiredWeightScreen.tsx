import React, { useState } from "react";
import RulerSlider from "../components/RulerSlider";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import Button from "../components/Button";
import colors from "../themes/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Type";
import { Ionicons } from "@expo/vector-icons";

import WheelPicker from "@quidone/react-native-wheel-picker";

interface PickerItem {
  value: number;
  label: string;
}

type Props = NativeStackScreenProps<RootStackParamList, "DesiredWeight">;

export default function DesiredWeightScreen({ route, navigation }: Props) {
  const { fitnessData } = route.params;

  const [weight, setWeight] = useState<number>(62);

  const totalSteps = 7;
  const currentStep = 7;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  const [kg, setKg] = useState<number>(70);
  const [isMetric, setIsMetric] = useState(false);

  const kgOptions: PickerItem[] = Array.from({ length: 681 }, (_, i) => ({
    value: i + 20,
    label: `${i + 20} kg`,
  }));

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
            <Text style={styles.title}>Height & Weight</Text>
            <Text style={styles.subtitle}>
              This will be used to calibrate your custom plan.
            </Text>
          </View>

          <View style={styles.container}>
            {/* Toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>Option A</Text>
              <Switch
                value={isMetric}
                onValueChange={setIsMetric}
                thumbColor={colors.white}
                trackColor={{ false: colors.purple, true: colors.purple }}
              />
              <Text style={styles.toggleText}>Option B</Text>
            </View>
            <View style={styles.wheelPickerTitle}>
              <Text style={styles.sectionTitle}>Lose weight</Text>
            </View>

            {/* Pickers */}

            <View style={styles.row}>
              {!isMetric ? (
                // Imperial Pickers
                <View style={styles.pickerContainer}>
                  <RulerSlider
                    min={30}
                    max={240}
                    step={1}
                    initialValue={62}
                    unit="kg"
                    stepWidth={12}
                    longStepInterval={10}
                    onValueChange={(v) => setWeight(v)}
                  />
                </View>
              ) : (
                // Metric Pickers
                <View style={styles.pickerContainer}>
                  <WheelPicker
                    data={kgOptions}
                    value={kg}
                    onValueChanged={(event) => setKg(event.item.value)}
                    style={styles.picker}
                    width={100}
                    visibleItemCount={7}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Button
          title="Finish"
          onPress={() => {
            const desiredWeightValue = !isMetric ? weight : kg;
            const unit = "kg"; // if you want to store the unit separately

            // Merge with fitnessData
            const updatedFitnessData = {
              ...fitnessData,
              desiredWeight: desiredWeightValue,
            };

            navigation.navigate("Summary", { fitnessData: updatedFitnessData });
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

  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 24,
    paddingLeft: 16,
    paddingRight: 18,
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
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 18,
    color: colors.text,
    marginHorizontal: 10,
    fontWeight: "800",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 10,
  },
  wheelPickerTitle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginHorizontal: 20,
  },
  pickerContainer: {
    height: 250,
    width: 280,

    borderRadius: 10,

    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
  },
  picker: {
    height: 180,
    backgroundColor: colors.background,
  },

  footer: {
    padding: 24,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: colors.background,
    backgroundColor: colors.background,
  },
});
