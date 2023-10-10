import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { useGlobalStore } from '../../store'

interface LoadingProps {
  // children: React.ReactNode;
}

export default function Loading() {
  const isLoading = useGlobalStore((store) => store.isLoading)

  return (
    isLoading && (
      <View style={styles.loading}>
        <Text style={{ color: COLORS.darkBlue }}>Carregando</Text>
        <ActivityIndicator size="large" color={COLORS.darkBlue} style={{ marginTop: 10 }} />
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  loading: {
    position: 'absolute',
    opacity: 0.7,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
