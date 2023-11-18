import { Image, StyleSheet, ImageSourcePropType, Text } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

interface PanelCardProps {
  image: ImageSourcePropType
  value: string | JSX.Element
  title: string
  subtitle: string
}

export const PanelCard = ({ image, subtitle, title, value }: PanelCardProps) => {
  return (
    <LinearGradient colors={[COLORS.PANEL.CARD_TOP, COLORS.PANEL.CARD_BOTTOM]} style={styles.container}>
      <Image source={image} />
      <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.value}>
        {value}
      </Text>
      <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.subtitle}>
        {subtitle}
      </Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    borderRadius: 7
  },

  value: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 15
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.lightBlue,
    marginTop: 5
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.lightBlue
  }
})
