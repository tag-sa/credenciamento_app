import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'

interface RadioItemProps {
  label: string
  value: string
}

interface RadioProps {
  setValue: (selectedValue: string) => void
  initialSelectedValue?: string
  items: RadioItemProps[]
}

export default function Radio({ items, setValue, initialSelectedValue }: RadioProps) {
  const [selectedValueLocal, setSelectedValueLocal] = useState(initialSelectedValue)

  useEffect(() => {
    setSelectedValueLocal(initialSelectedValue)
  }, [initialSelectedValue])

  return (
    <View style={styles.wrapper}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text
            style={{
              ...styles.title,
              ...getActiveStyle(selectedValueLocal, item.value, 'text')
            }}
          >
            {item.label}
          </Text>
          <TouchableOpacity
            style={{
              ...styles.outter,
              ...getActiveStyle(selectedValueLocal, item.value, 'radio')
            }}
            onPress={() => {
              setValue(item.value)
              setSelectedValueLocal(item.value)
            }}
          >
            {selectedValueLocal == item.value && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const getActiveStyle = (selectedValueLocal: string, value: string, type: 'radio' | 'text') => {
  let style = {}

  if (type == 'radio' && selectedValueLocal == value) {
    style = {
      borderColor: COLORS.darkBlue,
      borderWidth: 5
    }
  }

  if (type == 'text' && selectedValueLocal == value) {
    style = {
      color: COLORS.darkBlue,
      fontWeight: 'bold'
    }
  }

  return style
}

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    marginLeft: 10,
    color: COLORS.darkGray,
    fontWeight: 'bold'
  },
  item: {
    marginHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  inner: {
    width: 7,
    height: 7,
    borderRadius: 6,
    backgroundColor: COLORS.white
  },
  outter: {
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray'
  }
})
