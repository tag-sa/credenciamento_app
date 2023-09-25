import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";

interface AdvertiserEventCostsProps {}

export const AdvertiserEventCostsTab = ({}: AdvertiserEventCostsProps) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={styles.content}>
        <Text style={styles.title}>Previsão de Custos Resumida</Text>
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={styles.col}>
              <Text style={styles.headerText}>Equipe</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.headerText}>Previsto</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.headerText}>Realizado</Text>
            </View>
          </View>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <View style={styles.body} key={index}>
                <View style={styles.col}>
                  <View style={styles.colContent}>
                    <Text style={styles.teamName}>Segurança</Text>
                    <Text style={styles.subTeamTitle}>Convocados</Text>
                  </View>
                </View>
                <View style={styles.col}>
                  <View style={styles.colContent}>
                    <Text style={styles.teamValuePreview}>123</Text>
                    <Text style={styles.subTeamPreview}>123</Text>
                  </View>
                </View>
                <View style={styles.col}>
                  <View style={styles.colContent}>
                    <Text style={styles.teamValueExecuted}>456</Text>
                    <Text style={styles.subTeamExecuted}>456</Text>
                  </View>
                </View>
              </View>
            ))}
          <View style={styles.footer}>
            <View style={styles.col}>
              <Text>Custo total</Text>
            </View>
            <View style={styles.col}>
              <Text>123</Text>
            </View>
            <View style={styles.col}>
              <Text>456</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20,
    marginBottom: 50,
  },
  title: {
    color: COLORS.primaryColor,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  table: {
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  headerText: {
    color: COLORS.mediumBlueColor,
    fontWeight: "700",
  },
  teamName: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
    fontSize: 14,
  },
  subTeamTitle: {
    color: COLORS.mediumBlueColor,
    fontSize: 10,

    fontWeight: "bold",
  },
  teamValuePreview: {
    fontWeight: "bold",
  },
  subTeamPreview: {
    color: COLORS.primaryColor,
  },
  teamValueExecuted: {
    fontWeight: "bold",
  },
  subTeamExecuted: {
    color: COLORS.primaryColor,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: COLORS.lightGrayColor,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  col: {
    width: "33%",
    alignItems: "center",
  },
  colContent: { flexDirection: "column", alignItems: "flex-start" },
});
