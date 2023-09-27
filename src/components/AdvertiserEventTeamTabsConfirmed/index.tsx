import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { PADDINGS } from "../../constants/Paddings";
import { axiosApi } from "../../services/axios";
import { AdvertiserEventTeamUser } from "../AdvertiserEventTeamUser";
import { NotFound } from "../NotFound";

interface AdvertiserEventTeamTabsConfirmedProps {
  users: any[];
  teamConfirmationsStatus: "a" | "c" | "d" | null;
  eventID: number;
  teamId: number;
  notFoundText: string;
  callback: (reload: boolean) => void;
}

export const AdvertiserEventTeamTabsConfirmed = ({ users, teamConfirmationsStatus, notFoundText, eventID, teamId, callback }: AdvertiserEventTeamTabsConfirmedProps) => {
  if (!users.length) {
    return (
      <View style={{ marginBottom: 50, paddingHorizontal: PADDINGS.horizontal }}>
        <NotFound text_1={notFoundText} />
      </View>
    );
  }

  const execButtonAction = async (id: number) => {
    if (!teamConfirmationsStatus) {
      try {
        await axiosApi.post(`/events/${eventID}/teams/${teamId}/add`, {
          user_id: id,
        });
        callback(true);
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data);
      }
    }

    if (teamConfirmationsStatus === "a") {
      try {
        await axiosApi.put(`/events/${eventID}/teams/${teamId}/${id}/confirm`);
        callback(true);
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data);
      }
    }

    if (teamConfirmationsStatus === "c") {
      try {
        await axiosApi.delete(`/events/${eventID}/teams/${teamId}/${id}`);
        callback(true);
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data);
      }
    }
  };

  return (
    <FlatList
      style={styles.content}
      showsVerticalScrollIndicator={false}
      data={users}
      renderItem={({ item }) => {
        const user = item.user ? item.user : item;

        return <AdvertiserEventTeamUser user={user} teamConfirmationsStatus={teamConfirmationsStatus} onButtonClick={() => execButtonAction(item.id)} />;
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20,
    marginBottom: 50,
  },
});
