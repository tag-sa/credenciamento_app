import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import Button from '../../Button/Button'
import { DialogModal } from '../../DialogModal'
import { NotFound } from '../../NotFound'

interface AdvertiserPlacesProps {
  advertiserId: number
  reload: () => void
  places: {
    id: string
    advertiser_id: number
    name: string
    description: string
    address: string
    city: string
    state: string
    country: string
    zip: string
    created: string
    modified: string
    neighborhood: string
    number: string
  }[]
}

export const AdverstiserPlaces = ({ advertiserId, places, reload }: AdvertiserPlacesProps) => {
  const navigation = useNavigation<any>()
  const [modalVisible, setModalVisible] = useState(false)
  const [placeId, setPlaceId] = useState('')

  const removePlace = async () => {
    useLoadingStore.setState({ isLoading: true })

    try {
      await axiosApi.delete(`/advertisers/${advertiserId}/places/${placeId}`)
      reload()
      useLoadingStore.setState({ isLoading: false })
    } catch (e) {
      useLoadingStore.setState({ isLoading: false })
      showMessage({
        backgroundColor: COLORS.red,
        message: 'Erro ao remover local',
        description: 'Não foi possível remover o local, tente novamente.',
        type: 'danger',
        icon: 'danger'
      })
    }
  }

  return (
    <>
      <View style={styles.content}>
        <DialogModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'Remover local?'}
          message={'Ao remover local todos os eventos relacionados á este local também serão excluídos.'}
          confirmAction={removePlace}
        />

        {!places?.length && (
          <View style={{ marginBottom: 0, paddingHorizontal: PADDINGS.horizontal }}>
            <NotFound text_1="Nenhum local encontrado" text_2="Cadastre um novo local clicando no botão abaixo" />
          </View>
        )}

        {places?.map((place, index) => (
          <View
            style={{
              ...styles.card,
              marginBottom: index !== places.length - 1 ? 15 : 0
            }}
            key={index}
          >
            <View style={styles.iconContainer}>
              <IMAGES.ICONS.LocationWhite />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{place.name}</Text>
              <Text style={styles.address}>
                {place.address}, {place.number}
              </Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text style={styles.state}>{place.neighborhood}dasdas</Text>
                <Text style={styles.city}>{place.city}</Text>
                <Text style={styles.state}>{place.state}</Text>
              </View>
            </View>
            <View style={styles.TrashContainer}>
              <TouchableOpacity
                onPress={() => {
                  setPlaceId(place.id)
                  setModalVisible(true)
                }}
              >
                <IMAGES.ICONS.Trash />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ marginVertical: 30 }}>
          <Button
            buttonEnabled={true}
            onPress={() =>
              navigation.navigate('AdvertiverPlaceAddScreen', {
                advertiserId
              })
            }
            label={'Novo local'}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20
  },
  card: {
    height: 90,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 30
  },
  iconContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 10
  },
  TrashContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.darkBlue
  },
  address: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.darkBlue,
    marginTop: 5
  },
  city: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.lightBlue,
    marginTop: 5
  },
  state: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.lightBlue,
    marginTop: 5
  }
})
