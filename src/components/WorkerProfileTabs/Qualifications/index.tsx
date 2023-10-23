import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { File } from '../../../utils/file'
import { NotFound } from '../../NotFound'

interface WorkerQualificationsTabProps {
  courses: any[]
}

export const WorkerQualificationsTab = ({ courses }: WorkerQualificationsTabProps) => {
  if (!courses.length) {
    return (
      <View style={{ marginBottom: 45 }}>
        <NotFound text_1="Nenhum certificado encontrado" />
      </View>
    )
  }

  const handleDownload = async (url: string) => {
    const file = new File(url)
    await file.download()
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Certificados aprovados</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={courses}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderColor: COLORS.lightGray,
                borderRadius: 10,
                marginBottom: 10,
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text style={styles.name}>{item.course.name}</Text>
              {item.certified && item.certified_url && (
                <TouchableOpacity onPress={() => handleDownload(item.certified_url)}>
                  <IMAGES.ICONS.Download />
                </TouchableOpacity>
              )}
            </View>
          )
        }}
        keyExtractor={(item, index) => item.name + index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    marginBottom: 20
  },
  name: {
    fontSize: 16,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  }
})
