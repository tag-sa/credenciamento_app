import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { AdvertiserEventItem } from '../../AdvertiserEventItem'
import Button from '../../Button/Button'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import { useState } from 'react'
import { DialogModal } from '../../DialogModal'

interface AdverstiserAboutProps {
  advertiser: any
  reload: () => void
}

export const AdverstiserAbout = ({ advertiser, reload }: AdverstiserAboutProps) => {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDuplicateVisible, setModalDuplicateVisible] = useState(false)
  const [idToDelete, setIdToDelete] = useState()
  const [idToDuplicate, setIdToDuplicate] = useState()

  const handleDuplicate = async () => {
    useLoadingStore.setState({ isLoading: true })
    try {
      await axiosApi.post(`/events/${idToDuplicate}/duplicate`)
      useLoadingStore.setState({ isLoading: false })
      reload()
    } catch (error) {
      useLoadingStore.setState({ isLoading: false })
      //TODO: handle error
    }
  }

  const handleDelete = async () => {
    useLoadingStore.setState({ isLoading: true })

    try {
      await axiosApi.delete(`/events/${idToDelete}`)
      useLoadingStore.setState({ isLoading: false })
      reload()
    } catch (error) {
      useLoadingStore.setState({ isLoading: false })
      //TODO: handle error
    }
  }

  return (
    <>
      <DialogModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={'Remover evento'}
        message={'Tem certeza que deseja remover este evento?'}
        confirmAction={handleDelete}
      />

      <DialogModal
        modalVisible={modalDuplicateVisible}
        setModalVisible={setModalDuplicateVisible}
        title={'Duplicar evento'}
        message={'Tem certeza que deseja duplicar este evento?'}
        confirmAction={handleDuplicate}
      />

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
                setIdToDelete(event.id)
                setModalVisible(true)
              }}
              onDuplicate={() => {
                setIdToDuplicate(event.id)
                setModalDuplicateVisible(true)
              }}
            />
          ))}
        </View>
        <View style={{ marginBottom: 100 }}>
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
    </>
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
