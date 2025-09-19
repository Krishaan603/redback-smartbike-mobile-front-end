import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import Avatar from "@/components/Avatar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "@/context/authContext";
import CustomSafeArea from "@/components/CustomSafeArea";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👀 toggle state

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
      });
    }
  }, [user]);

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    if (!password) return "";

    let strength = "";
    if (password.length < 6) {
      strength = "Weak ❌ (Too short)";
    } else if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      strength = "Strong ✅";
    } else {
      strength = "Medium ⚠️ (Add symbols, numbers, and uppercase)";
    }

    setPasswordStrength(strength);
  };

  const submitChanges = async () => {
    try {
      if (!formData.username || !formData.password) {
        alert("Please fill in all fields");
        return;
      }

      if (passwordStrength !== "Strong ✅") {
        alert("Password must be strong before updating profile!");
        return;
      }

      const updatedUser = {
        ...user,
        username: formData.username,
      };

      // Replace with real API call if needed
      // await api.put(`/user/${user.id}`, updatedUser);

      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <CustomSafeArea>
      <View>
        <Avatar
          size={100}
          className="self-center"
          icon={<AntDesign name="edit" size={14} color="white" />}
          iconBgColour={"bg-blue-500"}
        />
      </View>

      {user && (
        <View className="flex-1 gap-4 p-4">
          {/* Username */}
          <View className="gap-2">
            <Text>Username:</Text>
            <TextInput
              value={formData.username}
              onChangeText={(text) =>
                setFormData({ ...formData, username: text })
              }
              className="border border-gray-400 p-2 rounded-xl"
              placeholder="Username"
            />
          </View>

          {/* Password */}
          <View className="gap-2">
            <Text>Password:</Text>
            <View className="flex-row items-center border border-gray-400 p-2 rounded-xl">
              <TextInput
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => {
                  setFormData({ ...formData, password: text });
                  checkPasswordStrength(text);
                }}
                className="flex-1"
                placeholder="********"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <AntDesign
                  name={showPassword ? "eye" : "eyeo"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            {passwordStrength ? (
              <Text
                className={`text-sm ${
                  passwordStrength.includes("Strong")
                    ? "text-green-600"
                    : passwordStrength.includes("Medium")
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {passwordStrength}
              </Text>
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={submitChanges}
            className="bg-brand-purple p-4 rounded-xl mt-auto"
          >
            <Text className="text-white text-center font-semibold">
              Submit Changes
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomSafeArea>
  );
};

export default EditProfile;


