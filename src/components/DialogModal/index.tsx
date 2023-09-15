import {
  Modal,
  Text,
  StyleSheet,
  Pressable,
  View,
  ImageSourcePropType,
} from "react-native";
import { COLORS } from "../../constants/Colors";
import { PADDINGS } from "../../constants/Paddings";
import { IMAGES } from "../../constants/Images";

interface DialogModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  closeIcon: ImageSourcePropType;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export const DialogModal = ({
  modalVisible,
  setModalVisible,
}: DialogModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => setModalVisible(false)}
      />
      <View style={styles.content}>
        <View style={styles.card}>
          <IMAGES.ICONS.CLOSE.uri />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.blackColor,
    opacity: 0.6,
  },
  content: {
    flex: 1,
    marginTop: 220,
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 7,
    height: 200,
    width: 350,
    paddingHorizontal: PADDINGS.horizontal,
    paddingVertical: PADDINGS.vertical,
  },
});
