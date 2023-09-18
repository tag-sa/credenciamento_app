import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { AdvertiserEventItem } from "../../AdvertiserEventItem";
import Button from "../../Button/Button";
import { useNavigation } from "@react-navigation/native";

export const AdverstiserAbout = ({ advertiser }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.tabItemContent}>
      <Text style={{ ...styles.title, textAlign: "left" }}>
        {advertiser?.name}
      </Text>
      <Text style={{ ...styles.about, textAlign: "left" }}>
        {advertiser?.about}
      </Text>
      <Text style={{ ...styles.title, marginTop: 30, textAlign: "left" }}>
        Eventos da empresa
      </Text>

      <View style={styles.advertisersList}>
        {advertiser?.pastEvents?.map((event, index) => (
          <AdvertiserEventItem
            key={index}
            event={event}
            onClick={() => {
              // navigation.navigate("AdvertiserDashboardScreen", {
              //   advertiserId: advertiser.id,
              // });
            }}
            onDelete={() => {
              console.log(advertiser.id);
            }}
          />
        ))}
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          buttonEnabled={true}
          onPress={() =>
            navigation.navigate("AdvertiverEventAddScreen", {
              advertiserId: advertiser?.id,
            })
          }
          label={"Novo evento"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryColor,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryColor,
    textAlign: "center",
  },
  about: {
    color: COLORS.secBlueColor,
    lineHeight: 20,
    marginTop: 15,
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    paddingTop: 40,
  },
  advertisersList: {
    marginTop: 10,
    marginBottom: 20,
  },
});
