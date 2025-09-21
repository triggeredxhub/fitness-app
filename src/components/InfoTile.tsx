import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../themes/colors";



interface InfoTileProps {
  icon: keyof typeof Ionicons.glyphMap; // Any Ionicons name
  title: string;
  subtitle: string;
  selected?: boolean;
  onPress: () => void;
}

export default function InfoTile({
  icon,
  title,
  subtitle,
  selected = false,
  onPress,
}: InfoTileProps) {
  return (
    <TouchableOpacity
      style={[styles.tile, selected && styles.tileSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={icon}
        size={24}
        color={selected ? colors.background : colors.purple}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d8d8d9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tileSelected: {
    backgroundColor: colors.purple,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  titleSelected: {
    color: colors.background,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  subtitleSelected: {
    color: colors.background,
  },
});
