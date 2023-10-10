import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { Avatar } from '../Avatar'

type WorkedEventItemProps = {
  eventId: number
  eventName: string
  jobTitle: string
  date_start: string
  date_end: string
}

export const WorkedEventItem = ({ eventId, eventName, date_start, date_end }: WorkedEventItemProps) => {
  return (
    <View style={styles.container}>
      <Avatar uri="https://via.placeholder.com/150/24f355" />

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text style={styles.name}>user.name</Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Text style={styles.details}>user.score/5</Text>
          <IMAGES.ICONS.YellowStar />
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
