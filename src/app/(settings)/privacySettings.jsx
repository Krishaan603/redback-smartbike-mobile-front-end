import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Platform,
} from "react-native";

const COLORS = {
  bg: "#0F0F10",
  card: "#1A1A1C",
  border: "#2A2A2E",
  text: "#F4F4F5",
  muted: "#9B9CA0",
  accent: "#4A90E2",
};

const OptionRow = ({ label, value, onChange }) => (
  <View style={styles.optionRow}>
    <Text style={styles.optionLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: "#555", true: COLORS.accent }}
      thumbColor={Platform.OS === "android" ? "#fff" : undefined}
    />
  </View>
);

export default function PrivacySettings() {
  const [workoutPrivacy, setWorkoutPrivacy] = useState("friends");
  const [locationPrivacy, setLocationPrivacy] = useState("private");
  const [achievementsVisible, setAchievementsVisible] = useState(true);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [visValue, setVisValue] = useState("friends");
  const visLabel =
    visValue === "public" ? "Public" : visValue === "private" ? "Private" : "Friends Only";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Privacy Settings</Text>

        {/* Profile Visibility (dropdown + Display Achievements toggle) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Visibility</Text>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setPickerOpen(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.selectText}>{visLabel}</Text>
            <Text style={styles.selectChevron}>▾</Text>
          </TouchableOpacity>
          <Text style={styles.helper}>
            Choose who can view your profile and basic stats.
          </Text>

          <View style={styles.divider} />
          <OptionRow
            label="Display Achievements"
            value={achievementsVisible}
            onChange={setAchievementsVisible}
          />
        </View>

        {/* Workout Privacy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout Privacy</Text>
          <OptionRow
            label="Visible to Friends Only"
            value={workoutPrivacy === "friends"}
            onChange={() =>
              setWorkoutPrivacy(workoutPrivacy === "friends" ? "private" : "friends")
            }
          />
        </View>

        {/* Location Privacy */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location Privacy</Text>
          <OptionRow
            label="Share Live Location"
            value={locationPrivacy === "public"}
            onChange={() =>
              setLocationPrivacy(locationPrivacy === "public" ? "private" : "public")
            }
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Picker */}
      <Modal visible={pickerOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Profile Visibility</Text>
            {["public", "friends", "private"].map((val) => (
              <Pressable
                key={val}
                style={styles.modalOption}
                onPress={() => {
                  setVisValue(val);
                  setPickerOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    visValue === val && { color: COLORS.accent, fontWeight: "700" },
                  ]}
                >
                  {val === "public" ? "Public" : val === "private" ? "Private" : "Friends Only"}
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => setPickerOpen(false)}
              style={[styles.saveBtn, { marginTop: 10 }]}
            >
              <Text style={styles.saveText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 16 },
  heading: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: { color: COLORS.text, fontSize: 16, fontWeight: "600", marginBottom: 8 },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionLabel: { color: COLORS.text, fontSize: 15 },
  helper: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#2C2C2E",
    borderRadius: 8,
  },
  selectText: { color: COLORS.text, fontSize: 15 },
  selectChevron: { color: COLORS.muted, fontSize: 14 },
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalOptionText: { color: COLORS.text, fontSize: 15 },
});



