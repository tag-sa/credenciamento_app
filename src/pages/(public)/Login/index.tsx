import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { axiosApi } from "../../../services/axios";
import { UserType } from "../../../model/user.model";
import { auth } from "../../../services/auth";
import { showMessage } from "react-native-flash-message";
import CustomInputWithTextAndIcon from "../../../components/Input/CustomInputWithTextAndIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { useGlobalStore } from "../../../store";

export const LoginScreen = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const user = await auth().getUser();

      if (user) {
        navigation.replace("Dashboard");
      }
    }

    checkLogin();
  }, []);

  const login = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setInvalidEmail(false);
    if (!reg.test(email)) {
      setInvalidEmail(true);
      return false;
    }

    try {
      const { data: login } = await axiosApi.post("/users/login", {
        email,
        password,
      });

      const user: UserType = {
        id: login.data.user.id,
        name: login.data.user.name,
        email: login.data.user.email,
        access_token: login.data.access_token,
        nickname: login.data.user.nickname,
        document:
          login.data.user.type == "pj"
            ? login.data.user.cnpj
            : login.data.user.cpf,
        type: login.data.user.type,
      };

      await auth().setUser(user);
      await auth().setToken(login.data.access_token);

      navigation.replace("Dashboard");
    } catch (error) {
      let title = "Erro ao fazer login";
      let message = "Usuário ou senha inválidos";

      if (error.response.status !== 401) {
        message = "Não foi possível fazer login, tente novamente mais tarde";
      }

      showMessage({
        backgroundColor: COLORS.dangerColor,
        message: title,

        description: message,
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={{ ...styles.container, paddingTop: top }}>
        <View style={styles.header}>
          <Image source={require("../../../../assets/images/logo.png")} />
        </View>

        <View style={styles.body}>
          <Text
            style={{
              ...styles.newAccount,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            Não possuo uma conta,{" "}
            <Text
              onPress={() => navigation.navigate("AccountCreate")}
              style={styles.createNow}
            >
              criar agora.
            </Text>
          </Text>
          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            keyboardType={"email-address"}
            marginTop={40}
            label="Login"
            onChangeText={setEmail}
            value={email}
            placeholder="seu@email.com"
            error={invalidEmail}
          />
          {invalidEmail && (
            <Text style={styles.invalidEmail}>Email inválido</Text>
          )}

          <CustomInputWithTextAndIcon
            marginTop={25}
            label="Senha"
            onChangeText={setPassword}
            value={password}
            placeholder="sua senha aqui"
            icons={["eye-outline", "eye-off-outline"]}
            iconSize={22}
            iconColor={COLORS.blueColor}
            obscureText={true}
          />

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor:
                !email || !password ? COLORS.grayColor : COLORS.blueColor,
              borderRadius: 10,
              height: 50,
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              alignSelf: "center",
            }}
            onPress={login}
            // disabled={!email || !password}
          >
            <Text style={styles.signInButton}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.orSignInWith}>Esqueci minha senha</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../../../../assets/images/social-icon-apple.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../../../../assets/images/social-icon-google.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../../../../assets/images/social-icon-facebook.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 100,
    paddingTop: 150,
    paddingHorizontal: PADDINGS.paddingHorizontal,
  },
  newAccount: {
    color: COLORS.grayColor,
  },
  createNow: {
    color: COLORS.blueColor,
    fontWeight: "bold",
  },
  input: {
    marginTop: 120,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.grayColor,
    borderRadius: 7,
  },
  label: {
    color: COLORS.blueColor,
  },
  inputText: {
    color: COLORS.grayColor,
    marginTop: 10,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: COLORS.grayColor,
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
  },
  signInButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  orSignInWith: {
    color: COLORS.grayColor,
    textAlign: "center",
    marginTop: 50,
  },
  socialButtons: {
    display: "flex",
    width: "55%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  invalidEmail: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.dangerColor,
    fontSize: 10,
  },
});
