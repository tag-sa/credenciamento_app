import { View, Text, StyleSheet } from "react-native";
import { AdvertiserStartBanner } from "../../AdvertiserStartBanner";
import { HowToStartSteps } from "../../HowToStartSteps/HowToStartSteps";
import Button from "../../Button/Button";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";

export const AdvertiserDashboardComponent = () => {
  return (
    <>
      <View style={style.body}>
        <Text style={style.hello}>Olá</Text>
        <View style={{ marginVertical: 20 }}>
          <AdvertiserStartBanner />
        </View>
        <Text style={style.howTo}>Como começar?</Text>
      </View>
      <View
        style={{ backgroundColor: "white", paddingTop: 20, paddingBottom: 30 }}
      >
        <HowToStartSteps
          step={1}
          marginLeft={15}
          text="Cadastre sua empresa como uma anunciante, você poderá convidar outros funcionários para o gerenciamento das convocações."
        />
        <HowToStartSteps
          step={2}
          marginTop={20}
          marginRight={-15}
          isReverse={true}
          text="Crie seu evento na plataforma. Você poderá vincular vários eventos ao anunciante."
        />
        <HowToStartSteps
          step={3}
          marginTop={20}
          marginLeft={15}
          text="Adicione equipes aos eventos, você poderá configurar dias e horários de trabalho, número de vagas, supervisão..."
        />
        <HowToStartSteps
          step={4}
          marginTop={20}
          isReverse={true}
          marginRight={-15}
          text="Tenha acesso a uma dashboard completa para acompanhamento das convocações."
        />
        <Button buttonEnabled={true} onPress={() => {}} label={"Começar"} />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  body: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.paddingHorizontal,
  },
  hello: {
    fontSize: 20,
    color: COLORS.primaryColor,
    marginTop: 20,
  },
  howTo: {
    fontSize: 20,
    color: COLORS.primaryColor,
    marginTop: 10,
    fontWeight: "bold",
  },
});
