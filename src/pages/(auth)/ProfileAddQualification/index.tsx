import * as DocumentPicker from 'expo-document-picker'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../../../components/BackButton'
import Button from '../../../components/Button/Button'
import { DialogModalBottomSheet } from '../../../components/DialogModalBottom'
import CustomInputWithTextAndIcon from '../../../components/Input/CustomInputWithTextAndIcon'
import CustomSelectInput from '../../../components/SelectInput'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'

export const ProfileAddQualificationScreen = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [conclusionDate, setConclusionDate] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const [errors, setErrors] = useState([])
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset>(null)
  const [qualificationTypes, setQualificationTypes] = useState<{ id: number; name: string }[]>([])
  const [qualificationType, setQualificationType] = useState<{ id: number; name: string }>(null)

  const dateMask = '99/99/9999'

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

  useEffect(() => {
    const load = async () => {
      const { data } = await axiosApi.get(`/qualifications/types`)

      setQualificationTypes(data.data)
    }

    if (name && conclusionDate && place && qualificationType) {
      setButtonEnabled(true)
    } else {
      setButtonEnabled(false)
    }

    if (!qualificationTypes.length) load()
  }, [name, place, conclusionDate, qualificationType])

  const save = async () => {
    let fileUrl = null

    if (file) {
      const splitFileName = file.name.split('.')
      const fileExtension = splitFileName[splitFileName.length - 1]
      const { data: getUrls } = await axiosApi.get(`/files/presigned-url/${fileExtension}`)

      const { pre_signed_url, file_url } = getUrls.data
      fileUrl = file_url

      const form: any = new FormData()

      form.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType
      })

      const xhr = new XMLHttpRequest()
      xhr.open('PUT', pre_signed_url)
      xhr.setRequestHeader('Content-Type', file.mimeType)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Image successfully uploaded to S3')
          } else {
            console.log('Error while sending the image to S3')
          }
        }
      }
      xhr.send(form)
    }

    const toSave = {
      name,
      conclusion_date: moment(conclusionDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      valid_until: validUntil ? moment(validUntil, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      place: place,
      certificate_type_id: qualificationType.id
    }

    if (fileUrl) {
      toSave['file_url'] = fileUrl
    }

    try {
      await axiosApi.post(`/users/qualification`, toSave)

      navigation.navigate('Profile')
    } catch (e) {
      //TODO: handle error
      console.log(e.response.data)
    }
  }

  return (
    <>
      <View style={style.container}>
        <View style={{ marginTop: 10 }}>
          <BackButton route="AdvertiserDashboardScreen" routeParams={{}} />
        </View>

        <Text style={style.title}>Nova qualificação</Text>
        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={40}
          label={'Nome'}
          onChangeText={(_, value) => {
            setName(value)

            if (name.length < 2) {
              if (!errors.includes('name')) setErrors([...errors, 'name'])
            } else {
              setErrors(errors.filter((error) => error !== 'name'))
            }
          }}
          error={errors.includes('name')}
          value={name}
          placeholder={'Nome da qualificação'}
          erroMessage="Nome inválido"
        />

        <CustomInputWithTextAndIcon marginTop={20} label="Local de realização" onChangeText={setPlace} placeholder="Local de realização" value={place} />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="Data de conclusão"
          keyboardType={'numeric'}
          mask={dateMask}
          onChangeText={(value, _) => {
            if (!moment(value, 'DD/MM/YYYY').isValid()) {
              if (!errors.includes('conclusionDate')) setErrors([...errors, 'conclusionDate'])
            } else {
              if (moment(value, 'DD/MM/YYYY').isAfter(moment())) {
                if (!errors.includes('conclusionDate')) setErrors([...errors, 'conclusionDate'])
              } else {
                const splitedDate = value.split('/')
                const year = splitedDate[splitedDate.length - 1]

                if (year.length !== 4) {
                  if (!errors.includes('conclusionDate')) setErrors([...errors, 'conclusionDate'])
                } else {
                  setErrors(errors.filter((error) => error !== 'conclusionDate'))
                }
              }
            }

            setConclusionDate(value)
          }}
          error={errors.includes('conclusionDate')}
          erroMessage="Data inválida"
          value={conclusionDate}
          placeholder="dd/mm/aaaa"
        />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="Data de validade"
          keyboardType={'numeric'}
          mask={dateMask}
          onChangeText={(_, value) => {
            if (value === '') {
              setErrors(errors.filter((error) => error !== 'validUntil'))
            } else {
              if (!moment(value, 'DD/MM/YYYY').isValid()) {
                if (!errors.includes('validUntil')) setErrors([...errors, 'validUntil'])
              } else setErrors(errors.filter((error) => error !== 'validUntil'))
            }

            setValidUntil(value)
          }}
          error={errors.includes('validUntil')}
          erroMessage="Data inválida"
          value={validUntil}
          placeholder="dd/mm/aaaa"
        />

        <CustomSelectInput
          placeholder="Selecionar"
          label={'Tipo de qualificação'}
          error={errors.includes('place')}
          erroMessage="Selecione um local"
          marginTop={20}
          value={qualificationType?.name}
          onInputPress={handleOpenModal}
        />

        {!file && (
          <TouchableOpacity
            onPress={async () => {
              const getFile = await DocumentPicker.getDocumentAsync({
                multiple: false,
                copyToCacheDirectory: true
              })

              if (getFile.assets !== null) {
                setFile(getFile.assets[0])
              }
            }}
          >
            <View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <IMAGES.ICONS.RoundedPlus width={20} height={20} />
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold' }}>Adicionar certificado</Text>
            </View>
          </TouchableOpacity>
        )}

        {file && (
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                color: COLORS.darkGray,
                fontWeight: 'bold'
              }}
            >
              Certificado
            </Text>

            <View
              style={{
                marginTop: 10,
                height: 70,
                borderWidth: 1,
                paddingHorizontal: PADDINGS.horizontal,
                paddingVertical: 10,
                borderColor: COLORS.lightGray,
                borderRadius: 7,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Text style={{ color: COLORS.darkGray, fontWeight: 'bold' }}>{file.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setFile(null)
                }}
              >
                <IMAGES.ICONS.Trash />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ marginVertical: 30 }}>
          <Button label="Salvar" buttonEnabled={buttonEnabled && !errors.length} onPress={save} />
        </View>
      </View>
      <DialogModalBottomSheet
        data={qualificationTypes}
        openModal={isModalOpen}
        onModalPresented={handleModalPresented}
        onModalDismissed={handleModalDismissed}
        onSelectItem={setQualificationType}
      />
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
