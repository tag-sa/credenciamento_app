import moment from 'moment'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'

type AdvertiserEventPanelProps = {
  event: {
    id: number
    name: string
    advertiser: {
      name: string
    }
    dateStart: string
    dateEnd: string
  }
  onClick?: () => void
}

export const AdvertiserEventPanel = ({ event, onClick }: AdvertiserEventPanelProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer} onPress={onClick}>
        <IMAGES.ICONS.EmptyCalendarWhite />
      </Pressable>

      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable style={styles.textContainer} onPress={onClick}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.name}>
            {event.name}
          </Text>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.name}>
            {event.advertiser.name}
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <IMAGES.ICONS.Calendar />
              <Text style={styles.details}>{moment(event.dateStart).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <IMAGES.ICONS.Clock />
              <Text style={styles.details}>{moment(event.dateStart).format('HH:mm')}</Text>
              <Text
                style={{
                  ...styles.details,
                  marginLeft: 2
                }}
              >
                ás {moment(event.dateEnd).format('HH:mm')}
              </Text>
            </View>
          </View>
        </Pressable>
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    maxWidth: 230,
    paddingVertical: 5
  },
  name: {
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    fontSize: 16
  },
  vacancy: {
    fontSize: 14,
    color: COLORS.lightBlue,
    fontWeight: 'bold'
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70
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
