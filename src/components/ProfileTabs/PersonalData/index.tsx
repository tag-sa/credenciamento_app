import { cnpj, cpf } from 'cpf-cnpj-validator'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import isEmail from 'validator/lib/isEmail'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'

import { axiosApi } from '../../../services/axios'

import { UserType } from '../../../model/user.model'
import { useLoadingStore } from '../../../store/loading.store'
import { useUserStore } from '../../../store/user.store'
import Button from '../../Button/Button'
import CustomInputWithTextAndIcon from '../../Input/CustomInputWithTextAndIcon'

interface PersonalDataTabProps {}

export const PersonalDataTab = ({}: PersonalDataTabProps) => {
  const { getUser, setUser } = useUserStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [userState, setUserState] = useState<UserType>(null)
  const [documentMask, setDocumentMask] = useState('999.999.999-99')
  const [phoneMask, setPhoneMask] = useState('(99) 99999-9999')

  const [errors, setErrors] = useState<string[]>([])

  const validateCpf = (val: string) => cpf.isValid(val)
  const validateCnpj = (val: string) => cnpj.isValid(val)

  useEffect(() => {
    async function load() {
      const user = getUser()

      setDocumentMask(user?.type === 'pf' ? '999.999.999-99' : '99.999.999/9999-99')

      setUserState(user)
      setName(user?.name)
      setEmail(user?.email)
      setDocument(user?.document)
    }

    load()
  }, [])

  const handleUpdate = async () => {
    const data = {
      name,
      email,
      document,
      phone
    }

    if (password) {
      data['password'] = password
    }

    useLoadingStore.setState({ isLoading: true })

    try {
      await axiosApi.put(`/users/${userState.id}`, data)

      userState.name = name
      userState.email = email
      userState.document = document

      useLoadingStore.setState({ isLoading: false })

      setUser(userState)
    } catch (e) {
      // TODO: handle error
      useLoadingStore.setState({ isLoading: false })
    }
  }

  return (
    <View style={styles.content}>
      <>
        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          label={userState?.type === 'pf' ? 'Nome Completo' : 'Razão Social / Nome Fantasia'}
          onChangeText={(_, value) => {
            setName(value)

            if (name.split(' ').length < 2) {
              if (!errors.includes('name')) setErrors([...errors, 'name'])
            } else {
              setErrors(errors.filter((error) => error !== 'name'))
            }
          }}
          error={errors.includes('name')}
          value={name}
          placeholder={userState?.type === 'pf' ? 'seu nome aqui' : 'O nome que será exibido para os candidatos'}
        />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          keyboardType={'email-address'}
          marginTop={20}
          label="Email"
          onChangeText={(_, value) => {
            setEmail(value)

            if (!isEmail(value)) {
              if (!errors.includes('email')) setErrors([...errors, 'email'])
            } else {
              setErrors(errors.filter((error) => error !== 'email'))
            }
          }}
          value={email}
          placeholder="seu@email.com"
          error={errors.includes('email')}
          erroMessage="Email inválido"
        />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label={userState?.type === 'pf' ? 'CPF' : 'CNPJ'}
          mask={documentMask}
          onChangeText={(_, value) => {
            if (userState?.type === 'pf') {
              if (!validateCpf(value)) {
                if (!errors.includes('document')) setErrors([...errors, 'document'])
              } else {
                setErrors(errors.filter((error) => error !== 'document'))
              }
            } else {
              if (!validateCnpj(value)) {
                if (!errors.includes('document')) setErrors([...errors, 'document'])
              } else {
                setErrors(errors.filter((error) => error !== 'document'))
              }
            }

            setDocument(value)
          }}
          error={errors.includes('document')}
          erroMessage={userState?.type === 'pf' ? 'CPF inválido' : 'CNPJ inválido'}
          value={document}
          placeholder={userState?.type === 'pf' ? '000.000.000-00' : '00.000.000/0000-00'}
        />

        {/* <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label={'Celular'}
          mask={phoneMask}
          onChangeText={(_, value) => {
            if (value.length < 11) {
              if (!errors.includes('phone')) setErrors([...errors, 'phone'])
            } else {
              setErrors(errors.filter((error) => error !== 'phone'))
            }

            setPhone(value)
          }}
          error={errors.includes('phone')}
          erroMessage="Celular inválido"
          value={phone}
          placeholder="(00) 00000-0000"
        /> */}

        <CustomInputWithTextAndIcon
          marginTop={20}
          label="Senha"
          onChangeText={(_, value) => {
            setPassword(value)

            if (!value || value.length < 6) {
              if (!errors.includes('password')) setErrors([...errors, 'password'])
            } else {
              setErrors(errors.filter((error) => error !== 'password'))
            }
          }}
          error={errors.includes('password')}
          value={password}
          placeholder="alterar senha"
          icons={['eye-outline', 'eye-off-outline']}
          erroMessage="Senha deve ter no mínimo 6 caracteres"
          iconSize={22}
          iconColor={COLORS.darkBlue}
          obscureText={true}
        />
      </>

      <View style={{ marginVertical: 30 }}>
        <Button label="SALVAR" buttonEnabled={!errors.length} onPress={handleUpdate} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 35
  },
  title: {
    fontSize: 18,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  }
})
