import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DialogModalProps {
  data: Array<{ id: number; name: string }>;
  openModal: boolean;
  onModalPresented?: () => void;
  onModalDismissed?: () => void;
  onSheetChange?: (index: number) => void;
  onSelectItem: (item: any) => void;
}

export const DialogModalBottomSheet: React.FC<DialogModalProps> = ({
  openModal,
  onModalPresented,
  onModalDismissed,
  onSheetChange,
  data,
  onSelectItem,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["45%", "50%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      onSheetChange && onSheetChange(index);

      if (index < 1) {
        bottomSheetModalRef.current?.dismiss();
        onModalDismissed();
      }
    },
    [onSheetChange]
  );

  useEffect(() => {
    if (openModal) {
      bottomSheetModalRef.current?.present();
      onModalPresented && onModalPresented();
    } else {
      bottomSheetModalRef.current?.dismiss();
      onModalDismissed();
    }
  }, [openModal]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        handleStyle={{ backgroundColor: COLORS.grayColor }}
        handleComponent={() => (
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 5,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: 35,
                height: 3,
                backgroundColor: COLORS.mediumBlueColor,
                borderRadius: 10,
              }}
            />
          </View>
        )}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.modalStyle}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            {...props}
            onPress={() => {
              onModalDismissed();
            }}
          />
        )}
      >
        <View style={styles.contentContainer}>
          <FlatList
            style={{ width: "100%", paddingHorizontal: 20 }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  // useGlobalStore.setState({ hideBottomTabBar: false });
                  onSelectItem(item);
                  onModalDismissed();
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightBlueColor,
                    paddingVertical: 15,
                    paddingLeft: 20,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      color: COLORS.mediumBlueColor,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.grayColor,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
