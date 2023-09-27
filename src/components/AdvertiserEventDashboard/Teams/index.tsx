import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { IMAGES } from "../../../constants/Images";
import { PADDINGS } from "../../../constants/Paddings";
import { AdvertiserEventTeam } from "../../AdvertiserEventTeam";
import Button from "../../Button/Button";

interface AdverstiserEventsTeams {
  event: any;
  teams: {
    id: number;
    name: string;
    quantity: number;
    date_start: string;
    date_end: string;
    teamsUsers: {
      confirmed: "a" | "c" | "d";
    }[];
  }[];
}

export const AdverstiserEventsTeamsTab = ({ teams, event }: AdverstiserEventsTeams) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.tabItemContent}>
      {!teams.length && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingTop: 70,
            alignItems: "center",
          }}
        >
          <IMAGES.ICONS.NotFound />
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Text style={{ ...styles.title }}>Não há equipes para este evento...</Text>
            <Text style={{ ...styles.title }}>Cadastre em nova equipe</Text>
          </View>
        </View>
      )}

      {teams.length > 0 && (
        <>
          {teams?.map((team, index) => (
            <AdvertiserEventTeam
              key={index}
              team={team}
              onClick={() =>
                navigation.navigate("AdvertiserEventTeamDashboardScreen", {
                  teamId: team.id,
                  eventId: event.id,
                })
              }
            />
          ))}
        </>
      )}

      <View style={{ marginBottom: 40 }}>
        <Button onPress={() => navigation.navigate("AdvertiverEventTeamAddScreen", { event })} label={"Nova Equipe"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryColor,
    textAlign: "center",
  },
});
