import { useIsFocused } from '@react-navigation/native'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import * as Progress from 'react-native-progress'
import { NumericFormat } from 'react-number-format'
import { AdvertiserEventTeamTabsConfirmed } from '../../../components/AdvertiserEventTeamTabsConfirmed'
import { BackButton } from '../../../components/BackButton'
import { TabItem } from '../../../components/TabItem'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useGlobalStore } from '../../../store'

export const AdvertiserEventTeamDashboardScreen = ({ navigation, route }) => {
  const { teamId, eventId, isPastEvent } = route.params
  const [activeTab, setActiveTab] = useState<'confirmed' | 'awaiting' | 'available'>('confirmed')

  const [team, setTeam] = useState<any>(null)
  const [teamsUsers, setTeamsUsers] = useState<any>([])

  const [totalTeamsUsersNotConfirmedInPercent, setTotalTeamsUsersNotConfirmedInPercent] = useState('0')
  const [totalRefusedInPercent, setTotalRefusedInPercent] = useState('0')

  const [totalPreview, setTotalPreview] = useState(0)

  const [totalMaleInPercent, setTotalMaleInPercent] = useState(0)
  const [totalFemaleInPercent, setTotalFemaleInPercent] = useState(0)

  const [covocationProgressInPercent, setCovocationProgressInPercent] = useState(0)
  const [totalTeamsUsersConfirmed, setTotalTeamsUsersConfirmed] = useState(0)
  const [totalTeamsUsersRefused, setTotalTeamsUsersRefused] = useState(0)
  const [totalUsersReplied, setTotalUsersReplied] = useState(0)
  const [availableUsers, setAvailableUsers] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])

  const isFocused = useIsFocused()

  const loadData = async () => {
    useGlobalStore.setState({ isLoading: true })

    const [teamData, usersData] = await Promise.all([axiosApi.get(`/events/${eventId}/teams/${teamId}`), axiosApi.get(`/events/${eventId}/teams/${teamId}/available-users`)])

    const { data } = teamData
    const { data: usersD } = usersData

    setAvailableUsers(usersD.data)

    let totalUsersRepliedWithConfirmation = 0
    let totalUsersReplied = 0
    let totalMale = 0
    let totalFemale = 0
    let totalMaleInPercent = 0
    let totalFemaleInPercent = 0
    let totalUsers = data.data.teamsUsers.length
    let totalTeamsUsersConfirmed = data.data.teamsUsers.filter((teamsUser) => teamsUser.confirmed == 'c').length
    let totalTeamsUsersNotConfirmed = data.data.teamsUsers.filter((teamsUser) => teamsUser.confirmed == 'a').length
    let totalTeamsUsersRefused = data.data.teamsUsers.filter((teamsUser) => teamsUser.confirmed == 'd').length
    let convocationProgressInPercent = 0

    if (data.data.teamsUsers.length > 0) {
      data.data.teamsUsers.map((tu) => {
        if (tu.user && tu.user_id != null) {
          totalUsersReplied++

          if (tu.confirmed == 'c') {
            totalUsersRepliedWithConfirmation++
            if (tu.user.gender == 'm') {
              totalMale++
            }

            if (tu.user.gender == 'f') {
              totalFemale++
            }
          }
        }
      })

      if (totalMale > 0 && totalUsersRepliedWithConfirmation > 0) {
        totalMaleInPercent = (totalMale / totalUsersRepliedWithConfirmation) * 100
      }

      if (totalFemale > 0 && totalUsersRepliedWithConfirmation > 0) {
        totalFemaleInPercent = (totalFemale / totalUsersRepliedWithConfirmation) * 100
      }

      if (totalUsersReplied > 0 && totalUsers > 0) {
        convocationProgressInPercent = (totalUsersReplied / totalUsers) * 100
      }
    }

    setTeam(data.data)
    setTeamsUsers(data.data.teamsUsers)
    setTotalPreview(data.data.total_preview)
    setTotalMaleInPercent(totalMaleInPercent)
    setTotalFemaleInPercent(totalFemaleInPercent)

    setTotalTeamsUsersNotConfirmedInPercent(((totalTeamsUsersNotConfirmed / data.data.teamsUsers.length) * 100).toFixed(0))
    setTotalRefusedInPercent(((totalTeamsUsersRefused / data.data.teamsUsers.length) * 100).toFixed(0))

    setCovocationProgressInPercent(convocationProgressInPercent)
    setTotalTeamsUsersConfirmed(totalTeamsUsersConfirmed)
    setTotalTeamsUsersRefused(totalTeamsUsersRefused)
    setTotalUsersReplied(totalUsersReplied)
    setChartData([
      {
        name: 'Confirmados',
        val: totalTeamsUsersConfirmed,
        color: COLORS.mediumBlueColor
      },
      {
        name: 'Recusados',
        val: totalTeamsUsersRefused,
        color: COLORS.redColor
      },
      {
        name: 'Sem resposta',
        val: totalTeamsUsersNotConfirmed,
        color: COLORS.lightGrayColor
      }
    ])

    useGlobalStore.setState({ isLoading: false })
  }

  useEffect(() => {
    loadData()
  }, [isFocused])

  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
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
                  <Text style={styles.eventName}>{team?.name}</Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <IMAGES.ICONS.Calendar />
                      <Text style={styles.details}>{moment(team?.date_start).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                      <IMAGES.ICONS.Clock />
                      <Text style={styles.details}>
                        {moment(team?.date_start).format('HH:mm')} ás {moment(team?.date_end).format('HH:mm')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.advertiserContainer}>
                <View style={styles.advertiserImageContainer}>
                  <PieChart
                    data={chartData}
                    width={130}
                    height={130}
                    chartConfig={{
                      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
                    }}
                    accessor={'val'}
                    backgroundColor={'transparent'}
                    paddingLeft={'0'}
                    center={[28, 0]}
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
                      <Text style={styles.summaryRefused}>{totalRefusedInPercent}%</Text>
                      <Text style={styles.summaryLabel}>não vão</Text>
                    </View>
                    <View>
                      <Text style={styles.summaryConfirmed}>{totalUsersReplied}%</Text>
                      <Text style={styles.summaryLabel}>confirmados</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.generalSummaryContainer}>
                <View
                  style={{
                    alignItems: 'center'
                  }}
                >
                  <Text style={styles.estimatedCostTitleAndValue}>Custo estimado</Text>
                  <NumericFormat
                    value={totalPreview}
                    displayType={'text'}
                    prefix={'R$ '}
                    renderText={(formattedValue) => <Text style={{ ...styles.estimatedCostTitleAndValue, marginTop: 5 }}>{formattedValue}</Text>}
                  />
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                  <Text style={styles.generalSummaryLabel}>Gênero equipe</Text>
                  <View style={{ marginTop: 10 }}>
                    <Progress.Bar
                      progress={totalMaleInPercent / 100}
                      height={10}
                      unfilledColor={totalFemaleInPercent == 0 && totalMaleInPercent == 0 ? COLORS.lightGrayColor : COLORS.pinkColor}
                      borderWidth={0}
                      width={null}
                      color={COLORS.mediumBlueColor}
                    />
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 3 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                        <IMAGES.ICONS.GenderMale />
                        <Text style={{ ...styles.genderText, marginLeft: 3 }}>{totalMaleInPercent.toFixed(0)}%</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                        <Text style={{ ...styles.genderText, marginRight: 3 }}>{totalFemaleInPercent.toFixed(0)}%</Text>
                        <IMAGES.ICONS.GenderFemale />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20, width: '100%' }}>
                  <Text style={styles.generalSummaryLabel}>Andamento convocação</Text>
                  <View style={{ marginVertical: 10 }}>
                    <Progress.Bar
                      progress={covocationProgressInPercent / 100}
                      height={10}
                      unfilledColor={COLORS.lightGrayColor}
                      borderWidth={0}
                      width={null}
                      color={COLORS.primaryColor}
                    />

                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 3 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                        <Text style={styles.genderText}>{covocationProgressInPercent.toFixed(0)}%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.generalSummaryContainerBignumbers}>
                <View>
                  <Text style={styles.generalSummaryBigNumber}>{teamsUsers.length}</Text>
                  <Text style={styles.generalSummaryLabel}>Vagas</Text>
                </View>
                <View>
                  <Text style={styles.generalSummaryBigNumber}>{totalTeamsUsersConfirmed}</Text>
                  <Text style={styles.generalSummaryLabel}>Preenchidas</Text>
                </View>
                <View>
                  <Text style={styles.generalSummaryBigNumber}>{totalTeamsUsersRefused}</Text>
                  <Text style={styles.generalSummaryLabel}>Recusadas</Text>
                </View>
                <View>
                  <Text style={styles.generalSummaryBigNumber}>{totalUsersReplied}</Text>
                  <Text style={styles.generalSummaryLabel}>Convocados</Text>
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
                  label="CONFIRMADOS"
                  item="confirmed"
                  activeTab={activeTab}
                  setActiveTab={(tab: 'confirmed' | 'awaiting' | 'available') => {
                    setActiveTab(tab)
                  }}
                />

                {!isPastEvent && (
                  <>
                    <TabItem
                      label="AGUARDANDO"
                      item="awaiting"
                      activeTab={activeTab}
                      setActiveTab={(tab: 'confirmed' | 'awaiting' | 'available') => {
                        setActiveTab(tab)
                      }}
                    />

                    <TabItem
                      isLast={true}
                      label="CONVOCAR"
                      item="available"
                      activeTab={activeTab}
                      setActiveTab={(tab: 'confirmed' | 'awaiting' | 'available') => {
                        setActiveTab(tab)
                      }}
                    />
                  </>
                )}
              </ScrollView>
            </View>

            {activeTab === 'confirmed' && (
              <AdvertiserEventTeamTabsConfirmed
                users={teamsUsers.filter((tu) => tu.confirmed == 'c' && tu.user)}
                teamConfirmationsStatus="c"
                eventID={eventId}
                isPastEvent={isPastEvent}
                teamId={teamId}
                notFoundText="Não há pessoas confirmadas até o momento"
                callback={(reload) => {
                  if (reload) {
                    loadData()
                  }
                }}
              />
            )}

            {activeTab === 'awaiting' && (
              <AdvertiserEventTeamTabsConfirmed
                users={teamsUsers.filter((tu) => tu.confirmed == 'a' && tu.user)}
                teamConfirmationsStatus="a"
                eventID={eventId}
                teamId={teamId}
                notFoundText="Não há pessoas aguardando confirmação"
                callback={(reload) => {
                  if (reload) {
                    loadData()
                  }
                }}
              />
            )}

            {activeTab === 'available' && (
              <AdvertiserEventTeamTabsConfirmed
                eventID={eventId}
                teamId={teamId}
                users={teamsUsers.length == totalTeamsUsersConfirmed ? [] : availableUsers}
                teamConfirmationsStatus={null}
                notFoundText={teamsUsers.length == totalTeamsUsersConfirmed ? 'Todas as vagas já foram preenchidas' : 'Não há pessoas disponíveis para convocar'}
                callback={(reload) => {
                  if (reload) {
                    loadData()
                  }
                }}
              />
            )}
          </View>
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: PADDINGS.horizontal
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
  generalSummaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    width: '90%',
    backgroundColor: COLORS.whiteColor,
    alignSelf: 'center',
    borderRadius: 5
  },
  generalSummaryContainerBignumbers: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 15,
    width: '90%',
    borderColor: COLORS.whiteColor,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 35,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  generalSummaryBigNumber: {
    color: COLORS.whiteColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  generalSummaryLabel: {
    color: COLORS.mediumBlueColor,
    fontWeight: 'bold',
    fontSize: 10
  },
  estimatedCostTitleAndValue: {
    fontSize: 15,
    color: COLORS.primaryColor,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  advertiserContainerTitle: {
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.primaryColor,
    fontWeight: 'bold',
    marginTop: 50
  },
  advertiserContainerSummary: {
    height: 50,
    paddingHorizontal: 10,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  summaryLabel: {
    color: COLORS.mediumBlueColor,
    fontSize: 13,
    fontWeight: 'bold'
  },
  summaryRefused: {
    color: COLORS.redColor,
    fontWeight: 'bold',
    fontSize: 22
  },
  summaryConfirmed: {
    color: COLORS.mediumBlueColor,
    fontWeight: 'bold',
    fontSize: 22
  },
  summaryNotConfirmed: {
    fontWeight: 'bold',
    fontSize: 22,
    color: COLORS.grayColor
  },
  advertiserImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 5000000,
    position: 'absolute',
    top: -70,
    backgroundColor: COLORS.primaryColor,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 10,
    borderColor: COLORS.primaryColor,
    paddingLeft: 10
  },
  advertiserImage: {
    maxHeight: 30
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.whiteColor
  },
  advertiserName: {
    marginTop: 2,
    fontSize: 12,
    color: COLORS.whiteColor
  },
  tabs: {
    backgroundColor: COLORS.primaryColor,
    height: 32,
    flexDirection: 'row'
  },
  tabItemContent: {
    paddingHorizontal: PADDINGS.horizontal,
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    paddingTop: 40
  },
  details: {
    fontSize: 10,
    color: COLORS.secBlueColor,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  genderText: {
    fontSize: 12,
    color: COLORS.primaryColor,
    fontWeight: 'bold'
  }
})
