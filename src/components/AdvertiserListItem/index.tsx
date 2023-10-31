import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { IMAGES } from '../../constants/Images'

type AdvertiserListItemProps = {
  name: string
  url: string
  onClick: () => void
  onDelete: () => void
}

export const AdvertiserListItem = ({ name, url, onClick, onDelete }: AdvertiserListItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick} style={styles.containerClick}>
        <View style={styles.imageContainer}>
          <IMAGES.ICONS.BullhornWhite width={35} height={35} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.url}>{url}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.iconContainer}>
          <IMAGES.ICONS.Trash />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    height: 90,
    marginVertical: 8,
    flexDirection: 'row'
  },
  containerClick: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  name: {
    fontSize: 16,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  url: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.lightBlue
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70
  },
  iconContainer: {
    padding: 10,
    alignItems: 'flex-end',
    width: 70
  }
})
