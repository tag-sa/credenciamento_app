import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { AdvertiserEventItem } from '../../AdvertiserEventItem'
import Button from '../../Button/Button'

export const AdverstiserAbout = ({ advertiser }) => {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.tabItemContent}>
      <Text style={{ ...styles.title, textAlign: 'left' }}>{advertiser?.name}</Text>
      <Text style={{ ...styles.about, textAlign: 'left' }}>{advertiser?.about}</Text>
      <Text style={{ ...styles.title, marginTop: 30, textAlign: 'left' }}>Eventos da empresa</Text>

      <View style={styles.advertisersList}>
        {advertiser?.events?.length === 0 && <Text style={{ color: COLORS.red, fontWeight: 'bold' }}>Nenhum evento encontrado</Text>}

        {advertiser?.events?.map((event, index) => (
          <AdvertiserEventItem
            key={index}
            event={event}
            onClick={() => {
              navigation.navigate('AdvertiserEventDashboardScreen', {
                eventId: event.id
              })
            }}
            onDelete={() => {
              console.log(event.id)
            }}
          />
        ))}
      </View>
      <View style={{ marginBottom: 30 }}>
        <Button
          buttonEnabled={true}
          onPress={() =>
            navigation.navigate('AdvertiverEventAddScreen', {
              advertiserId: advertiser?.id
            })
          }
          label={'Novo evento'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  },
  about: {
    color: COLORS.lightBlue,
    lineHeight: 20,
    marginTop: 15
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 40
  },
  advertisersList: {
    marginTop: 10,
    marginBottom: 20
  }
})
