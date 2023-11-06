import { useIsFocused } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AdverstiserAbout } from '../../../components/AdvertiserDashboard/About'
import { AdverstiserPastEvents } from '../../../components/AdvertiserDashboard/PastEvents'
import { AdverstiserPeople } from '../../../components/AdvertiserDashboard/People'
import { AdverstiserPlaces } from '../../../components/AdvertiserDashboard/Places'
import { BackButton } from '../../../components/BackButton'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'

export const AdvertiserDashboardScreen = ({ route, navigation }) => {
  const { advertiserId } = route.params
  const [activeTab, setActiveTab] = useState<'about' | 'pastEvents' | 'places' | 'people'>('about')
  const [users, setUsers] = useState<any[]>([])
  const [invitedUsers, setInvitedUsers] = useState<any[]>([])
  const scrollViewRef = useRef(null)

  const isFocused = useIsFocused()
  const [places, setPlaces] = useState([])
  const [advertiser, setAdvertiser] = useState<{
    id: number
    name: string
    url: string
    about: string
    events: []
    pastEvents: []
  }>()

  const loadAdvertiser = async () => {
    useLoadingStore.setState({ isLoading: true })

    const [adv, pls, users] = await Promise.all([
      axiosApi.get(`/advertisers/${advertiserId}`),
      axiosApi.get(`/advertisers/${advertiserId}/places/`),
      axiosApi.get(`/advertisers/${advertiserId}/people/`)
    ])

    setAdvertiser(adv.data.data)
    setPlaces(pls.data.data)
    setUsers(users.data.data.users)
    setInvitedUsers(users.data.data.invites)

    useLoadingStore.setState({ isLoading: false })
  }

  useEffect(() => {
    loadAdvertiser()
  }, [isFocused])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.container}>
          <View
            style={{
              marginTop: 50,
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <BackButton Icon={IMAGES.ICONS.BackButtonWhite} />
          </View>
          <View style={styles.advertiserContainer}>
            <View style={styles.advertiserImageContainer}>
              <IMAGES.ICONS.BullhornBlue width={45} height={45} />
            </View>
            <View style={styles.actions}>
              <IMAGES.ICONS.Like />
              <IMAGES.ICONS.Share />
            </View>
            <View style={styles.advertiserDetails}>
              <Text style={styles.name}>{advertiser?.name}</Text>
              <Text style={styles.url}>{advertiser?.url}</Text>
            </View>
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
            <TouchableOpacity onPress={() => setActiveTab('about')}>
              <View style={activeTab === 'about' ? styles.tabItemActive : styles.tabItem}>
                <Text style={activeTab === 'about' ? styles.tabItemTextActive : styles.tabItemText}>SOBRE A EMPRESA</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('pastEvents')}>
              <View style={activeTab === 'pastEvents' ? styles.tabItemActive : styles.tabItem}>
                <Text style={activeTab === 'pastEvents' ? styles.tabItemTextActive : styles.tabItemText}>EVENTOS PASSADOS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('places')}>
              <View style={activeTab === 'places' ? styles.tabItemActive : styles.tabItem}>
                <Text style={activeTab === 'places' ? styles.tabItemTextActive : styles.tabItemText}>MEUS LOCAIS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('people')}>
              <View style={activeTab === 'people' ? { ...styles.tabItemActive, marginRight: 50 } : { ...styles.tabItem, marginRight: 50 }}>
                <Text style={activeTab === 'people' ? styles.tabItemTextActive : styles.tabItemText}>PESSOAS</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {activeTab === 'about' && <AdverstiserAbout advertiser={advertiser} reload={loadAdvertiser} />}
        {activeTab === 'pastEvents' && <AdverstiserPastEvents advertiser={advertiser} />}
        {activeTab === 'places' && <AdverstiserPlaces places={places} advertiserId={advertiserId} reload={loadAdvertiser} />}
        {activeTab === 'people' && <AdverstiserPeople users={users} invites={invitedUsers} advertiserId={advertiserId} reload={loadAdvertiser} />}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: PADDINGS.horizontal
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15
  },
  advertiserContainer: {
    padding: 10,
    marginTop: 50,
    width: '90%',
    height: 200,
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
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: COLORS.darkBlue
  },
  advertiserImage: {
    maxHeight: 30
  },
  advertiserDetails: {
    alignSelf: 'center',
    marginTop: 60
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkBlue,
    textAlign: 'center'
  },
  about: {
    color: COLORS.lightBlue,
    lineHeight: 20,
    marginTop: 15
  },
  url: {
    fontSize: 15,
    color: COLORS.lightBlue,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '700'
  },
  tabs: {
    backgroundColor: COLORS.darkBlue,
    height: 32,
    flexDirection: 'row'
  },
  tabItem: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  tabItemActive: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  tabItemText: {
    color: COLORS.lightBlue,
    fontSize: 11,
    fontWeight: 'bold'
  },
  tabItemTextActive: {
    color: COLORS.darkBlue,
    fontSize: 11,
    fontWeight: 'bold'
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 40
  },
  advertisersList: {
    marginTop: 10,
    marginBottom: 20
  }
})
