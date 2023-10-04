import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { AdvertiserEventItem } from '../../AdvertiserEventItem'

export const AdverstiserPastEvents = ({ advertiser }) => {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.tabItemContent}>
      <View style={styles.advertisersList}>
        {advertiser?.pastEvents?.map((event, index) => (
          <AdvertiserEventItem
            isPastEvent={true}
            key={index}
            event={event}
            onClick={() => {
              navigation.navigate('AdvertiserEventDashboardScreen', {
                eventId: event.id,
                isPastEvent: true
              })
            }}
            onDelete={() => {
              console.log(advertiser.id)
            }}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    paddingTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
    textAlign: 'center'
  },
  advertisersList: {
    marginTop: 10,
    marginBottom: 20
  }
})
