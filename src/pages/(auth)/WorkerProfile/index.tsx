import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Share from 'react-native-share'
import StarRating from 'react-native-star-rating-widget'
import { Avatar } from '../../../components/Avatar'
import { BackButton } from '../../../components/BackButton'
import Button from '../../../components/Button/Button'
import { TabItem } from '../../../components/TabItem'
import { WorkerPersonalDataTab } from '../../../components/WorkerProfileTabs/PersonalData'
import { WorkerProfileTab } from '../../../components/WorkerProfileTabs/Profile'
import { WorkerQualificationsTab } from '../../../components/WorkerProfileTabs/Qualifications'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useGlobalStore } from '../../../store'

export const WorkerProfiledScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused()
  const { userId, fromJobButton, currentInvitationStatus, teamId, eventId, teamUserId } = route.params

  const [activeTab, setActiveTab] = useState<'profile' | 'personalData' | 'qualifications'>('profile')
  const [rating, setRating] = useState(0)
  const [showRating, setShowRating] = useState(false)

  const [showConfirmationButton, setShowConfirmationButton] = useState(false)
  const [confirmationButtonText, setConfirmationButtonText] = useState('Aceitar candidatura')
  const [confirmationButtonColor, setConfirmationButtonColor] = useState(COLORS.greenColor)

  const [workerEvents, setWorkerEvents] = useState<any[]>([])
  const [user, setUser] = useState<{
    name: string
    birthdate: string
    score: number
    email: string
    document: string
  }>()

  const [address, setAddress] = useState<{
    address: string
    number: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }>()

  const [jobs, setJobs] = useState<string[]>([])
  const [courses, setCourses] = useState<any[]>([])

  const loadData = async () => {
    useGlobalStore.setState({ isLoading: false })

    const { data } = await axiosApi.get(`/users/${userId}/worker-profile`)

    setWorkerEvents(data.data.worked_events)
    setUser({
      name: data.data.name,
      birthdate: data.data.birthdate,
      score: data.data.score,
      email: data.data.email,
      document: data.data.document
    })

    setRating(data.data.score)

    setAddress({
      address: data?.data?.addresses[0]?.address,
      number: data?.data?.addresses[0]?.number,
      neighborhood: data?.data?.addresses[0]?.neighborhood,
      city: data?.data?.addresses[0]?.city,
      state: data?.data?.addresses[0]?.state,
      zip: data?.data?.addresses[0]?.zip
    })

    setJobs(data?.data?.UsersFunctions?.map((item) => item.function.name))
    setCourses(data?.data?.UsersCourses)

    if (data.data.worked_events && data.data.worked_events.length > 5) {
      setShowRating(true)
    }

    if (fromJobButton) {
      setShowConfirmationButton(true)
    }

    if (!currentInvitationStatus) {
      setConfirmationButtonText('Convocar')
      setConfirmationButtonColor(COLORS.primaryColor)
    } else {
      if (currentInvitationStatus == 'a') {
        setConfirmationButtonText('Aceitar candidatura')
        setConfirmationButtonColor(COLORS.greenColor)
      } else {
        setShowConfirmationButton(false)
      }
    }

    useGlobalStore.setState({ isLoading: false })
  }

  const execButtonAction = async () => {
    if (!currentInvitationStatus) {
      try {
        useGlobalStore.setState({ isLoading: true })
        await axiosApi.post(`/events/${eventId}/teams/${teamId}/add`, {
          user_id: userId
        })
        useGlobalStore.setState({ isLoading: false })
        navigation.navigate('AdvertiserEventTeamDashboardScreen', {
          teamId: teamId,
          eventId
        })
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data)
      }
    }

    if (currentInvitationStatus === 'a') {
      try {
        useGlobalStore.setState({ isLoading: true })
        await axiosApi.put(`/events/${eventId}/teams/${teamId}/${teamUserId}/confirm`)
        useGlobalStore.setState({ isLoading: false })
        navigation.navigate('AdvertiserEventTeamDashboardScreen', {
          teamId: teamId,
          eventId
        })
      } catch (error) {
        // TODO - tratar erros
        console.log(error.response.data)
      }
    }
  }

  useEffect(() => {
    loadData()
  }, [isFocused])

  return (
    <FlatList
      data={[]}
      style={{ flex: 1, backgroundColor: COLORS.whiteColor }}
      ListEmptyComponent={null}
      keyExtractor={() => 'worker_profile'}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListHeaderComponent={() => (
        <>
          <View style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
            <View style={styles.container}>
              <View
                style={{
                  marginTop: 20
                }}
              >
                <BackButton Icon={IMAGES.ICONS.BackButtonWhite} />
                <View style={{ paddingTop: 25 }}>
                  <Text style={styles.eventName}>Perfil do profissional</Text>
                </View>
              </View>
              <View style={styles.advertiserContainer}>
                <View style={styles.advertiserImageContainer}>
                  <Avatar uri="https://via.placeholder.com/150/24f355" width={120} height={120} borderRadius={50000} borderWidth={8} />
                </View>

                <View style={styles.actions}>
                  <IMAGES.ICONS.Share
                    onPress={() => {
                      Share.open({ message: 'message to share' })
                        .then((res) => {
                          console.log(res, 1111)
                        })
                        .catch((err) => {
                          err && console.log(err, 2222)
                        })
                    }}
                  />
                </View>

                <View style={styles.workerData}>
                  <Text style={styles.name}>{user?.name}</Text>
                  <Text style={styles.functionsName}>{jobs?.join(', ')}</Text>
                  {showRating ? (
                    <View pointerEvents="none" style={{ alignItems: 'center' }}>
                      <Text style={styles.rating}>{rating}/5</Text>
                      <StarRating color={COLORS.orangeColor} style={{ marginTop: 10, marginBottom: 5 }} rating={rating} onChange={() => {}} />
                    </View>
                  ) : (
                    <Text style={styles.unavailableScore}>Score indisponível</Text>
                  )}
                  {!showRating && <Text style={styles.unavailableScoreMessage}>Número de eventos trabalhados insuficiente</Text>}
                </View>
              </View>
            </View>
            <View style={styles.tabs}>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: COLORS.primaryColor
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TabItem
                  label="PERFIL"
                  item="profile"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications') => {
                    setActiveTab(tab)
                  }}
                />

                <TabItem
                  label="DADOS PESSOAIS"
                  item="personalData"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications') => {
                    setActiveTab(tab)
                  }}
                />

                <TabItem
                  isLast={true}
                  label="QUALIFICAÇÕES"
                  item="qualifications"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'profile' | 'personalData' | 'qualifications') => {
                    setActiveTab(tab)
                  }}
                />
              </ScrollView>
            </View>

            {activeTab === 'profile' && <WorkerProfileTab jobs={workerEvents} />}
            {activeTab === 'personalData' && <WorkerPersonalDataTab user={user} address={address} jobs={jobs} />}
            {activeTab === 'qualifications' && <WorkerQualificationsTab courses={courses} />}

            <View style={{ marginBottom: 50 }}>
              {showConfirmationButton && (
                <Button
                  label={confirmationButtonText}
                  width={300}
                  height={50}
                  buttonEnabledColor={confirmationButtonColor}
                  fontSize={14}
                  borderRadius={5}
                  onPress={execButtonAction}
                />
              )}
            </View>
          </View>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
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
    backgroundColor: COLORS.whiteColor,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 5,
    shadowColor: COLORS.blackColor,
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
    color: COLORS.whiteColor
  },
  tabs: {
    backgroundColor: COLORS.primaryColor,
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
    color: COLORS.primaryColor
  },
  functionsName: {
    fontSize: 12,
    color: COLORS.mediumBlueColor,
    fontWeight: '700',
    fontStyle: 'italic',
    marginVertical: 7
  },
  unavailableScore: {
    fontSize: 14,
    color: COLORS.primaryColor,
    fontWeight: '700'
  },
  unavailableScoreMessage: {
    fontSize: 11,
    color: COLORS.secBlueColor,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 7
  },
  rating: {
    color: COLORS.primaryColor,
    fontWeight: '900'
  }
})
