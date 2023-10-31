import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DialogModalBottomSheet } from '../../../components/DialogModalBottom'
import CustomInputWithTextAndIcon from '../../../components/Input/CustomInputWithTextAndIcon'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { UserType } from '../../../model/user.model'
import { axiosApi } from '../../../services/axios'
import { useUserStore } from '../../../store/user.store'

export const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { setUser, getUser } = useUserStore()
  const { top } = useSafeAreaInsets()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)

  async function checkLogin() {
    const user = getUser()

    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardDrawer' }]
      })
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  const login = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

    setInvalidEmail(false)
    if (!reg.test(email)) {
      setInvalidEmail(true)
      return false
    }

    try {
      const { data: login } = await axiosApi.post('/users/login', {
        email,
        password
      })
      const user: UserType = {
        id: login.data.user.id,
        name: login.data.user.name,
        gender: login.data.user.gender,
        email: login.data.user.email,
        nickname: login.data.user.nickname,
        document: login.data.user.type == 'pj' ? login.data.user.cnpj : login.data.user.cpf,
        type: login.data.user.type,
        about: login.data.user.about
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

      if (error.response.status !== 401) {
        message = 'Não foi possível fazer login, tente novamente mais tarde'
      }

      showMessage({
        backgroundColor: COLORS.red,
        hideStatusBar: true,
        message: title,
        description: message,
        type: 'danger',
        icon: 'danger'
      })
    }
  }

  return (
    <>
      <DialogModalBottomSheet
        data={[{ id: 1, name: 'teste' }]}
        openModal={true}
        // onModalPresented={handleModalPresented}
        // onModalDismissed={handleModalDismissed}
        onSelectItem={() => {}}
      />
      <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ ...styles.container, paddingTop: top }}>
          <View style={styles.header}>
            <Image source={require('../../../../assets/images/logo.png')} />
          </View>

          <View style={styles.body}>
            <Text
              style={{
                ...styles.newAccount,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
              }}
            >
              Não possuo uma conta,{' '}
              <Text onPress={() => navigation.navigate('AccountCreate')} style={styles.createNow}>
                criar agora.
              </Text>
            </Text>
            <CustomInputWithTextAndIcon
              autoCapitalize="none"
              keyboardType={'email-address'}
              marginTop={40}
              label="Login"
              onChangeText={setEmail}
              value={email}
              placeholder="seu@email.com"
              error={invalidEmail}
            />
            {invalidEmail && <Text style={styles.invalidEmail}>Email inválido</Text>}

            <CustomInputWithTextAndIcon
              marginTop={25}
              label="Senha"
              onChangeText={setPassword}
              value={password}
              placeholder="sua senha aqui"
              icons={['eye-outline', 'eye-off-outline']}
              iconSize={22}
              iconColor={COLORS.darkBlue}
              obscureText={true}
            />

            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: !email || !password ? COLORS.darkGray : COLORS.darkBlue,
                borderRadius: 10,
                height: 50,
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center',
                width: 250,
                alignSelf: 'center'
              }}
              onPress={login}
              // disabled={!email || !password}
            >
              <Text style={styles.signInButton}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.orSignInWith}>Esqueci minha senha</Text>

            <View style={styles.socialButtons}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image source={require('../../../../assets/images/social-icon-apple.png')} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Image source={require('../../../../assets/images/social-icon-google.png')} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Image source={require('../../../../assets/images/social-icon-facebook.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    paddingTop: 150,
    paddingHorizontal: PADDINGS.horizontal
  },
  newAccount: {
    color: COLORS.darkGray
  },
  createNow: {
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  input: {
    marginTop: 120,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.darkGray,
    borderRadius: 7
  },
  label: {
    color: COLORS.darkBlue
  },
  inputText: {
    color: COLORS.darkGray,
    marginTop: 10,
    fontWeight: 'bold'
  },
  forgotPassword: {
    color: COLORS.darkGray,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 10
  },
  signInButton: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2
  },
  orSignInWith: {
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 50
  },
  socialButtons: {
    display: 'flex',
    width: '55%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13
  },
  invalidEmail: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.red,
    fontSize: 10
  }
})
