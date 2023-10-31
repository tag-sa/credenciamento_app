import { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Image, ScrollView, StyleSheet, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { showMessage } from 'react-native-flash-message'
import Button from '../../../components/Button/Button'
import { DialogModalBottomSheet } from '../../../components/DialogModalBottom'
import Radio from '../../../components/Radio/Radio'
import RegistrationSteps from '../../../components/RegistrationSteps/RegistrationSteps'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { UserType } from '../../../model/user.model'
import { axiosApi } from '../../../services/axios'
import { useUserStore } from '../../../store/user.store'
import Step1 from './steps/step-1'
import Step2 from './steps/step-2'
import Step3 from './steps/step-3'

export const AccountCreateScreen = () => {
  const navigation = useNavigation<any>()
  const { top } = useSafeAreaInsets()
  const { setUser } = useUserStore()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    document: '',
    zip: '',
    addressNickname: '',
    addressNumber: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    date: '',
    gender: '',
    errors: []
  })

  const [type, setType] = useState('pf')
  const [step, setStep] = useState(1)
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const totalSteps = 3

  const [gender, setGender] = useState<{ id: number; name: string }>()
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
    if (step == 1) {
      if (!data.name || !data.email || !data.password || data.errors.length) {
        setButtonEnabled(false)
      } else {
        setButtonEnabled(true)
      }
    }

    if (step == 2) {
      if (type == 'pj') {
        if (!data.document || !data.date || data.errors.length) {
          setButtonEnabled(false)
        } else {
          setButtonEnabled(true)
        }
      } else {
        if (!data.document || !data.date || !data.gender || data.errors.length) {
          setButtonEnabled(false)
        } else {
          setButtonEnabled(true)
        }
      }
    }

    if (step == 3) {
      if (!data.zip || !data.addressNumber || !data.address || !data.neighborhood || !data.city || !data.state || data.errors.length) {
        setButtonEnabled(false)
      } else {
        setButtonEnabled(true)
      }
    }
  }, [step, data])

  const handleContinue = async () => {
    if (step < totalSteps && buttonEnabled) {
      setStep(step + 1)
    }

    if (step == totalSteps && buttonEnabled) {
      const payload = {
        name: data.name,
        email: data.email,
        gender: data.gender,
        password: data.password,
        nickname: data.name,
        document: data.document,
        birthdate: moment(data.date, 'DDMMYYYY').format('YYYY-MM-DD'),
        address: {
          address: data.address,
          complement: data.addressNickname,
          number: data.addressNumber,
          zip: data.zip,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state
        }
      }

      try {
        await axiosApi.post('/users', payload)

        const execLogin = await axiosApi.post('/users/login', {
          email: data.email,
          password: data.password
        })

        const login = execLogin.data

        const user: UserType = {
          id: login.data.user.id,
          name: login.data.user.name,
          gender: login.data.user.gender,
          email: login.data.user.email,
          nickname: login.data.user.nickname,
          document: login.data.user.type == 'pj' ? login.data.user.cnpj : login.data.user.cpf,
          type: login.data.user.type
        }

        setUser(user)
        await AsyncStorage.setItem('token', login.data.access_token)

        navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardDrawer' }]
        })
      } catch (error) {
        let title = 'Erro ao fazer login'
        let message = 'Usuário ou senha inválidos'

        showMessage({
          backgroundColor: COLORS.red,
          message: title,

          description: message,
          type: 'danger',
          icon: 'danger'
        })
      }
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ ...styles.container, paddingTop: top }}>
        <View style={styles.header}>
          <Image source={IMAGES.Logo} />
        </View>

        <View style={styles.body}>
          {step === 1 && (
            <Radio
              setValue={setType}
              initialSelectedValue={type}
              items={[
                { label: 'Pessoa Física', value: 'pf' },
                { label: 'Pessoa Jurídica', value: 'pj' }
              ]}
            />
          )}

          {step === 1 && (
            <Step1
              type={type}
              retProps={(name, email, password, errors) => {
                setData({
                  name,
                  email,
                  password,
                  document: '',
                  date: '',
                  zip: '',
                  addressNickname: '',
                  addressNumber: '',
                  address: '',
                  neighborhood: '',
                  city: '',
                  state: '',
                  gender: '',
                  errors
                })
              }}
            />
          )}

          {step === 2 && (
            <Step2
              openGenderModal={() => {
                handleOpenModal()
              }}
              gender={gender}
              type={type}
              retProps={(document, date, errors) => setData({ ...data, document, date, errors })}
            />
          )}

          {step === 3 && (
            <Step3
              retProps={(zip, addressNickname, addressNumber, address, neighborhood, city, state, errors) =>
                setData({
                  ...data,
                  zip,
                  addressNickname,
                  addressNumber,
                  address,
                  neighborhood,
                  city,
                  state,
                  errors
                })
              }
            />
          )}

          <View style={{ alignItems: 'center', marginTop: 30 }}>
            <RegistrationSteps currentStep={step} totalSteps={totalSteps} />
          </View>

          <View style={{ marginBottom: step == 3 ? 50 : 0 }}>
            <Button label="Continuar" buttonEnabled={buttonEnabled} onPress={handleContinue} />
          </View>
        </View>

        <DialogModalBottomSheet
          data={[
            { id: 'm', name: 'Masculino' },
            { id: 'f', name: 'Feminino' },
            { id: 'o', name: 'Outros' },
            { id: 'n', name: 'Não informar' }
          ]}
          openModal={isModalOpen}
          onModalPresented={handleModalPresented}
          onModalDismissed={handleModalDismissed}
          onSelectItem={(item) => {
            setData({ ...data, gender: item.id })
            setGender(item)
            handleModalDismissed()
          }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 140
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 100,
    paddingTop: 50,
    paddingHorizontal: PADDINGS.horizontal
  }
})
