import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { auth } from "../../../services/auth";
import { UserType } from "../../../model/user.model";
import JobsList from "../../../components/AdvertiserEventDashboard/JobsList";
import { COLORS } from "../../../constants/Colors";
import { TabItem } from "../../../components/TabItem";
import { PADDINGS } from "../../../constants/Paddings";

export const JobsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<
    "available" | "favorite" | "applications"
  >("available");
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    async function load() {
      const user = await auth().getUser();

      setUser(user);
    }

    load();
  }, []);

  return (
    <>
      <View style={styles.tabs}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: COLORS.primaryColor,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TabItem
            label="DISPONÍVEIS"
            item="available"
            activeTab={activeTab}
            setActiveTab={(tab: "available" | "favorite" | "applications") => {
              setActiveTab(tab);
            }}
          />
          <TabItem
            label="FAVORITAS"
            item="favorite"
            activeTab={activeTab}
            setActiveTab={(tab: "available" | "favorite" | "applications") => {
              setActiveTab(tab);
            }}
          />
          <TabItem
            isLast={true}
            label="MINHAS CANDIDATURAS"
            item="applications"
            activeTab={activeTab}
            setActiveTab={(tab: "available" | "favorite" | "applications") => {
              setActiveTab(tab);
            }}
          />
        </ScrollView>
      </View>

      <View style={styles.containerJobs}>
        {activeTab === "available" && <JobsList onClick={undefined} />}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  tabs: {
    backgroundColor: COLORS.primaryColor,
    height: 32,
    flexDirection: "row",
  },
  body: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.horizontal,
  },
  containerJobs: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.horizontal,
    height: "100%",
    position: "relative",
  },
});
