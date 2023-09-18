import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { useState } from "react";
import { IMAGES } from "../../../constants/Images";
import Button from "../../Button/Button";
import { useNavigation } from "@react-navigation/native";
import { DialogModal } from "../../DialogModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useGlobalStore } from "../../../store";
import { axiosApi } from "../../../services/axios";
import { showMessage } from "react-native-flash-message";

interface AdvertiserPlacesProps {
  advertiserId: number;
  reload: () => void;
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

export const AdverstiserPlaces = ({
  advertiserId,
  places,
  reload,
}: AdvertiserPlacesProps) => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [placeId, setPlaceId] = useState("");

  const removePlace = async () => {
    useGlobalStore.setState({ isLoading: true });

    try {
      await axiosApi.delete(`/advertisers/${advertiserId}/places/${placeId}`);
      reload();
      useGlobalStore.setState({ isLoading: false });
    } catch (e) {
      useGlobalStore.setState({ isLoading: false });
      showMessage({
        backgroundColor: COLORS.dangerColor,
        message: "Erro ao remover local",
        description: "Não foi possível remover o local, tente novamente.",
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <>
      <View style={styles.content}>
        <DialogModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={"Remover local?"}
          message={
            "Ao remover local todos os eventos relacionados á este local também serão excluídos."
          }
          confirmAction={removePlace}
        />

        {places?.map((place, index) => (
          <View
            style={{
              ...styles.card,
              marginBottom: index !== places.length - 1 ? 15 : 0,
            }}
            key={index}
          >
            <View style={styles.iconContainer}>
              <IMAGES.ICONS.LocationWhite />
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
            <View style={styles.TrashContainer}>
              <TouchableOpacity
                onPress={() => {
                  setPlaceId(place.id);
                  setModalVisible(true);
                }}
              >
                <IMAGES.ICONS.Trash />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ marginVertical: 30 }}>
          <Button
            buttonEnabled={true}
            onPress={() =>
              navigation.navigate("AdvertiverPlaceAddScreen", {
                advertiserId,
              })
            }
            label={"Novo local"}
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
    marginBottom: 30,
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
  TrashContainer: {
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
