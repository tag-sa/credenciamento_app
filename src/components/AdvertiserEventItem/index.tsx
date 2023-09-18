import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";
import { IMAGES } from "../../constants/Images";
import * as Progress from "react-native-progress";
import moment from "moment";

type AdvertiserEventItemProps = {
  event?: any & { name: number };
  isPastEvent?: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export const AdvertiserEventItem = ({
  event,
  onClick,
  onDelete,
  isPastEvent = false,
}: AdvertiserEventItemProps) => {
  const { name } = event;
  let totalTeamsUsers = 0;
  let totalTeamsUsersConfirmed = 0;
  let fillColor = COLORS.redColor;

  event.teams.map((team) => {
    totalTeamsUsers += team.teamsUsers.length;

    team.teamsUsers.map((teamsUser) => {
      if (teamsUser.confirmed) {
        totalTeamsUsersConfirmed++;
      }
    });
  });

  if (totalTeamsUsersConfirmed > 30 && totalTeamsUsersConfirmed < 70) {
    fillColor = COLORS.orangeColor;
  } else if (totalTeamsUsersConfirmed > 70) {
    fillColor = COLORS.primaryColor;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text>Image</Text>
      </View>

      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {!isPastEvent && (
            <>
              <Text style={styles.vacancy}>
                {totalTeamsUsersConfirmed > 0
                  ? (totalTeamsUsersConfirmed / totalTeamsUsers) * 100
                  : 0}
                % ({totalTeamsUsersConfirmed}/{totalTeamsUsers})
              </Text>

              <View style={{ marginTop: 10 }}>
                <Progress.Bar
                  progress={0.3}
                  unfilledColor={COLORS.grayColor}
                  borderWidth={0}
                  color={fillColor}
                />
              </View>
            </>
          )}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <IMAGES.ICONS.Calendar />
              <Text style={styles.details}>
                {moment(event.date_start).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 10 }}>
              <IMAGES.ICONS.Clock />
              <Text style={styles.details}>
                {moment(event.date_start).format("HH:mm")}
              </Text>
              <Text
                style={{
                  ...styles.details,
                  marginLeft: 2,
                }}
              >
                ás {moment(event.date_end).format("HH:mm")}
              </Text>
            </View>
          </View>
        </View>
        {!isPastEvent && (
          <View style={styles.iconContainer}>
            <IMAGES.ICONS.Duplicate />
            <IMAGES.ICONS.Trash />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightGrayColor,
    borderRadius: 10,
    height: 90,
    marginVertical: 8,
    borderWidth: 1,
    flexDirection: "row",
  },
  containerClick: {
    flexGrow: 1,
    flexDirection: "row",
  },
  textContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    maxWidth: 230,
  },
  name: {
    fontSize: 16,
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },
  vacancy: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.secBlueColor,
    fontWeight: "bold",
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.lightGrayColor,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  iconContainer: {
    flexGrow: 1,
    flexDirection: "row",
    padding: 8,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
  },
  details: {
    fontSize: 10,
    color: COLORS.secBlueColor,
    marginLeft: 5,
    fontWeight: "bold",
  },
});
