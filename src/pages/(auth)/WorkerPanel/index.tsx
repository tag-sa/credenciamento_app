import { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { TabItem } from '../../../components/TabItem'
import { BackButton } from '../../../components/BackButton'
import { useLoadingStore } from '../../../store/loading.store'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes'
import moment from 'moment'
import { axiosApi } from '../../../services/axios'
import { useIsFocused } from '@react-navigation/native'
import JobsHistory from '../../../components/AdvertiserEventDashboard/JobsHistory'

interface WorkerScreenProps {}

export const WorkerPanelScreen = ({}: WorkerScreenProps) => {
  const isFocused = useIsFocused()
  const [index, setIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'jobsHistory'>('jobsHistory')
  const colorsKeys = Object.keys(COLORS).filter((key) => key !== 'darkBlue')
  const [dataFirstChart, setDataFirstChart] = useState<ChartData>()
  const [dataSecondChart, setDataSecondChart] = useState<any>([])
  const [dataThirdChart, setDataThirdChart] = useState<ChartData>()
  const [userJobs, setUserJobs] = useState<any>([])

  const generateColorsFromColorsKeys = () => {
    const arrColors = []

    colorsKeys.map((colorKey) => {
      if (COLORS[colorKey].toString().startsWith('#')) {
        arrColors.push(() => COLORS[colorKey])
      }
    })

    return arrColors
  }

  const getPieChartColors = () => {
    const arrColors = []

    colorsKeys.map((colorKey) => {
      if (COLORS[colorKey].toString().startsWith('#')) {
        arrColors.push(COLORS[colorKey])
      }
    })

    return arrColors
  }

  const translateMonth = (month: string) => {
    const months = {
      Jan: 'Jan',
      Feb: 'Fev',
      Mar: 'Mar',
      Apr: 'Abr',
      May: 'Mai',
      Jun: 'Jun',
      Jul: 'Jul',
      Aug: 'Ago',
      Sep: 'Set',
      Oct: 'Out',
      Nov: 'Nov',
      Dec: 'Dez'
    }

    return months[month]
  }

  async function load() {
    useLoadingStore.setState({ isLoading: true })
    const { data } = await axiosApi.get(`/panel/worker`)

    const { pastSixMonths, nextSixMonthsPreview, earningsByFunctionsFromPastSixMonths, userJobs } = data

    setUserJobs(userJobs)
    setDataFirstChart({
      labels: pastSixMonths.map((item: any) => translateMonth(moment(item.date).format('MMM'))),
      datasets: [
        {
          data: pastSixMonths.map((item: any) => item.total_earnings),
          colors: generateColorsFromColorsKeys()
        }
      ]
    })

    const dataForSecondChart = []

    earningsByFunctionsFromPastSixMonths.map((item: any) => {
      dataForSecondChart.push({
        name: item.function_name,
        earning: item.total_earnings,
        legendFontColor: COLORS.white,
        legendFontSize: 10
      })
    })

    dataForSecondChart.map((item: any) => {
      const color = getPieChartColors()[Math.floor(Math.random() * getPieChartColors().length)]
      item.color = color
    })

    setDataSecondChart(dataForSecondChart)

    setDataThirdChart({
      labels: nextSixMonthsPreview.map((item: any) => translateMonth(moment(item.date).format('MMM'))),
      datasets: [
        {
          data: nextSixMonthsPreview.map((item: any) => item.total_earnings),
          colors: generateColorsFromColorsKeys()
        }
      ]
    })

    useLoadingStore.setState({ isLoading: false })
  }

  const chartConfig = {
    barPercentage: 0.6,
    backgroundColor: COLORS.darkBlue,
    backgroundGradientFrom: COLORS.darkBlue,
    backgroundGradientTo: COLORS.darkBlue,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForBackgroundLines: {
      strokeWidth: 1,
      strokeDasharray: '0',
      x1: 80,
      stroke: COLORS.white
    },
    propsForLabels: {
      fill: COLORS.white,
      fontWeight: 'bold'
    }
  }

  const firstChartLayout = () => {
    return (
      <View>
        <BarChart
          width={Dimensions.get('window').width - 100 - PADDINGS.horizontal}
          yAxisSuffix=""
          data={dataFirstChart}
          height={220}
          withCustomBarColorFromData={true}
          yAxisLabel="R$"
          flatColor={true}
          fromZero={true}
          showBarTops={false}
          chartConfig={chartConfig}
        />
      </View>
    )
  }

  const secondChartLayout = () => {
    return (
      <View>
        <PieChart
          data={dataSecondChart}
          width={Dimensions.get('window').width - 110 - PADDINGS.horizontal}
          height={160}
          chartConfig={{
            color: () => undefined
          }}
          accessor={'earning'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          yLabelsOffset={100}
        />
      </View>
    )
  }

  const thirdChartLayout = () => {
    return (
      <View>
        <BarChart
          width={Dimensions.get('window').width - 100 - PADDINGS.horizontal}
          yAxisSuffix=""
          data={dataThirdChart}
          height={220}
          withCustomBarColorFromData={true}
          yAxisLabel="R$"
          flatColor={true}
          fromZero={true}
          showBarTops={false}
          chartConfig={chartConfig}
        />
      </View>
    )
  }

  const sliderHeaders = [
    <Text style={styles.sliderHeaderTitle}>Histórico de ganhos {moment().format('YYYY')}</Text>,
    <Text style={styles.sliderHeaderTitle}>Ganhos por função</Text>,
    <View>
      <Text style={styles.sliderHeaderTitle}>Previsão de ganhos</Text>
      <Text style={styles.sliderHeaderSubtitle}>(com base nas suas próximas candidaturas)</Text>
    </View>
  ]

  const contentSlider = [dataFirstChart && firstChartLayout(), dataSecondChart && secondChartLayout(), dataThirdChart && thirdChartLayout()]

  useEffect(() => {
    load()
  }, [isFocused])

  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListHeaderComponent={() => (
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
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20
                }}
              >
                <View
                  style={{
                    marginBottom: 20
                  }}
                >
                  {sliderHeaders[index]}
                </View>
                <View style={styles.arrowsContainer}>
                  <TouchableOpacity onPress={() => setIndex(index - 1)} style={{ ...styles.arrow, zIndex: 999 }} disabled={index === 0}>
                    <Text>‹</Text>
                  </TouchableOpacity>

                  {contentSlider[index]}

                  <TouchableOpacity style={styles.arrow} onPress={() => setIndex(index + 1)} disabled={index === 2}>
                    <Text>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <ScrollView
              contentContainerStyle={{
                marginTop: 40
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TabItem
                label="HISTÓRICO DE GANHOS DETALHADO"
                item="jobsHistory"
                activeTab={activeTab}
                setActiveTab={(tab: 'jobsHistory') => {
                  setActiveTab(tab)
                }}
              />
            </ScrollView>
          </View>

          {activeTab === 'jobsHistory' && (
            <View
              style={{
                paddingHorizontal: PADDINGS.horizontal
              }}
            >
              <JobsHistory jobs={userJobs} />
            </View>
          )}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlue
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 220
  },
  arrow: {
    color: COLORS.darkBlue,
    width: 30,
    height: 30,
    zIndex: 999,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 30,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white
  },
  sliderHeaderSubtitle: {
    fontSize: 12,
    color: COLORS.lightBlue
  }
})
