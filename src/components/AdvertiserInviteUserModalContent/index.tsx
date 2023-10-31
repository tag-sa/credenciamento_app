import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import isEmail from 'validator/lib/isEmail'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'
import { axiosApi } from '../../services/axios'
import CustomInputWithTextAndIcon from '../Input/CustomInputWithTextAndIcon'

interface AdvertiserInviteUserModalContentProps {
  setModalVisible: () => void
  advertiserId: number
}

export const AdvertiserInviteUserModalContent = ({ setModalVisible, advertiserId }: AdvertiserInviteUserModalContentProps) => {
  const [email, setEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)
  useEffect(() => {}, [])

  const handleSendInvite = async () => {
    if (!email || invalidEmail) return

    try {
      await axiosApi.post(`/advertisers/${advertiserId}/invite`, { email })
      showMessage({
        backgroundColor: COLORS.green,
        message: 'Convite enviado com sucesso!',
        titleStyle: {
          color: COLORS.white,
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
      console.log(error.response.data)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={setModalVisible}>
            <IMAGES.ICONS.Close />
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Nova pessoa</Text>
          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            keyboardType={'email-address'}
            marginTop={20}
            label="Email"
            onChangeText={(_, value) => {
              setEmail(value)

              if (!isEmail(value)) {
                setInvalidEmail(true)
              } else {
                setInvalidEmail(false)
              }
            }}
            value={email}
            placeholder="seu@email.com"
            error={invalidEmail}
            erroMessage="Email inválido"
          />
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity onPress={handleSendInvite}>
            <Text
              style={{
                ...styles.submit,
                color: !email || invalidEmail ? COLORS.darkGray : COLORS.darkBlue
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
    color: COLORS.mediumBlue,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    marginBottom: 20,
    marginTop: 10
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray
  },
  submit: {
    fontSize: 15,
    fontWeight: 'bold'
  }
})
