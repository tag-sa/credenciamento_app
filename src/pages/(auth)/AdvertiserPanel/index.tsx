import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { UserType } from '../../../model/user.model'
import { useUserStore } from '../../../store/user.store'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PanelCard } from '../../../components/Panel/Card'
import { PADDINGS } from '../../../constants/Paddings'
import { TabItem } from '../../../components/TabItem'
import { BackButton } from '../../../components/BackButton'
import Button from '../../../components/Button/Button'
import { axiosApi } from '../../../services/axios'
import { AdvertiserEventPanel } from '../../../components/AdvertiserEventPanel'
import { NumericFormat } from 'react-number-format'
import { useLoadingStore } from '../../../store/loading.store'

interface AdvertiserScreenProps {}

export const AdvertiserPanelScreen = ({}: AdvertiserScreenProps) => {
  const [activeTab, setActiveTab] = useState<'nextEvents'>('nextEvents')
  const [usersThatHasAdvertisersAsFavorite, setUsersThatHasAdvertisersAsFavorite] = useState(0)
  const [futureEventsCostsPreview, setFutureEventsCostsPreview] = useState(0)
  const [totalUsersInEvents, setTotalUsersInEvents] = useState(0)
  const [totalEventsInCurrentYear, setTotalEventsInCurrentYear] = useState(0)
  const [futureEvents, setFutureEvents] = useState<
    {
      id: number
      name: string
      dateStart: string
      dateEnd: string
      advertiser: {
        name: string
      }
    }[]
  >([])

  async function load() {
    useLoadingStore.setState({ isLoading: true })
    const { data } = await axiosApi.get(`/panel`)

    setFutureEvents(data.futureEvents)
    setFutureEventsCostsPreview(data.futureEventsCostsPreview)
    setTotalUsersInEvents(data.totalUsersInEvents)
    setTotalEventsInCurrentYear(data.totalEventsInCurrentYear)
    setUsersThatHasAdvertisersAsFavorite(data.usersThatHasAdvertisersAsFavorite)

    useLoadingStore.setState({ isLoading: false })
  }

  useEffect(() => {
    load()
  }, [])

  return (
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.eventName}>Meu Painel</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{
              gap: 10,
              marginTop: 40
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <PanelCard
              image={IMAGES.PANEL.PanelMoney}
              value={
                <NumericFormat
                  value={futureEventsCostsPreview}
                  displayType={'text'}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={'R$ '}
                  renderText={(formattedValue) => <Text>{formattedValue}</Text>}
                />
              }
              title={'Previsão de Custos'}
              subtitle={'Eventos futuros'}
            />
            <PanelCard image={IMAGES.PANEL.PanelUsers} value={totalUsersInEvents.toString()} title={'Pessoas Convocadas'} subtitle={'Em eventos realizados'} />
            <PanelCard image={IMAGES.PANEL.PanelSubscribers} value={usersThatHasAdvertisersAsFavorite.toString()} title={'Pessoas inscritas'} subtitle={'Nos seus anunciantes'} />
            <PanelCard image={IMAGES.PANEL.PanelEventsDone} value={totalEventsInCurrentYear.toString()} title={'Eventos Realizados'} subtitle={'Este ano'} />
            <PanelCard image={IMAGES.PANEL.PanelEventsFuture} value={futureEvents.length.toString()} title={'Eventos Futuros'} subtitle={'Ativos'} />
          </ScrollView>
        </View>

        <ScrollView
          contentContainerStyle={{
            marginTop: 40
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TabItem
            label="Próximos eventos"
            item="nextEvents"
            activeTab={activeTab}
            setActiveTab={(tab: 'nextEvents') => {
              setActiveTab(tab)
            }}
          />
        </ScrollView>
      </View>

      {activeTab === 'nextEvents' && (
        <View style={styles.tabItemContent}>
          <View style={styles.advertisersList}>
            {futureEvents?.length === 0 && <Text style={{ color: COLORS.red, fontWeight: 'bold' }}>Nenhum evento encontrado</Text>}

            {futureEvents?.map((event, index) => (
              <AdvertiserEventPanel key={index} event={event} onClick={() => {}} />
            ))}
          </View>
        </View>
      )}
    </View>
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
    paddingTop: 10
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
  advertisersList: {
    marginTop: 10,
    marginBottom: 20
  }
})
