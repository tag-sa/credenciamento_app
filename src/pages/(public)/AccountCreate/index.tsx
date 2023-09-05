import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScrollView, View, Image, StyleSheet } from "react-native";

import Radio from "../../../components/Radio/Radio";
import RegistrationSteps from "../../../components/RegistrationSteps/RegistrationSteps";
import Step1 from "./steps/step-1";
import Step2 from "./steps/step-2";
import Step3 from "./steps/step-3";
import Button from "../../../components/Button/Button";
import { axiosApi } from "../../../services/axios";
import { showMessage } from "react-native-flash-message";
import moment from "moment";
import { auth } from "../../../services/auth";
import { UserType } from "../../../model/user.model";
import { COLORS, PADDINGS } from "../../../constants";

export const AccountCreateScreen = ({ navigation }) => {
  const { top } = useSafeAreaInsets();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    document: "",
    zip: "",
    addressNickname: "",
    addressNumber: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    date: "",
    errors: [],
  });

  const [type, setType] = useState("pf");
  const [step, setStep] = useState(1);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const totalSteps = 3;

  useEffect(() => {
    if (step == 1) {
      if (!data.name || !data.email || !data.password || data.errors.length) {
        setButtonEnabled(false);
      } else {
        setButtonEnabled(true);
      }
    }

    if (step == 2) {
      if (!data.document || !data.date || data.errors.length) {
        setButtonEnabled(false);
      } else {
        setButtonEnabled(true);
      }
    }

    if (step == 3) {
      if (
        !data.zip ||
        !data.addressNumber ||
        !data.address ||
        !data.neighborhood ||
        !data.city ||
        !data.state ||
        data.errors.length
      ) {
        setButtonEnabled(false);
      } else {
        setButtonEnabled(true);
      }
    }
  }, [step, data]);

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
          {step === 1 && (
            <Radio
              setValue={setType}
              initialSelectedValue={type}
              items={[
                { label: "Pessoa Física", value: "pf" },
                { label: "Pessoa Jurídica", value: "pj" },
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
                  document: "",
                  date: "",
                  zip: "",
                  addressNickname: "",
                  addressNumber: "",
                  address: "",
                  neighborhood: "",
                  city: "",
                  state: "",
                  errors,
                });
              }}
            />
          )}

          {step === 2 && (
            <Step2
              type={type}
              retProps={(document, date, errors) =>
                setData({ ...data, document, date, errors })
              }
            />
          )}

          {step === 3 && (
            <Step3
              retProps={(
                zip,
                addressNickname,
                addressNumber,
                address,
                neighborhood,
                city,
                state,
                errors
              ) =>
                setData({
                  ...data,
                  zip,
                  addressNickname,
                  addressNumber,
                  address,
                  neighborhood,
                  city,
                  state,
                  errors,
                })
              }
            />
          )}

          <View style={{ alignItems: "center", marginTop: 30 }}>
            <RegistrationSteps currentStep={step} totalSteps={totalSteps} />
          </View>
          <Button
            label="Continuar"
            buttonEnabled={buttonEnabled}
            onPress={async () => {
              if (step < totalSteps && buttonEnabled) {
                setStep(step + 1);
              }

              if (step == totalSteps && buttonEnabled) {
                try {
                  await axiosApi.post("/users", {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    nickname: data.name,
                    document: data.document,
                    birthdate: moment(data.date, "DDMMYYYY").format(
                      "YYYY-MM-DD"
                    ),
                    address: {
                      address: data.address,
                      complement: data.addressNickname,
                      number: data.addressNumber,
                      zip: data.zip,
                      neighborhood: data.neighborhood,
                      city: data.city,
                      state: data.state,
                    },
                  });

                  const execLogin = await axiosApi.post("/users/login", {
                    email: data.email,
                    password: data.password,
                  });

                  const login = execLogin.data;

                  const user: UserType = {
                    id: login.data.user.id,
                    document: login.data.user.document,
                    type: login.data.user.type,
                    name: login.data.user.name,
                    email: login.data.user.email,
                    access_token: login.data.access_token,
                    nickname: login.data.user.nickname,
                  };

                  await auth().setUser(user);
                  await auth().setToken(login.data.access_token);

                  navigation.replace("Dashboard");
                } catch (error) {
                  //TODO: tratar erros
                  let title = "Erro ao fazer login";
                  let message = "Usuário ou senha inválidos";

                  showMessage({
                    backgroundColor: COLORS.dangerColor,
                    message: title,

                    description: message,
                    type: "danger",
                    icon: "danger",
                  });
                }
              }
            }}
          />
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
    paddingTop: 50,
    paddingHorizontal: PADDINGS.paddingHorizontal,
  },
  signInButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
