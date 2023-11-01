import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { getAge } from '../../utils/age'
import { Avatar } from '../Avatar'
import Button from '../Button/Button'

type AdvertiserEventTeamUserProps = {
  user: {
    name: string
    avatar: string
    birthdate: string
    score: number
  }
  teamConfirmationsStatus?: 'a' | 'c' | 'd' | null
  isPastEvent?: boolean
  onClick?: () => void
  onButtonClick?: () => void
}

export const AdvertiserEventTeamUser = ({ onClick, onButtonClick, user, teamConfirmationsStatus, isPastEvent }: AdvertiserEventTeamUserProps) => {
  let buttonColor = COLORS.green
  let label = 'Aceitar'
  let width = 70

  if (isPastEvent) {
    label = 'Ocorrência'
    buttonColor = COLORS.red
    width = 85
  } else {
    if (teamConfirmationsStatus === 'c') {
      label = 'Remover'
      buttonColor = COLORS.red
    } else if (teamConfirmationsStatus === 'd') {
      label = 'Recusado'
      buttonColor = COLORS.red
    } else if (!teamConfirmationsStatus) {
      label = 'Convocar'
      buttonColor = COLORS.darkBlue
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onClick}>
        <Avatar emptyUriIcon={IMAGES.ICONS.IconUser} loggedUser={false} uri={user.avatar} borderWidth={0} />
      </Pressable>

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable style={styles.textContainer} onPress={onClick}>
          <Text style={styles.name}>{user.name}</Text>

          <Text style={styles.vacancy}>{getAge(user.birthdate)} anos</Text>
          {/* TODO: USERS ADDRESS */}
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={styles.details}>{user.score}/5</Text>
            <IMAGES.ICONS.YellowStar />
          </View>
        </Pressable>

        <View style={styles.iconContainer}>
          <Button label={label} width={width} height={30} buttonEnabledColor={buttonColor} fontSize={10} borderRadius={5} onPress={onButtonClick} />
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
    fontSize: 12,
    marginTop: 4,
    color: COLORS.lightBlue,
    fontWeight: 'bold'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80
  },
  iconContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 8,
    paddingRight: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  details: {
    fontSize: 10,
    color: COLORS.darkBlue,
    marginLeft: 5,
    fontWeight: 'bold',
    marginRight: 3
  }
})
