import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { axiosApi } from '../../services/axios'
import { CheckBox } from '../CheckBox'
import CustomInputWithTextAndIcon from '../Input/CustomInputWithTextAndIcon'

interface OcurrenceModalContentProps {
  setModalVisible: () => void
  eventId: number
  teamId: number
  userId: number
  teamUserId: number
}

export const OcurrenceModalContent = ({ setModalVisible, teamUserId, eventId, teamId, userId }: OcurrenceModalContentProps) => {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [otherValue, setOtherValue] = useState('')
  const [checkBoxes, setCheckBoxes] = useState([])

  const saveOcurrence = async () => {
    if (checkBoxes.some((checkBox) => checkBox.checked && checkBox.id !== 4) || (checkBoxes.some((checkBox) => checkBox.checked && checkBox.id === 4) && otherValue !== '')) {
      const newOccurences = []

      checkBoxes.map((checkBox) => {
        if (checkBox.checked) {
          newOccurences.push({
            event_id: eventId,
            user_id: userId,
            team_user_id: teamUserId,
            occurrence_id: checkBox.id,
            observation: checkBox.label === 'Outro' ? otherValue : ''
          })
        }
      })

      try {
        await axiosApi.post(`/occurrences/eventOccurrences`, newOccurences)
        showMessage({
          backgroundColor: COLORS.greenColor,
          message: 'Ocorrência registrada com sucesso!',
          titleStyle: {
            color: COLORS.whiteColor,
            fontWeight: 'bold'
          },
          style: {
            justifyContent: 'center',
            alignItems: 'center'
          },
          type: 'success',
          icon: 'none'
        })
        setModalVisible()
      } catch (error) {
        //TODO - tratar erros
      }
    }
  }

  useEffect(() => {
    const loadOcurrences = async () => {
      try {
        const { data } = await axiosApi.get(`/occurrences`)

        if (data.data.length > 0) {
          const newCheckBoxes = data.data.map((occurrence) => {
            return {
              id: occurrence.id,
              label: occurrence.name,
              checked: false
            }
          })

          setCheckBoxes(newCheckBoxes)
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }

    loadOcurrences()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={setModalVisible}>
            <IMAGES.ICONS.Close />
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Registro de ocorrência</Text>
          <View>
            <Text style={styles.subTitle}>Tipo de ocorrência</Text>
            <View>
              {checkBoxes.map((checkBox, index) => (
                <View key={index} style={styles.checkboxContainer}>
                  <CheckBox
                    size={18}
                    borderColor={COLORS.primaryColor}
                    checked={checkBox.checked}
                    setChecked={(checked: boolean) => {
                      const newCheckBoxes = [...checkBoxes]
                      newCheckBoxes[index].checked = checked
                      setCheckBoxes(newCheckBoxes)

                      if (newCheckBoxes[index].label === 'Outro' && checked) {
                        setShowOtherInput(true)
                      } else if (newCheckBoxes[index].label === 'Outro' && !checked) {
                        setShowOtherInput(false)
                      }
                    }}
                  />
                  <Text style={styles.label}>{checkBox.label}</Text>
                </View>
              ))}
            </View>
            {showOtherInput && (
              <View>
                <CustomInputWithTextAndIcon
                  multiline={true}
                  numberOfLines={150}
                  label={''}
                  placeholder="Caso queira, nos conte mais detalhes da ocorrência."
                  onChangeText={setOtherValue}
                  value={otherValue}
                />
              </View>
            )}
          </View>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={saveOcurrence}>
            <Text
              style={{
                ...styles.submit,
                color:
                  checkBoxes.some((checkBox) => checkBox.checked && checkBox.id !== 4) ||
                  (checkBoxes.some((checkBox) => checkBox.checked && checkBox.id === 4) && otherValue !== '')
                    ? COLORS.primaryColor
                    : COLORS.lightGrayColor
              }}
            >
              ENVIAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 100
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 7
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  modalContent: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30
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
    color: COLORS.mediumBlueColor,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
    marginBottom: 20,
    marginTop: 10
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrayColor
  },
  submit: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})
