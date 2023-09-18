import { Image, Text, View, StyleSheet } from "react-native";
import { IMAGES } from "../../constants/Images";
import { COLORS } from "../../constants/Colors";

export const JobsNotFound = () => {
  return (
    <View style={styles.container}>
      <IMAGES.WORKER.JobsNotFound />
      <View style={{ marginTop: 30 }}>
        <Text style={styles.text}>Não há vagas no momento...</Text>
        <Text style={styles.text}>Volte em breve</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  image: {
    height: 121,
  },
  text: {
    fontSize: 20,
    color: COLORS.primaryColor,
    fontWeight: "bold",
    textAlign: "center",
  },
});
