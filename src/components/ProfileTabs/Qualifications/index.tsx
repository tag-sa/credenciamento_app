import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { UserCourse } from '../../../model/user-course.model'
import { axiosApi } from '../../../services/axios'
import { File } from '../../../utils/file'
import Button from '../../Button/Button'
import { NotFound } from '../../NotFound'

interface QualificationsTabProps {
  qualifications: {
    id: number
    name: string
    icon: string
    hasOpacity: boolean
    courses: UserCourse[]
  }[]
}

export const QualificationsTab = ({ qualifications }: QualificationsTabProps) => {
  const [hasCourses, setHasCourses] = useState(false)
  const navigation = useNavigation<any>()

  const [qualificationData, setQualificationData] = useState<
    {
      id: number
      name: string
      icon: string
      hasOpacity: boolean
      courses: UserCourse[]
    }[]
  >([])

  const handleCourseDelete = async (course: UserCourse, qualificationIndex: number, courseIndex: number) => {
    try {
      await axiosApi.delete(`/users/qualification/${course.id}`)

      setQualificationData((prev) => {
        const newQualificationData = [...prev]
        newQualificationData[qualificationIndex].courses.splice(courseIndex, 1)
        return newQualificationData
      })
    } catch (error) {
      //TODO: handle error
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    setQualificationData(qualifications)

    const hasCourses = qualifications.reduce((acc, qualification) => {
      if (qualification.courses.length) {
        acc = true
      }

      return acc
    }, false)

    setHasCourses(hasCourses)
  }, [])

  const handleDownload = async (url: string) => {
    const file = new File(url)
    await file.download()
  }

  return (
    <View style={styles.content}>
      {!hasCourses && (
        <View style={{ marginBottom: 45 }}>
          <NotFound text_1="Nenhum certificado encontrado" text_2="" />
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={qualificationData}
        keyExtractor={(item, index) => item.name + index.toString()}
        renderItem={({ item, index }) => {
          if (item.courses.length == 0) {
            return <></>
          }

          let IconComponent = null

          if (item.icon) {
            IconComponent = IMAGES.ICONS[item.icon]
          }

          let hasOpacity = item.hasOpacity || false

          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 5,
                  marginTop: index === 0 ? 0 : 20
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.darkBlue,
                    fontWeight: 'bold',
                    marginBottom: 5
                  }}
                >
                  {item.name}
                </Text>
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={item.courses}
                keyExtractor={(course, idx) => course.name + idx.toString()}
                renderItem={({ item, index: idx }) => {
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
                      <View style={{ gap: 3 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                          }}
                        >
                          <Text
                            style={{
                              ...styles.name,
                              color: !hasOpacity ? COLORS.darkBlue : COLORS.lightGray
                            }}
                          >
                            {item.name}
                          </Text>
                          {IconComponent && <IconComponent />}
                        </View>
                        <Text style={{ ...styles.place, color: !hasOpacity ? COLORS.lightBlue : COLORS.lightGray }}>{item.place}</Text>
                        {item.message && (
                          <Text
                            style={{
                              fontSize: 14,
                              color: COLORS.red,
                              fontWeight: 'bold'
                            }}
                          >
                            {item.message}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 15
                        }}
                      >
                        {item.certified && item.certified_url && (
                          <TouchableOpacity onPress={() => handleDownload(item.certified_url)}>
                            <IMAGES.ICONS.Download />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => handleCourseDelete(item, index, idx)}>
                          <IMAGES.ICONS.Trash />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                }}
              />
            </>
          )
        }}
      />

      <View style={{ marginVertical: 30 }}>
        <Button label="Adicionar" onPress={() => navigation.navigate('ProfileAddQualificationScreen')} />
      </View>
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
  },
  place: {
    fontSize: 14,
    color: COLORS.lightBlue,
    fontWeight: 'bold'
  }
})
