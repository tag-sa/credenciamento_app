import moment from 'moment'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'

type AdvertiserEventTeamProps = {
  team: {
    id: number
    name: string
    quantity: number
    date_start: string
    date_end: string
    teamsUsers: {
      confirmed: 'a' | 'c' | 'd'
    }[]
  }
  isPastEvent: boolean
  onClick?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
}

export const AdvertiserEventTeam = ({ team = undefined, onClick, onDelete, onDuplicate, isPastEvent }: AdvertiserEventTeamProps) => {
  let totalTeamsUsers = 0
  let totalTeamsUsersConfirmed = 0
  let fillColor = COLORS.red

  totalTeamsUsers += team.teamsUsers.length

  team.teamsUsers.map((teamsUser) => {
    if (teamsUser.confirmed == 'c') {
      totalTeamsUsersConfirmed++
    }
  })

  if (totalTeamsUsersConfirmed > 30 && totalTeamsUsersConfirmed < 70) {
    fillColor = COLORS.orange
  } else if (totalTeamsUsersConfirmed > 70) {
    fillColor = COLORS.darkBlue
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onClick}>
        <IMAGES.ICONS.IconTeamsUsers />
      </Pressable>

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable style={styles.textContainer} onPress={onClick}>
          <Text style={styles.name}>{team?.name}</Text>

          <Text style={styles.vacancy}>
            {totalTeamsUsersConfirmed > 0 ? ((totalTeamsUsersConfirmed / totalTeamsUsers) * 100).toFixed(0) : 0}% ({totalTeamsUsersConfirmed}/{totalTeamsUsers})
          </Text>

          <View style={{ marginTop: 10 }}>
            <Progress.Bar progress={0.3} unfilledColor={COLORS.darkGray} borderWidth={0} color={fillColor} />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <IMAGES.ICONS.Calendar />
              <Text style={styles.details}>{moment(team.date_start).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <IMAGES.ICONS.Clock />
              <Text style={styles.details}>
                {moment(team.date_start).format('HH:mm')} ás {moment(team.date_end).format('HH:mm')}
              </Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.iconContainer}>
          {!isPastEvent && (
            <>
              <IMAGES.ICONS.Duplicate onPress={onDuplicate} />
              <IMAGES.ICONS.Trash onPress={onDelete} />
            </>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    height: 90,
    marginVertical: 8,
    borderWidth: 1,
    flexDirection: 'row'
  },
  containerClick: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    maxWidth: 230
  },
  name: {
    fontSize: 16,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  vacancy: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.lightBlue,
    fontWeight: 'bold'
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 42
  },
  iconContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 8,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 15
  },
  details: {
    fontSize: 10,
    color: COLORS.lightBlue,
    marginLeft: 5,
    fontWeight: 'bold'
  }
})
