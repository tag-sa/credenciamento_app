import { Modal, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/Colors'

interface DialogModalContentProps {
  children: React.ReactNode
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
}

export const DialogModalContent = ({ modalVisible, setModalVisible, children }: DialogModalContentProps) => {
  const { top } = useSafeAreaInsets()
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.backdrop} />
      <View style={{ marginTop: top }}>{children}</View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.blackColor,
    opacity: 0.6
  }
})
