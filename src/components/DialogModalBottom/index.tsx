import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface DialogModalProps {
  data: Array<{ id: number | string; name: string }>
  openModal: boolean
  onModalPresented?: () => void
  onModalDismissed?: () => void
  onSheetChange?: (index: number) => void
  onSelectItem: (item: any) => void
}

export const DialogModalBottomSheet: React.FC<DialogModalProps> = ({ openModal, onModalPresented, onModalDismissed, onSheetChange, data, onSelectItem }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['45%', '50%'], [])

  const handleSheetChanges = useCallback(
    (index: number) => {
      onSheetChange && onSheetChange(index)

      if (index < 1) {
        bottomSheetModalRef.current?.dismiss()
        onModalDismissed()
      }
    },
    [onSheetChange]
  )

  useEffect(() => {
    if (openModal) {
      bottomSheetModalRef.current?.present()
      onModalPresented && onModalPresented()
    } else {
      bottomSheetModalRef.current?.dismiss()
      onModalDismissed()
    }
  }, [openModal])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        handleStyle={{ backgroundColor: COLORS.darkGray }}
        handleComponent={() => (
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 5
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                width: 35,
                height: 3,
                backgroundColor: COLORS.mediumBlue,
                borderRadius: 10
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
              onModalDismissed()
            }}
          />
        )}
      >
        <View style={styles.contentContainer}>
          <FlatList
            style={{ width: '100%', paddingHorizontal: 20 }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelectItem(item)
                  onModalDismissed()
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightBlue,
                    paddingVertical: 15,
                    paddingLeft: 20
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      color: COLORS.mediumBlue,
                      fontWeight: 'bold'
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
  )
}

const styles = StyleSheet.create({
  modalStyle: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    borderRadius: 20
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 9999
  }
})
