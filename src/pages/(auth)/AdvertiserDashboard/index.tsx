import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { BackButton } from "../../../components/BackButton";
import { IMAGES } from "../../../constants/Images";
import { useEffect, useState } from "react";
import { axiosApi } from "../../../services/axios";
import { useGlobalStore } from "../../../store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdvertiserEventItem } from "../../../components/AdvertiserEventItem";
import { useNavigation } from "@react-navigation/native";
import { AdverstiserAbout } from "../../../components/AdvertiserDashboard/About";
import { AdverstiserPastEvents } from "../../../components/AdvertiserDashboard/PastEvents";
import { AdverstiserPlaces } from "../../../components/AdvertiserDashboard/Places";

export const AdvertiserDashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { advertiserId } = route.params;
  const [activeTab, setActiveTab] = useState<
    "about" | "pastEvents" | "places" | "people"
  >("about");

  const [places, setPlaces] = useState([]);

  const [advertiser, setAdvertiser] = useState<{
    id: number;
    name: string;
    url: string;
    about: string;
    events: [];
    pastEvents: [];
  }>();

  useEffect(() => {
    const loadAdvertiser = async () => {
      useGlobalStore.setState({ isLoading: true });

      const [adv, pls] = await Promise.all([
        axiosApi.get(`/advertisers/${advertiserId}`),
        axiosApi.get(`/advertisers/places/${advertiserId}`),
      ]);

      useGlobalStore.setState({ isLoading: false });

      setAdvertiser(adv.data.data);
      setPlaces(pls.data.data);
    };

    loadAdvertiser();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
      <View style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
        <View style={styles.container}>
          <View
            style={{
              marginTop: 50,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BackButton icon={IMAGES.ICONS.BACK_BUTTON_WHITE.uri} />
            <Image source={IMAGES.ICONS.FILTER_WHITE.uri} />
          </View>
          <View style={styles.advertiserContainer}>
            <View style={styles.advertiserImageContainer}>
              <Image
                source={IMAGES.ICONS.BULLHORN_WHITE.uri}
                style={styles.advertiserImage}
              />
            </View>
            <View style={styles.actions}>
              <Image source={IMAGES.ICONS.LIKE.uri} />
              <Image source={IMAGES.ICONS.SHARE.uri} />
            </View>
            <View style={styles.advertiserDetails}>
              <Text style={styles.name}>{advertiser?.name}</Text>
              <Text style={styles.url}>{advertiser?.url}</Text>
            </View>
          </View>
        </View>
        <View style={styles.tabs}>
          <ScrollView
            contentContainerStyle={{
              backgroundColor: COLORS.primaryColor,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity onPress={() => setActiveTab("about")}>
              <View
                style={
                  activeTab === "about" ? styles.tabItemActive : styles.tabItem
                }
              >
                <Text
                  style={
                    activeTab === "about"
                      ? styles.tabItemTextActive
                      : styles.tabItemText
                  }
                >
                  SOBRE A EMPRESA
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("pastEvents")}>
              <View
                style={
                  activeTab === "pastEvents"
                    ? styles.tabItemActive
                    : styles.tabItem
                }
              >
                <Text
                  style={
                    activeTab === "pastEvents"
                      ? styles.tabItemTextActive
                      : styles.tabItemText
                  }
                >
                  EVENTOS PASSADOS
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("places")}>
              <View
                style={
                  activeTab === "places" ? styles.tabItemActive : styles.tabItem
                }
              >
                <Text
                  style={
                    activeTab === "places"
                      ? styles.tabItemTextActive
                      : styles.tabItemText
                  }
                >
                  MEUS LOCAIS
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("people")}>
              <View
                style={
                  activeTab === "people"
                    ? { ...styles.tabItemActive, marginRight: 50 }
                    : { ...styles.tabItem, marginRight: 50 }
                }
              >
                <Text
                  style={
                    activeTab === "people"
                      ? styles.tabItemTextActive
                      : styles.tabItemText
                  }
                >
                  PESSOAS
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {activeTab === "about" && <AdverstiserAbout advertiser={advertiser} />}
        {activeTab === "pastEvents" && (
          <AdverstiserPastEvents advertiser={advertiser} />
        )}
        {activeTab === "places" && <AdverstiserPlaces places={places} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: PADDINGS.horizontal,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  advertiserContainer: {
    padding: 10,
    marginTop: 50,
    width: "90%",
    height: 200,
    backgroundColor: COLORS.whiteColor,
    alignSelf: "center",
    position: "relative",
    borderRadius: 5,
    shadowColor: COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
  },
  advertiserImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 50000,
    position: "absolute",
    top: -70,
    backgroundColor: "#7709D8",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: COLORS.primaryColor,
  },
  advertiserImage: {
    maxHeight: 30,
  },
  advertiserDetails: {
    alignSelf: "center",
    marginTop: 60,
  },
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
  url: {
    fontSize: 15,
    color: COLORS.secBlueColor,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "700",
  },
  tabs: {
    backgroundColor: COLORS.primaryColor,
    height: 32,
    flexDirection: "row",
  },
  tabItem: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tabItemActive: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    backgroundColor: COLORS.whiteColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tabItemText: {
    color: COLORS.secBlueColor,
    fontSize: 11,
    fontWeight: "bold",
  },
  tabItemTextActive: {
    color: COLORS.primaryColor,
    fontSize: 11,
    fontWeight: "bold",
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
