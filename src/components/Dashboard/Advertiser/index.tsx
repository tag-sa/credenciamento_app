import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import { AdvertiserListItem } from '../../AdvertiserListItem'
import { AdvertiserStartBanner } from '../../AdvertiserStartBanner'
import { AdvertiserStarterSteps } from '../../AdvertiserStarterSteps'
import Button from '../../Button/Button'
import { DialogModal } from '../../DialogModal'

export const AdvertiserDashboardComponent = () => {
  const navigation = useNavigation<any>()
  const [advertisers, setAdvertisers] = useState([])
  const [advertiserId, setAdvertiserId] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  const load = async () => {
    useLoadingStore.setState({ isLoading: true })

    const { data } = await axiosApi.get('/advertisers')

    useLoadingStore.setState({ isLoading: false })

    setAdvertisers(data.data)
  }

  useEffect(() => {
    load()
  }, [])

  const onTeamDelete = async () => {
    try {
      await axiosApi.delete(`advertisers/${advertiserId}`)
      load()
    } catch (error) {
      //TODO: tratar erro
    }
  }

  return (
    <>
      <DialogModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Remover Anunciante?'}
        message={'Ao remover o anunciante, todos os eventos e pessoas convocadas serão removidos.'}
        confirmAction={onTeamDelete}
      />
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
                  setAdvertiserId(advertiser.id)
                  setModalVisible(true)
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
