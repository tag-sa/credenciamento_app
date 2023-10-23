import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, Share, StyleSheet, Text, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'
import { Avatar } from '../../../components/Avatar'
import { BackButton } from '../../../components/BackButton'
import { PersonalDataTab } from '../../../components/ProfileTabs/PersonalData'
import { ProfileTab } from '../../../components/ProfileTabs/Profile'
import { QualificationsTab } from '../../../components/ProfileTabs/Qualifications'
import { TabItem } from '../../../components/TabItem'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { UserCourse } from '../../../model/user-course.model'
import { UserType } from '../../../model/user.model'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import { useUserStore } from '../../../store/user.store'
import { documentFormat } from '../../../utils/document_format'

export const ProfileScreen = ({ navigation }) => {
  const isFocused = useIsFocused()

  const [user, setUser] = useState<UserType>()
  const { getUser } = useUserStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'personalData' | 'qualifications' | 'customization'>('profile')
  const [rating, setRating] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [advertisers, setAdvertisers] = useState<{ id: number; name: string }[]>([])

  const [workerEvents, setWorkerEvents] = useState<any[]>([])

  const [jobs, setJobs] = useState<string[]>([])

  const [courses, setCourses] = useState<
    {
      id: number
      name: string
      hasOpacity: boolean
      icon: string
      courses: UserCourse[]
    }[]
  >([])

  const loadData = async () => {
    useLoadingStore.setState({ isLoading: false })

    const { data } = await axiosApi.get('/users/me')

    setRating(data.data.score)
    setUser(getUser())
    if (data.data.worked_events && data.data.worked_events.length > 5) {
      setShowRating(true)
    }

    setAdvertisers(data.data.related_advertisers)
    setWorkerEvents(data.data.worked_events)
    setCourses(data.data.courses)

    useLoadingStore.setState({ isLoading: false })
  }

  useEffect(() => {
    loadData()
  }, [isFocused])

  return (
    <FlatList
      data={[]}
      style={{ flex: 1, backgroundColor: COLORS.white }}
      ListEmptyComponent={null}
      keyExtractor={() => 'worker_profile'}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListHeaderComponent={() => (
        <>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={styles.container}>
              <View
                style={{
                  marginTop: 20
                }}
              >
                <BackButton Icon={IMAGES.ICONS.BackButtonWhite} />
                <View style={{ paddingTop: 25 }}>
                  <Text style={styles.eventName}>Perfil</Text>
                </View>
              </View>
              <View style={styles.advertiserContainer}>
                <View style={styles.advertiserImageContainer}>
                  <Avatar uri="https://via.placeholder.com/150/24f355" width={120} height={120} borderRadius={50000} borderWidth={8} />
                </View>

                <View style={styles.actions}>
                  <IMAGES.ICONS.Share
                    onPress={async () => {
                      try {
                        const result = await Share.share({
                          message: 'React Native | A framework for building native apps using React'
                        })
                        if (result.action === Share.sharedAction) {
                          if (result.activityType) {
                            // shared with activity type of result.activityType
                          } else {
                            // shared
                          }
                        } else if (result.action === Share.dismissedAction) {
                          // dismissed
                        }
                      } catch (error: any) {
                        Alert.alert(error.message)
                      }
                    }}
                  />
                </View>

                {user?.type === 'pf' && (
                  <View style={styles.workerData}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.functionsName}>{jobs?.join(', ')}</Text>
                    {showRating ? (
                      <View pointerEvents="none" style={{ alignItems: 'center' }}>
                        <Text style={styles.rating}>{rating}/5</Text>
                        <StarRating color={COLORS.orange} style={{ marginTop: 10, marginBottom: 5 }} rating={rating} onChange={() => {}} />
                      </View>
                    ) : (
                      <Text style={styles.unavailableScore}>Score indisponível</Text>
                    )}
                    {!showRating && <Text style={styles.unavailableScoreMessage}>Número de eventos trabalhados insuficiente</Text>}
                  </View>
                )}

                {user?.type === 'pj' && (
                  <View style={{ ...styles.workerData, marginBottom: 30 }}>
                    <Text style={styles.name}>{user?.name}</Text>

                    <Text style={styles.unavailableScoreMessage}>CNPJ {documentFormat(user?.document)}</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.tabs}>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: COLORS.darkBlue
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TabItem
                  label="PERFIL"
                  item="profile"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications' | 'customization') => {
                    setActiveTab(tab)
                  }}
                />

                {/* <TabItem
                  label="PERSONALIZAÇÃO"
                  item="personalData"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications' | 'customization') => {
                    setActiveTab(tab)
                  }}
                /> */}

                <TabItem
                  isLast={user?.type === 'pf' ? false : true}
                  label="MEUS DADOS"
                  item="personalData"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications' | 'customization') => {
                    setActiveTab(tab)
                  }}
                />

                {user?.type === 'pf' && (
                  <TabItem
                    isLast={true}
                    label="QUALIFICAÇÕES"
                    item="qualifications"
                    activeTab={activeTab}
                    setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications' | 'customization') => {
                      setActiveTab(tab)
                    }}
                  />
                )}
              </ScrollView>
            </View>

            {activeTab === 'profile' && <ProfileTab jobs={workerEvents} name={user?.name} advertisers={advertisers} userId={user?.id} about={user?.about} userType={user?.type} />}
            {activeTab === 'personalData' && <PersonalDataTab />}
            {activeTab === 'qualifications' && <QualificationsTab qualifications={courses} />}
          </View>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: PADDINGS.horizontal,
    paddingBottom: 40
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15
  },
  advertiserContainer: {
    padding: 10,
    paddingBottom: 15,
    marginTop: 100,
    width: '90%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.2
  },
  advertiserImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 50000,
    position: 'absolute',
    top: -70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white
  },
  tabs: {
    backgroundColor: COLORS.darkBlue,
    height: 32,
    flexDirection: 'row'
  },
  workerData: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkBlue
  },
  functionsName: {
    fontSize: 12,
    color: COLORS.mediumBlue,
    fontWeight: '700',
    fontStyle: 'italic',
    marginVertical: 7
  },
  unavailableScore: {
    fontSize: 14,
    color: COLORS.darkBlue,
    fontWeight: '700'
  },
  unavailableScoreMessage: {
    fontSize: 11,
    color: COLORS.lightBlue,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 7
  },
  rating: {
    color: COLORS.darkBlue,
    fontWeight: '900'
  }
})
