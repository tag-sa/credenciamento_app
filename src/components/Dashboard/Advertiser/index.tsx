import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useGlobalStore } from '../../../store'
import { AdvertiserListItem } from '../../AdvertiserListItem'
import { AdvertiserStartBanner } from '../../AdvertiserStartBanner'
import { AdvertiserStarterSteps } from '../../AdvertiserStarterSteps'
import Button from '../../Button/Button'

export const AdvertiserDashboardComponent = () => {
  const navigation = useNavigation<any>()
  const [advertisers, setAdvertisers] = useState([])

  useEffect(() => {
    const load = async () => {
      useGlobalStore.setState({ isLoading: true })

      const { data } = await axiosApi.get('/advertisers')

      useGlobalStore.setState({ isLoading: false })

      setAdvertisers(data.data)
    }

    load()
  }, [])

  return (
    <>
      <View style={style.body}>
        <Text style={style.hello}>Olá</Text>
        <View style={{ marginVertical: 20 }}>
          <AdvertiserStartBanner />
        </View>
        <Text style={style.howTo}>{!advertisers.length ? 'Como começar?' : 'Meus anunciantes'}</Text>
      </View>
      {!advertisers.length && <AdvertiserStarterSteps navigation={navigation} />}

      {advertisers.length > 0 && (
        <>
          <View style={style.advertisersList}>
            {advertisers?.map((advertiser) => (
              <AdvertiserListItem
                key={advertiser.id}
                name={advertiser.name}
                url={advertiser.url}
                onClick={() => {
                  navigation.navigate('AdvertiserDashboardScreen', {
                    advertiserId: advertiser.id
                  })
                }}
                onDelete={() => {
                  console.log(advertiser.id)
                }}
              />
            ))}
          </View>

          <View style={{ marginBottom: 30 }}>
            <Button buttonEnabled={true} onPress={() => navigation.navigate('AdvertiverAddScreen')} label={'Novo anunciante'} />
          </View>
        </>
      )}
    </>
  )
}

const style = StyleSheet.create({
  body: {
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.horizontal
  },
  hello: {
    fontSize: 20,
    color: COLORS.darkBlue,
    marginTop: 20
  },
  howTo: {
    fontSize: 20,
    color: COLORS.darkBlue,
    marginTop: 10,
    fontWeight: 'bold'
  },
  advertisersList: {
    marginTop: 20,
    paddingHorizontal: PADDINGS.horizontal
  }
})
