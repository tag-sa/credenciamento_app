import { Slider } from '@miblanchard/react-native-slider'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { BackButton } from '../../../components/BackButton'
import { CheckBox } from '../../../components/CheckBox'
import Radio from '../../../components/Radio/Radio'

import { DialogModalBottomSheetWithCheckbox } from '../../../components/DialogModalBottomWithCheckbox'
import CustomSelectInputCheckbox from '../../../components/SelectInputCheckbox'
import { Switch } from '../../../components/Switch'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useGlobalStore } from '../../../store'

export const SettingsPage = () => {
  const [isEnabledConvocation, setIsEnabledConvocation] = useState(false)
  const [isEnabledJobsNotifications, setIsEnabledJobsNotifications] = useState(false)
  const [isEnabledConvocationNeedsApproval, setIsEnabledConvocationNeedsApproval] = useState(false)

  const [functions, setFunctions] = useState<{ id: number; name: string }[]>([])
  const [userFunctions, setUserFunctions] = useState<{ function_id: number }[]>([])
  const [notificationsCheckBoxes, setNotificationsCheckBoxes] = useState([
    {
      id: 1,
      label: 'SMS',
      field: 'sms',
      checked: false
    },
    {
      id: 2,
      label: 'Push',
      field: 'push',
      checked: false
    },
    {
      id: 3,
      label: 'E-mail',
      field: 'email',
      checked: false
    },
    {
      id: 4,
      label: 'WHATS',
      field: 'whatsapp',
      checked: false
    }
  ])

  const [informationsToShowCheckboxex, setInformationsToShowCheckboxex] = useState([
    {
      id: 1,
      label: 'AVALIAÇÃO',
      checked: false,
      field: 'show_score'
    },
    {
      id: 2,
      label: 'EVENTOS TRABALHADOS',
      checked: false,
      field: 'show_jobs_worked'
    }
  ])

  const [jobsType, setJobsType] = useState('')
  const [distance, setDistance] = useState(1)
  const MIN_DISTANCE = 1
  const MAX_DISTANCE = 100

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }
  const handleModalDismissed = async (newSelectedValues: Array<{ function_id: number }>) => {
    useGlobalStore.setState({ isLoading: true })

    setUserFunctions(newSelectedValues)
    setOpenModal(false)

    console.log(newSelectedValues)

    const { data } = await axiosApi.post(`/users/settings/functions`, {
      functions_ids: newSelectedValues.map((func) => func.function_id)
    })

    console.log(data)

    useGlobalStore.setState({ isLoading: false })
  }

  const handleUpdateConvocation = async () => {
    setIsEnabledConvocation(!isEnabledConvocation)

    await axiosApi.patch(`/users/settings`, {
      field: 'enable_convocation',
      value: !isEnabledConvocation
    })
  }

  useEffect(() => {
    const loadFunctions = async () => {
      useGlobalStore.setState({ isLoading: true })

      const allData = await Promise.all([axiosApi.get(`/functions`), axiosApi.get(`/users/settings`)])

      const [{ data }, { data: userSettings }] = allData
      const { settings } = userSettings.data
      const jobs_notifications: { type: 'email' | 'sms' | 'push' | 'whats' }[] = userSettings.data.jobs_notifications

      if (jobs_notifications) {
        setIsEnabledJobsNotifications(true)
        const newNotificationsCheckBoxes = [...notificationsCheckBoxes]
        jobs_notifications.forEach((notification) => {
          const index = newNotificationsCheckBoxes.findIndex((checkBox) => checkBox.field == notification.type)
          if (index >= 0) {
            newNotificationsCheckBoxes[index].checked = true
          }
        })
        setNotificationsCheckBoxes(newNotificationsCheckBoxes)
      }

      setFunctions(data.data)
      setIsEnabledConvocation(settings?.enable_convocation)
      setJobsType(settings?.jobs_types)
      setDistance(settings?.distance)
      setIsEnabledConvocationNeedsApproval(settings?.convocations_needs_approval)
      setUserFunctions(userSettings.data.functions)

      if (settings?.show_score) {
        const newInformationsToShowCheckboxex = [...informationsToShowCheckboxex]
        newInformationsToShowCheckboxex[0].checked = true
        setInformationsToShowCheckboxex(newInformationsToShowCheckboxex)
      }

      if (settings?.show_jobs_worked) {
        const newInformationsToShowCheckboxex = [...informationsToShowCheckboxex]
        newInformationsToShowCheckboxex[1].checked = true
        setInformationsToShowCheckboxex(newInformationsToShowCheckboxex)
      }

      setIsEnabledJobsNotifications(notificationsCheckBoxes.some((notification) => notification.checked))

      useGlobalStore.setState({ isLoading: false })
    }

    loadFunctions()
  }, [])

  return (
    <>
      <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <BackButton />
          </View>

          <Text style={styles.title}>Configurações candidato</Text>
          <View style={styles.content}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.option}>Disponibilidade do perfil</Text>
                <Switch
                  isEnabled={isEnabledConvocation}
                  toggleSwitch={handleUpdateConvocation}
                  activeFontWeight={'bold'}
                  inactiveFontWeight="bold"
                  activeText="Ativo"
                  inactiveText="Inativo"
                />
              </View>
              <Text style={styles.optionDescriptions}>
                Essa configuração permite que anunciantes te convoquem para uma vaga. Caso não esteja em busca de uma oportunidade você pode desabilitar no botão acima.
              </Text>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <Text style={styles.option}>Notificações de vagas</Text>
                <Switch
                  isEnabled={isEnabledJobsNotifications}
                  toggleSwitch={() => setIsEnabledJobsNotifications(!isEnabledJobsNotifications)}
                  activeText="Ativo"
                  inactiveText="Inativo"
                />
              </View>
              <Text style={styles.optionDescriptions}>
                Essa configuração permite que você seja avisado quando uma nova vaga for publicada. Você pode escolher receber por sms ou por push (notificação do aplicativo).
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                {notificationsCheckBoxes.map((checkBox, index) => (
                  <View key={index} style={styles.checkboxContainer}>
                    <CheckBox
                      size={18}
                      backgroundColor={COLORS.darkBlue}
                      checkBorderColor="white"
                      borderColor={COLORS.darkBlue}
                      checked={checkBox.checked}
                      setChecked={(checked: boolean) => {
                        const newCheckBoxes = [...notificationsCheckBoxes]
                        newCheckBoxes[index].checked = checked
                        setNotificationsCheckBoxes(newCheckBoxes)
                      }}
                    />
                    <Text style={styles.label}>{checkBox.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Text style={styles.option}>Tipo de vagas</Text>
              </View>
              <Text style={styles.optionDescriptions}>Essa configuração define quais vagas serão notificadas para você.</Text>

              <Radio
                setValue={(val) => {
                  setJobsType(val)
                  axiosApi.patch(`/users/settings`, {
                    field: 'jobs_types',
                    value: val
                  })
                }}
                initialSelectedValue={jobsType}
                items={[
                  { label: 'Por função', value: 'by_function' },
                  { label: 'Geral', value: 'general' }
                ]}
              />
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30, marginBottom: 10 }}>
                <Text style={styles.option}>Funções</Text>
              </View>
              <CustomSelectInputCheckbox
                value={userFunctions.map((userFunction) => {
                  const index = functions.findIndex((func) => func.id === userFunction.function_id)
                  return functions[index].name
                })}
                placeholder="Selecione uma função"
                marginTop={0}
                onInputPress={handleOpenModal}
              />
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <Text style={styles.option}>Distância</Text>
              </View>
              <Text style={styles.optionDescriptions}>Selecionando a distância máxima para deslocamento mostraremos vagas disponíveis conforme a sua definição.</Text>

              <View style={{ marginTop: 30 }}>
                <Slider
                  animateTransitions
                  minimumTrackTintColor={COLORS.darkBlue}
                  maximumTrackTintColor={COLORS.lightBlue}
                  minimumValue={MIN_DISTANCE}
                  maximumValue={MAX_DISTANCE}
                  trackStyle={{ height: 10, borderRadius: 10 }}
                  step={1}
                  renderAboveThumbComponent={() => <Text style={{ color: COLORS.darkBlue, fontWeight: 'bold' }}>{distance}km</Text>}
                  thumbTintColor={COLORS.darkBlue}
                  onValueChange={(value) => setDistance(+value)}
                  value={distance}
                  onSlidingComplete={async ([distance]) =>
                    await axiosApi.patch(`/users/settings`, {
                      field: 'distance',
                      value: distance
                    })
                  }
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: COLORS.darkBlue, fontWeight: '700' }}>{MIN_DISTANCE}km</Text>
                  <Text style={{ color: COLORS.darkBlue, fontWeight: '700' }}>{MAX_DISTANCE}km</Text>
                </View>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                <Text style={styles.option}>Informações no meu perfil</Text>
              </View>
              <Text style={styles.optionDescriptions}>
                Aqui você escolhe as informações que aparecerão para anunciantes no seu perfil. Lembramos que essas informações te ajudam na contratação.
              </Text>

              <View style={{ flexDirection: 'row' }}>
                {informationsToShowCheckboxex.map((checkB, idx) => (
                  <View key={idx} style={styles.checkboxContainer}>
                    <CheckBox
                      size={18}
                      backgroundColor={COLORS.darkBlue}
                      checkBorderColor="white"
                      borderColor={COLORS.darkBlue}
                      checked={checkB.checked}
                      setChecked={(checked: boolean) => {
                        const newCheckBoxes = [...informationsToShowCheckboxex]
                        newCheckBoxes[idx].checked = checked
                        setInformationsToShowCheckboxex(newCheckBoxes)

                        axiosApi.patch(`/users/settings`, {
                          field: checkB.field,
                          value: checked
                        })
                      }}
                    />
                    <Text style={styles.label}>{checkB.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Text style={{ ...styles.title, marginTop: 20 }}>Configurações anunciante</Text>

            <View style={{ marginTop: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.option}>Aprovação de candidatos</Text>
                <Switch
                  isEnabled={isEnabledConvocationNeedsApproval}
                  toggleSwitch={() => {
                    setIsEnabledConvocationNeedsApproval(!isEnabledConvocationNeedsApproval)

                    axiosApi.patch(`/users/settings`, {
                      field: 'convocations_needs_approval',
                      value: !isEnabledConvocationNeedsApproval
                    })
                  }}
                  activeText="Ativo"
                  inactiveText="Inativo"
                />
              </View>
              <Text style={styles.optionDescriptions}>
                Se você ativar essa opção, todos as pessoas que se candidatarem a uma vaga deverão passar pela sua aprovação. Caso contrário, todo candidato fica automaticamente
                confirmado ao se candidatar.
              </Text>
            </View>
          </View>
          <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 16, marginTop: 50, marginBottom: 50 }}>Deletar minha conta</Text>
        </View>
      </ScrollView>

      <DialogModalBottomSheetWithCheckbox
        data={functions}
        selectedValues={userFunctions}
        openModal={openModal}
        onDismiss={
          handleModalDismissed
          //   (newValues) => {
          //   setUserFunctions(newValues)
          //   setOpenModal(false)

          // }
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingVertical: PADDINGS.vertical
  },
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.horizontal
  },
  content: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: COLORS.darkBlue,
    fontWeight: '700'
    // marginTop: 20
  },
  switchEnableBorder: {
    borderColor: '#6fa6d3',
    borderWidth: 1
  },

  switchDisableBorder: {
    borderColor: '#f2f2f2',
    borderWidth: 1
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    margin: 8,
    color: COLORS.mediumBlue,
    fontWeight: 'bold'
  },
  option: {
    fontWeight: 'bold',
    color: COLORS.darkBlue
  },
  optionDescriptions: {
    color: COLORS.lightBlue,
    marginTop: 10
  }
})
