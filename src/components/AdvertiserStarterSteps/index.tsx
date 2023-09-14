import { View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { HowToStartSteps } from "../HowToStartSteps/HowToStartSteps";
import Button from "../Button/Button";

export const AdvertiserStarterSteps = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.whiteColor,
        paddingTop: 20,
        paddingBottom: 30,
      }}
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
      <Button
        buttonEnabled={true}
        onPress={() => {
          navigation.navigate("AdvertiverAddScreen");
        }}
        label={"Começar"}
      />
    </View>
  );
};
