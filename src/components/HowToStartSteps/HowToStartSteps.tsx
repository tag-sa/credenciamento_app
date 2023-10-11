import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface HowToStartStepsProps {
  step: number
  text: string
  isReverse?: boolean
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

export const HowToStartSteps = ({ step, text, isReverse, marginTop, marginBottom, marginLeft, marginRight }: HowToStartStepsProps) => {
  return (
    <View
      style={
        isReverse
          ? {
              ...styles.containerReverse,
              marginTop,
              marginBottom,
              marginLeft,
              marginRight
            }
          : {
              ...styles.container,
              marginTop,
              marginBottom,
              marginLeft,
              marginRight
            }
      }
    >
      <View style={isReverse ? styles.stepReverse : styles.step}>
        <Text style={styles.stepText}>{step}</Text>
      </View>
      <Text
        style={{
          ...styles.text,
          marginRight: isReverse ? 25 : 40,
          marginLeft: isReverse ? 40 : 25
        }}
      >
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.lightBlue,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center'
  },
  containerReverse: {
    height: 66,
    width: '100%',
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.lightBlue,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center'
  },
  step: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.5
  },
  stepReverse: {
    backgroundColor: COLORS.orange,
    borderRadius: 50,
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: -3, height: 1 },
    shadowOpacity: 0.5
  },
  stepText: {
    color: COLORS.darkBlue,
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLORS.darkBlue,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 20
  }
})
