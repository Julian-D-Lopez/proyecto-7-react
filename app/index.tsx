import React from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import styles from "./styles/styles";

export default function App() {
  const handlePress = () => {
    Alert.alert("Ingresar", "Botón presionado");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./Logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenido</Text>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </View>
  );
}