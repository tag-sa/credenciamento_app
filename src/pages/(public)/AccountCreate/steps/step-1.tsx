import { useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import CustomInputWithTextAndIcon from '../../../../components/Input/CustomInputWithTextAndIcon'
import { COLORS } from '../../../../constants/Colors'

interface Step1Props {
  type: string
  retProps(name: string, email: string, password: string, errors: Array<String>): void
}

export default function Step1({ type, retProps }: Step1Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  return (
    <>
      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={40}
        label={type === 'pf' ? 'Nome Completo' : 'Razão Social / Nome Fantasia'}
        onChangeText={(_, value) => {
          setName(value)

          if (name.split(' ').length < 2) {
            if (!errors.includes('name')) setErrors([...errors, 'name'])
          } else {
            setErrors(errors.filter((error) => error !== 'name'))
          }

          retProps(value, email, password, errors)
        }}
        error={errors.includes('name')}
        value={name}
        placeholder={type === 'pf' ? 'seu nome aqui' : 'O nome que será exibido para os candidatos'}
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

          retProps(name, value, password, errors)
        }}
        value={email}
        placeholder="seu@email.com"
        error={errors.includes('email')}
        erroMessage="Email inválido"
      />

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

          retProps(name, email, value, errors)
        }}
        error={errors.includes('password')}
        value={password}
        placeholder="crie uma senha de acesso"
        icons={['eye-outline', 'eye-off-outline']}
        iconSize={22}
        iconColor={COLORS.darkBlue}
        obscureText={true}
      />
    </>
  )
}
