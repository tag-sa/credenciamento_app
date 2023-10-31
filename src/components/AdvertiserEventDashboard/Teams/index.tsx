import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { AdvertiserEventTeam } from '../../AdvertiserEventTeam'
import Button from '../../Button/Button'
import { DialogModal } from '../../DialogModal'

interface AdverstiserEventsTeams {
  event: any
  teams: {
    id: number
    name: string
    quantity: number
    date_start: string
    date_end: string
    teamsUsers: {
      confirmed: 'a' | 'c' | 'd'
    }[]
  }[]
  isPastEvent: boolean
  reload: (status: boolean) => void
}

export const AdverstiserEventsTeamsTab = ({ teams, event, isPastEvent, reload }: AdverstiserEventsTeams) => {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDuplicateVisible, setModalDuplicateVisible] = useState(false)
  const [teamId, setTeamId] = useState(0)

  const onTeamDelete = async () => {
    try {
      await axiosApi.delete(`events/${event.id}/teams/${teamId}/delete`)
      reload(true)
    } catch (error) {
      //TODO: tratar erro
    }
  }

  const onTeamDuplicate = async () => {
    try {
      await axiosApi.post(`events/${event.id}/teams/${teamId}/duplicate`)
      reload(true)
    } catch (error) {
      //TODO: tratar erro
    }
  }

  return (
    <View style={styles.tabItemContent}>
      <DialogModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Remover Equipe?'}
        message={'Ao remover a equipe, todos os convocados serão removidos, independente de terem confirmado ou não.'}
        confirmAction={onTeamDelete}
      />
      <DialogModal
        modalVisible={modalDuplicateVisible}
        setModalVisible={setModalDuplicateVisible}
        title={'Duplicar Equipe?'}
        message={'Ao duplicar a equipe, todos os convocados terão seus status alterados para aguardando confirmação.'}
        confirmAction={onTeamDuplicate}
      />

      {!teams.length && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingTop: 70,
            alignItems: 'center'
          }}
        >
          <IMAGES.ICONS.NotFound />
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Text style={{ ...styles.title }}>Não há equipes para este evento...</Text>
            <Text style={{ ...styles.title }}>Cadastre em nova equipe</Text>
          </View>
        </View>
      )}

      {teams?.map((team, index) => (
        <AdvertiserEventTeam
          key={index}
          isPastEvent={isPastEvent}
          team={team}
          onClick={() =>
            navigation.navigate('AdvertiserEventTeamDashboardScreen', {
              teamId: team.id,
              eventId: event.id,
              isPastEvent
            })
          }
          onDelete={() => {
            setTeamId(team.id)
            setModalVisible(true)
          }}
          onDuplicate={() => {
            setTeamId(team.id)
            setModalDuplicateVisible(true)
          }}
        />
      ))}

      <View style={{ marginBottom: 40 }}>{!isPastEvent && <Button onPress={() => navigation.navigate('AdvertiverEventTeamAddScreen', { event })} label={'Nova Equipe'} />}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  }
})
