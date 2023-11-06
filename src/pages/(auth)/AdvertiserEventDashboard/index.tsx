import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { showMessage } from 'react-native-flash-message'
import { AdverstiserEventAboutTab } from '../../../components/AdvertiserEventDashboard/About'
import { AdvertiserEventCostsTab } from '../../../components/AdvertiserEventDashboard/Costs'
import { AdverstiserEventsTeamsTab } from '../../../components/AdvertiserEventDashboard/Teams'
import { BackButton } from '../../../components/BackButton'
import { TabItem } from '../../../components/TabItem'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'

export const AdvertiserEventDashboardScreen = ({ route }) => {
  const { eventId, newEvent, isPastEvent } = route.params
  const [activeTab, setActiveTab] = useState<'about' | 'teams' | 'costs'>('teams')

  const [event, setEvent] = useState<{
    name: string
    date_start: string
    date_end: string
    total_by_answers: number
    total_executed: number
    total_preview: number
    place: {
      name: string
      address: string
      city: string
      neighborhood: string
      number: string
      state: string
      zip: string
    }
  }>()

  const [advertiser, setAdvertiser] = useState<{
    id: number
    name: string
    about: string
  }>()

  const [totalTeamsUsersNotConfirmedInPercent, setTotalTeamsUsersNotConfirmedInPercent] = useState('0')
  const [total, setTotal] = useState<number>(0)
  const [teams, setTeams] = useState([])
  const [totalTeamsUsers, setTotalTeamsUsers] = useState<number>(0)
  const [totalTeamsUsersConfirmed, setTotalTeamsUsersConfirmed] = useState(0)
  const [totalCompletedInPercent, setTotalCompletedInPercent] = useState('0')
  const [chartData, setChartData] = useState<any[]>([])

  const isFocused = useIsFocused()

  const loadData = async () => {
    let totalTeamsUsers = 0
    let totalTeamsUsersConfirmed = 0
    let totalTeamsUsersNotConfirmed = 0
    let totalTeamsUsersRefused = 0

    useLoadingStore.setState({ isLoading: true })

    setEvent(undefined)
    setAdvertiser(undefined)
    setTeams([])
    setTotal(0)
    setTotalTeamsUsers(0)
    setTotalTeamsUsersConfirmed(0)
    setTotalCompletedInPercent('0')
    setTotalTeamsUsersNotConfirmedInPercent('0')

    const { data } = await axiosApi.get(`/events/${eventId}`)

    setEvent(data.data)
    setAdvertiser(data.data.advertiser)
    setTeams(data.data.teams)

    if (data.data.teams.length > 0) {
      data.data.teams.map((team) => {
        totalTeamsUsers += team.teamsUsers.length

        team.teamsUsers.map((teamsUser) => {
          if (teamsUser.confirmed == 'c') {
            totalTeamsUsersConfirmed++
          } else if (teamsUser.confirmed == 'd') {
            totalTeamsUsersRefused++
          } else {
            totalTeamsUsersNotConfirmed++
          }
        })
      })

      setTotalTeamsUsers(totalTeamsUsers)
      setTotalTeamsUsersConfirmed(totalTeamsUsersConfirmed)

      setTotalCompletedInPercent(((totalTeamsUsersConfirmed / totalTeamsUsers) * 100).toFixed(0))
      setTotalTeamsUsersNotConfirmedInPercent(((totalTeamsUsersNotConfirmed / totalTeamsUsers) * 100).toFixed(0))
      setChartData([
        {
          name: 'Confirmados',
          val: totalTeamsUsersConfirmed,
          color: COLORS.mediumBlue,
          legendFontColor: COLORS.mediumBlue,
          legendFontSize: 12
        },
        {
          name: 'Não confirmados',
          val: totalTeamsUsersNotConfirmed,
          color: COLORS.lightGray,
          legendFontColor: COLORS.darkGray,
          legendFontSize: 12
        },
        {
          name: 'Recusados',
          val: totalTeamsUsersRefused,
          color: COLORS.red,
          legendFontColor: COLORS.red,
          legendFontSize: 12
        }
      ])
    }

    useLoadingStore.setState({ isLoading: false })
  }

  useEffect(() => {
    if (newEvent && newEvent === true) {
      showMessage({
        backgroundColor: COLORS.green,
        message: 'Evento criado com sucesso!',
        titleStyle: {
          color: COLORS.white,
          fontWeight: 'bold'
        },
        style: {
          justifyContent: 'center',
          alignItems: 'center'
        },
        type: 'success',
        icon: 'none'
      })
    }

    loadData()
  }, [isFocused])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: PADDINGS.horizontal
            }}
          >
            <View
              style={{
                marginTop: 20
              }}
            >
              <BackButton Icon={IMAGES.ICONS.BackButtonWhite} />
              <View style={{ paddingTop: 25 }}>
                <Text style={styles.eventName}>{event?.name}</Text>
                <Text style={styles.advertiserName}>{advertiser?.name}</Text>
              </View>
            </View>
            <View style={styles.advertiserContainer}>
              <View style={styles.advertiserImageContainer}>
                <PieChart
                  data={chartData}
                  width={135}
                  height={135}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
                  }}
                  accessor={'val'}
                  backgroundColor={'transparent'}
                  paddingLeft={'0'}
                  center={[33, 0]}
                  absolute
                  hasLegend={false}
                />
              </View>
              <View style={styles.actions}>
                <IMAGES.ICONS.Like />
                <IMAGES.ICONS.Share />
              </View>
              <View
                style={{
                  justifyContent: 'space-between'
                }}
              >
                <Text style={styles.advertiserContainerTitle}>Convocações</Text>
                <View style={styles.advertiserContainerSummary}>
                  <View>
                    <Text style={styles.summaryNotConfirmed}>{totalTeamsUsersNotConfirmedInPercent}%</Text>
                    <Text style={styles.summaryLabel}>sem resposta</Text>
                  </View>
                  <View>
                    <Text style={styles.summaryConfirmed}>{totalCompletedInPercent}%</Text>
                    <Text style={styles.summaryLabel}>confirmados</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.generalSummaryContainer}>
              <View>
                <Text style={styles.generalSummaryBigNumber}>{teams?.length}</Text>
                <Text style={styles.generalSummaryLabel}>Equipe(s)</Text>
              </View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={styles.generalSummaryBigNumber}>{totalTeamsUsersConfirmed}</Text>
                  <Text
                    style={{
                      ...styles.generalSummaryBigNumber,
                      fontSize: 15,
                      alignSelf: 'flex-end'
                    }}
                  >
                    /{totalTeamsUsers}
                  </Text>
                </View>
                <Text style={styles.generalSummaryLabel}>Vaga(s) Preenchida(s)</Text>
              </View>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              backgroundColor: COLORS.darkBlue
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TabItem
              label="SOBRE"
              item="about"
              activeTab={activeTab}
              setActiveTab={(tab: 'about' | 'teams' | 'costs') => {
                setActiveTab(tab)
              }}
            />
            <TabItem
              label="EQUIPES"
              item="teams"
              activeTab={activeTab}
              setActiveTab={(tab: 'about' | 'teams' | 'costs') => {
                setActiveTab(tab)
              }}
            />
            <TabItem
              isLast={true}
              label="CUSTOS DO EVENTO"
              item="costs"
              activeTab={activeTab}
              setActiveTab={(tab: 'about' | 'teams' | 'costs') => {
                setActiveTab(tab)
              }}
            />
          </ScrollView>
        </View>

        {activeTab === 'about' && (
          <AdverstiserEventAboutTab
            dateStart={event?.date_start}
            dateEnd={event?.date_end}
            placeName={event?.place?.name}
            placeAddress={`${event?.place?.address}, ${event?.place?.number} - ${event?.place?.neighborhood}, ${event?.place?.city} - ${event?.place?.state}`}
          />
        )}
        {activeTab === 'teams' && (
          <AdverstiserEventsTeamsTab
            reload={(status) => {
              if (status) loadData()
            }}
            isPastEvent={isPastEvent}
            teams={teams}
            event={event}
          />
        )}
        {activeTab === 'costs' && (
          <AdvertiserEventCostsTab
            totalTeamsUsers={totalTeamsUsers}
            totalTeamsUsersConfirmed={totalTeamsUsersConfirmed}
            teams={teams}
            totalExecuted={event?.total_executed}
            totalPreview={event?.total_preview}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlue
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15
  },
  advertiserContainer: {
    padding: 10,
    paddingBottom: 15,
    marginTop: 80,
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
  generalSummaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: 15,
    width: '90%',
    borderColor: COLORS.white,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  generalSummaryBigNumber: {
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  generalSummaryLabel: {
    color: COLORS.mediumBlue,
    fontWeight: 'bold',
    fontSize: 10
  },
  advertiserContainerTitle: {
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    marginTop: 50
  },
  advertiserContainerSummary: {
    height: 50,
    paddingHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  summaryLabel: {
    color: COLORS.mediumBlue,
    fontSize: 13,
    fontWeight: 'bold'
  },
  summaryRefused: {
    color: COLORS.red,
    fontWeight: 'bold',
    fontSize: 22
  },
  summaryConfirmed: {
    color: COLORS.mediumBlue,
    fontWeight: 'bold',
    fontSize: 22
  },
  summaryNotConfirmed: {
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.darkGray
  },
  advertiserImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 50000,
    position: 'absolute',
    top: -70,
    backgroundColor: COLORS.darkBlue,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: COLORS.darkBlue
  },
  advertiserImage: {
    maxHeight: 30
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white
  },
  advertiserName: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.white
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 40
  }
})
