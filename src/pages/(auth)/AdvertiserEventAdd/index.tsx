import moment from 'moment'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../../../components/BackButton'
import Button from '../../../components/Button/Button'
import { DialogModalBottomSheet } from '../../../components/DialogModalBottom'
import CustomInputWithTextAndIcon from '../../../components/Input/CustomInputWithTextAndIcon'
import CustomSelectInput from '../../../components/SelectInput'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'

export const AdvertiverEventAddScreen = ({ navigation, route }) => {
  const { advertiserId } = route.params

  const [name, setName] = useState('')
  const [eventDateStart, setEventDateStart] = useState('')
  const [eventDateEnd, setEventDateEnd] = useState('')
  const [eventTimeStart, setEventTimeStart] = useState('')
  const [eventTimeEnd, setEventTimeEnd] = useState('')
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const [places, setPlaces] = useState<{ id: number; name: string }[]>([])
  const [eventPlace, setEventPlace] = useState<{ id: number; name: string }>()

  const [errors, setErrors] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalPresented = () => {
    setIsModalOpen(true)
  }

  const handleModalDismissed = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
    }
  }

  const dateMask = '99/99/9999'
  const timeMask = '99:99'

  const loadPlaces = async () => {
    const { data } = await axiosApi.get(`/advertisers/${advertiserId}/places`)

    if (data.data.length) {
      setPlaces(
        data.data.reduce((acc, place) => {
          acc.push({ id: place.id, name: place.name })
          return acc
        }, [])
      )
    }
  }

  useEffect(() => {
    if (name && eventDateStart && eventDateEnd && eventTimeStart && eventTimeEnd && eventPlace) {
      setButtonEnabled(true)
    } else {
      setButtonEnabled(false)
    }

    if (!places.length) {
      loadPlaces()
    }
  }, [name, eventPlace, eventDateStart, eventDateEnd, eventTimeStart, eventTimeEnd])

  const save = async () => {
    const toSave = {
      name,
      date_start: moment(`${eventDateStart} ${eventTimeStart}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
      date_end: moment(`${eventDateEnd} ${eventTimeEnd}`, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
      place_id: eventPlace.id,
      advertiser_id: advertiserId,
      status: 'a'
    }

    try {
      const { data } = await axiosApi.post(`/events`, toSave)
      navigation.navigate('AdvertiserEventDashboardScreen', {
        eventId: data.data.id,
        newEvent: true
      })
    } catch (e) {}
  }

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <View style={{ marginTop: 10 }}>
            <BackButton route="AdvertiserDashboardScreen" routeParams={{ advertiserId }} />
          </View>

          <Text style={style.title}>Novo evento</Text>
          <CustomInputWithTextAndIcon marginTop={40} label="Nome" onChangeText={setName} placeholder="Nome do evento" value={name} />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Data Inicial"
            keyboardType={'numeric'}
            mask={dateMask}
            onChangeText={(_, value) => {
              if (!moment(value, 'DD/MM/YYYY').isValid()) {
                if (!errors.includes('dateStart')) setErrors([...errors, 'dateStart'])
              } else {
                if (moment(value, 'DD/MM/YYYY').isBefore(moment())) {
                  if (!errors.includes('dateStart')) setErrors([...errors, 'dateStart'])
                } else {
                  setErrors(errors.filter((error) => error !== 'dateStart'))
                }
              }

              setEventDateStart(value)
            }}
            error={errors.includes('dateStart')}
            erroMessage="Data inicial inválida"
            value={eventDateStart}
            placeholder="dd/mm/aaaa"
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Horário Inicial"
            placeholder="00:00"
            erroMessage="Horário Inicial inválido"
            error={errors.includes('timeStart')}
            keyboardType={'numeric'}
            mask={timeMask}
            onChangeText={(_, value) => {
              if (!moment(value, 'HH:mm').isValid()) {
                if (!errors.includes('timeStart')) setErrors([...errors, 'timeStart'])
              } else {
                setErrors(errors.filter((error) => error !== 'timeStart'))
              }

              setEventTimeStart(value)
            }}
            value={eventTimeStart}
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Data Final"
            keyboardType={'numeric'}
            mask={dateMask}
            onChangeText={(_, value) => {
              if (!moment(value, 'DD/MM/YYYY').isValid()) {
                if (!errors.includes('dateEnd')) setErrors([...errors, 'dateEnd'])
              } else {
                if (moment(value, 'DD/MM/YYYY').isBefore(moment(eventDateStart, 'DD/MM/YYYY'))) {
                  if (!errors.includes('dateEnd')) setErrors([...errors, 'dateEnd'])
                } else {
                  setErrors(errors.filter((error) => error !== 'dateEnd'))
                }
              }

              setEventDateEnd(value)
            }}
            error={errors.includes('dateEnd')}
            erroMessage="Data final inválida"
            value={eventDateEnd}
            placeholder="dd/mm/aaaa"
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Horário Final"
            placeholder="00:00"
            erroMessage="Horário Final inválido"
            error={errors.includes('time')}
            keyboardType={'numeric'}
            mask={timeMask}
            onChangeText={(_, value) => {
              if (!moment(value, 'HH:mm').isValid()) {
                if (!errors.includes('timeEnd')) setErrors([...errors, 'timeEnd'])
              } else {
                setErrors(errors.filter((error) => error !== 'timeEnd'))
              }

              setEventTimeEnd(value)
            }}
            value={eventTimeEnd}
          />

          <CustomSelectInput
            placeholder="Selecione um local"
            label={'Local'}
            error={errors.includes('place')}
            erroMessage="Selecione um local"
            marginTop={20}
            value={eventPlace?.name}
            onInputPress={handleOpenModal}
          />

          <View style={{ marginVertical: 30 }}>
            <Button label="Salvar" buttonEnabled={buttonEnabled} onPress={save} />
          </View>
        </View>
      </ScrollView>
      <DialogModalBottomSheet data={places} openModal={isModalOpen} onModalPresented={handleModalPresented} onModalDismissed={handleModalDismissed} onSelectItem={setEventPlace} />
    </>
  )
}

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingVertical: PADDINGS.vertical
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.horizontal
  },
  title: {
    fontSize: 20,
    color: COLORS.darkBlue,
    fontWeight: '700',
    marginTop: 20
  }
})
