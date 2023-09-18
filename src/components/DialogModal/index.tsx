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
import { SvgProps } from "react-native-svg";
import { FC } from "react";

interface DialogModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  closeIcon?: FC<SvgProps>;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  confirmAction: (_) => void;
}

export const DialogModal = ({
  modalVisible,
  setModalVisible,
  title,
  cancelText = "Não",
  confirmText = "Sim",
  message,
  confirmAction,
  closeIcon = IMAGES.ICONS.Close,
}: DialogModalProps) => {
  const CloseIcon = closeIcon;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.backdrop} />
      <View style={styles.modal}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <CloseIcon onPress={() => setModalVisible(false)} />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.cardFooter}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.canceText}>{cancelText}</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setModalVisible(false);
                confirmAction(true);
              }}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </Pressable>
          </View>
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
  modal: {
    flex: 1,
    marginTop: 220,
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: 7,
    height: 200,
    width: 350,
    paddingTop: PADDINGS.vertical,
  },
  cardHeader: {
    alignSelf: "flex-end",
    paddingRight: PADDINGS.horizontal,
  },
  cardBody: {
    paddingHorizontal: PADDINGS.horizontal,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryColor,
  },
  message: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
    color: COLORS.secBlueColor,
    marginTop: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGrayColor,
    marginTop: 20,
  },
  cancelButton: {
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGrayColor,
    flexGrow: 1,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  confirmButton: {
    flexGrow: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  canceText: {
    color: COLORS.primaryColor,
    fontWeight: "bold",
  },
  confirmText: {
    color: COLORS.redColor,
    fontWeight: "bold",
  },
});
