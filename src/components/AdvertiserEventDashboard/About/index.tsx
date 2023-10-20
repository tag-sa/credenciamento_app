import moment from 'moment'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'

interface AdverstiserEventAboutTabProps {
  dateStart: string
  dateEnd: string
  placeName: string
  placeAddress: string
}

export const AdverstiserEventAboutTab = (props: AdverstiserEventAboutTabProps) => {
  return (
    <View style={styles.tabItemContent}>
      <Text style={{ ...styles.title, textAlign: 'left' }}>Informações</Text>
      <View style={{ ...styles.aboutItem, marginTop: 35 }}>
        <IMAGES.ICONS.EmptyCalendar />
        <Text style={styles.aboutItemText}>
          {moment(props.dateStart).format('DD/MM/YYYY')} á {moment(props.dateEnd).format('DD/MM/YYYY')}
        </Text>
      </View>
      <View style={styles.aboutItem}>
        <IMAGES.ICONS.ClockAboutEvent />
        <Text style={styles.aboutItemText}>
          {moment(props.dateStart).format('HH:mm')} á {moment(props.dateEnd).format('HH:mm')}
        </Text>
      </View>
      <View style={{ ...styles.aboutItem, borderBottomWidth: 0 }}>
        <IMAGES.ICONS.LocationAboutEvent />
        <View>
          <Text style={styles.aboutItemText}>{props.placeName}</Text>
          <Text style={{ ...styles.aboutItemText, color: COLORS.lightBlue, fontSize: 12 }}>{props.placeAddress}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 30
  },
  aboutItem: {
    marginTop: 20,
    paddingHorizontal: PADDINGS.horizontal,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlue
  },
  aboutItemText: {
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  }
})
