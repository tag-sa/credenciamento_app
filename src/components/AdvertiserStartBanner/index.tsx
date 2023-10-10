import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'

export const AdvertiserStartBanner = () => {
  const backgroundImage = require('../../../assets/images/background-advertiser-start.png')
  const text = 'Cadastre sua empresa, tenha controle dos acessos, crie eventos, anuncie vagas e tenha na palma da sua mão o progresso de convocação e estimativas do seu evento.'
  const LeftImage = IMAGES.ADVERTISER.ManSeatDesk

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="contain" style={styles.image}>
        <LeftImage />

        <Text style={styles.text}>{text}</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 145,
    width: '100%'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: 145,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30
  },
  text: {
    width: '50%',
    color: COLORS.white,
    fontSize: 8.7,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 10,
    lineHeight: 13
  }
})
