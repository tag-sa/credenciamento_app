import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../constants/Colors'
import { CheckBox } from '../CheckBox'

interface DialogModalBottomSheetWithCheckboxProps {
  data: Array<{ id: number; name: string }>
  selectedValues: Array<{ function_id: number }>
  openModal: boolean
  onDismiss: (newValues: Array<{ function_id: number }>) => void
}

export const DialogModalBottomSheetWithCheckbox: React.FC<DialogModalBottomSheetWithCheckboxProps> = ({ openModal, data, selectedValues, onDismiss }) => {
  const [selectedValuesState, setSelectedValuesState] = useState<Array<{ function_id: number }>>([])
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['25%', '50%'], [])

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index < 0) {
        onDismiss(selectedValuesState)
        bottomSheetModalRef.current?.dismiss()
      }
    },
    [selectedValuesState, onDismiss]
  )

  useEffect(() => {
    if (openModal) {
      setSelectedValuesState(selectedValues)
      handlePresentModalPress()
    }
  }, [openModal, handlePresentModalPress])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={(props) => <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} {...props} />}
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
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <FlatList
            style={{ width: '100%', paddingHorizontal: 20 }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedValuesState((prevState) => {
                    const newState = [...prevState]
                    const index = newState.findIndex((selectedValue) => selectedValue.function_id === item.id)

                    if (index > -1) {
                      newState.splice(index, 1)
                    } else {
                      newState.push({ function_id: item.id })
                    }

                    return newState
                  })
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightBlue,
                    paddingVertical: 15,
                    paddingLeft: 5,
                    flexDirection: 'row',
                    gap: 15
                  }}
                  key={index}
                >
                  <CheckBox
                    size={18}
                    backgroundColor={COLORS.darkBlue}
                    checkBorderColor="white"
                    borderColor={COLORS.darkBlue}
                    checked={selectedValuesState.findIndex((selectedValue) => selectedValue.function_id === item.id) > -1}
                    setChecked={(checked: boolean) => {
                      setSelectedValuesState((prevState) => {
                        const newState = [...prevState]
                        const index = newState.findIndex((selectedValue) => selectedValue.function_id === item.id)

                        if (index > -1) {
                          newState.splice(index, 1)
                        } else {
                          newState.push({ function_id: item.id })
                        }

                        return newState
                      })
                    }}
                  />
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
