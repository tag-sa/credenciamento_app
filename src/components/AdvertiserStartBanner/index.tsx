import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  StyleProp,
} from "react-native";

export const AdvertiserStartBanner = () => {
  const backgroundImage = require("../../../assets/images/background-advertiser-start.png");
  const text =
    "Cadastre sua empresa, tenha controle dos acessos, crie eventos, anuncie vagas e tenha na palma da sua mão o progresso de convocação e estimativas do seu evento.";
  const leftImage = require("../../../assets/images/icons/man-seat-desk.png");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="contain"
        style={styles.image}
      >
        <Image source={leftImage} style={styles.icon} />

        <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 145,
    width: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 145,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
  },
  icon: {
    // width: 50,
    // height: 50,
    // marginRight: 20,
  },
  text: {
    width: "50%",
    color: "white",
    fontSize: 8.7,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 10,
    lineHeight: 13,
  },
});
