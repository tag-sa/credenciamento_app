import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { IMAGES } from "../../constants/Images";
interface NotFoundProps {
  text_1?: string;
  text_2?: string;
  image?: any;
}
export const NotFound = ({ text_1 = "Não há vagas no momento...", text_2 = "Volte em breve", image: Image = IMAGES.WORKER.NotFound }: NotFoundProps) => {
  return (
    <View style={styles.container}>
      <Image />
      <View style={{ marginTop: 30 }}>
        {text_1 && <Text style={styles.text}>{text_1}</Text>}
        {text_2 && <Text style={styles.text}>{text_2}</Text>}
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
