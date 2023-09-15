import { Image, View, Text, StyleSheet, Touchable } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { axiosApi } from "../../../services/axios";
import { useState } from "react";
import { IMAGES } from "../../../constants/Images";
import Button from "../../Button/Button";
import { useNavigation } from "@react-navigation/native";
import { DialogModal } from "../../DialogModal";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AdvertiserPlacesProps {
  places: {
    id: string;
    advertiser_id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    created: string;
    modified: string;
    neighborhood: string;
    number: string;
  }[];
}

export const AdverstiserPlaces = ({ places }: AdvertiserPlacesProps) => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.content}>
        <DialogModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={""}
          message={""}
          confirmText={""}
          cancelText={""}
          closeIcon={0}
        />
        {places?.map((place, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.ICONS.LOCATION_WHITE.uri} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{place.name}</Text>
              <Text style={styles.address}>
                {place.address}, {place.number}
              </Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Text style={styles.state}>{place.neighborhood}</Text>
                <Text style={styles.city}>{place.city}</Text>
                <Text style={styles.state}>{place.state}</Text>
              </View>
            </View>
            <View style={styles.trashContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={IMAGES.ICONS.TRASH.uri} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ marginVertical: 30 }}>
          <Button
            buttonEnabled={true}
            onPress={() => navigation.navigate("AdvertiverAddScreen")}
            label={"Novo anunciante"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20,
  },
  card: {
    height: 90,
    borderColor: COLORS.lightGrayColor,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  iconContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  trashContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: 40,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    color: COLORS.primaryColor,
  },
  address: {
    fontWeight: "bold",
    fontSize: 10,
    color: COLORS.primaryColor,
    marginTop: 5,
  },
  city: {
    fontWeight: "bold",
    fontSize: 10,
    color: COLORS.secBlueColor,
    marginTop: 5,
  },
  state: {
    fontWeight: "bold",
    fontSize: 10,
    color: COLORS.secBlueColor,
    marginTop: 5,
  },
});
