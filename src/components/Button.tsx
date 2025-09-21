import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../themes/colors";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({ title, onPress, variant = "primary" }: Props) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[styles.button, isPrimary ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 8,
  },
  primary: {
    backgroundColor: colors.buttonPrimary,
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: colors.buttonPrimaryText,
  },
  secondaryText: {
    color: colors.buttonSecondaryText,
  },
});
