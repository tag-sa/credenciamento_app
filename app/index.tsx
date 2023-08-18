import { useState } from "react";
import { axiosApi } from "./services/axios";
import { showMessage } from "react-native-flash-message";
import { COLORS } from "../constants";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomInputWithTextAndIcon from "./components/Input/CustomInputWithTextAndIcon";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const login = async () => {
    // router.push("/dashboard");
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    setInvalidEmail(false);
    if (!reg.test(email)) {
      setInvalidEmail(true);
      return false;
    }

    try {
      const data = await axiosApi.post("/users/login", {
        email,
        password,
      });

      console.log(data.data);
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
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={{ ...styles.container, paddingTop: top }}>
        <View style={styles.header}>
          <Image source={require("assets/images/logo.png")} />
        </View>

        <View style={styles.body}>
          <Text style={styles.newAccount}>
            Não possuo uma conta,{" "}
            <Text style={styles.createNow}>criar agora.</Text>
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
              <Image source={require("assets/images/social-icon-apple.png")} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={require("assets/images/social-icon-google.png")} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("assets/images/social-icon-facebook.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
    paddingHorizontal: 25,
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
    // height: 50,
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
    // paddingTop: 5,
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
