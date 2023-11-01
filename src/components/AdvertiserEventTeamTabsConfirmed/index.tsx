import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { PADDINGS } from '../../constants/Paddings'
import { axiosApi } from '../../services/axios'
import { AdvertiserEventTeamUser } from '../AdvertiserEventTeamUser'
import { DialogModalContent } from '../DialogModalContent'
import { NotFound } from '../NotFound'
import { OcurrenceModalContent } from '../OcurrenceModalContent'

interface AdvertiserEventTeamTabsConfirmedProps {
  users: any[]
  teamConfirmationsStatus: 'a' | 'c' | 'd' | null
  eventID: number
  teamId: number
  notFoundText: string
  isPastEvent?: boolean
  callback: (reload: boolean) => void
}

export const AdvertiserEventTeamTabsConfirmed = ({
  users,
  teamConfirmationsStatus,
  notFoundText,
  eventID,
  teamId,
  callback,
  isPastEvent
}: AdvertiserEventTeamTabsConfirmedProps) => {
  if (!users.length) {
    return (
      <View style={{ marginBottom: 50, paddingHorizontal: PADDINGS.horizontal }}>
        <NotFound text_1={notFoundText} />
      </View>
    )
  }

  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTeamUser, setSelectedTeamUser] = useState(null)

  const execButtonAction = async (teamUser: any) => {
    if (isPastEvent) {
      setSelectedTeamUser(teamUser)
      setModalVisible(true)
      return
    }

    if (!teamConfirmationsStatus) {
      try {
        await axiosApi.post(`/events/${eventID}/teams/${teamId}/add`, {
          user_id: teamUser.id
        })
        callback(true)
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data)
      }
    }

    if (teamConfirmationsStatus === 'a') {
      try {
        await axiosApi.put(`/events/${eventID}/teams/${teamId}/${teamUser.id}/confirm`)
        callback(true)
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data)
      }
    }

    if (teamConfirmationsStatus === 'c') {
      try {
        await axiosApi.delete(`/events/${eventID}/teams/${teamId}/${teamUser.id}`)
        callback(true)
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data)
      }
    }
  }

  return (
    <>
      <DialogModalContent modalVisible={modalVisible} setModalVisible={() => setModalVisible(false)}>
        <OcurrenceModalContent
          setModalVisible={() => setModalVisible(false)}
          eventId={eventID}
          teamId={teamId}
          userId={selectedTeamUser?.user_id}
          teamUserId={selectedTeamUser?.id}
        />
      </DialogModalContent>

      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={users}
        renderItem={({ item }) => {
          const user = item.user ? item.user : item

          return (
            <AdvertiserEventTeamUser
              isPastEvent={isPastEvent}
              user={user}
              teamConfirmationsStatus={teamConfirmationsStatus}
              onClick={() =>
                navigation.navigate('WorkerProfiledScreen', {
                  userId: user.id,
                  fromJobButton: true,
                  currentInvitationStatus: teamConfirmationsStatus,
                  teamId,
                  eventId: eventID,
                  teamUserId: item.id
                })
              }
              onButtonClick={() => execButtonAction(item)}
            />
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20,
    marginBottom: 100
  }
})
