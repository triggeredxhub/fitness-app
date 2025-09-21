// TileButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../themes/colors";

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  align?: "center" | "left"; // control container alignment
};

export default function TileButton({
  label,
  selected = false,
  onPress,
  align = "center",
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.tile,
        selected ? styles.tileSelected : styles.tileUnselected,
        align === "center" ? styles.alignCenter : styles.alignLeft,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          selected ? styles.textSelected : styles.textUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: "100%",
  },
  tileSelected: {
    backgroundColor: colors.tilePrimary,
  },
  tileUnselected: {
    backgroundColor: colors.tileSecondary,
  },
  alignCenter: {
    alignItems: "center",
  },
  alignLeft: {
    alignItems: "flex-start",
    paddingLeft: 16, // optional: add spacing so text doesn’t stick to edge
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textSelected: {
    color: colors.tilePrimaryText,
  },
  textUnselected: {
    color: colors.tileSecondaryText,
  },
});
