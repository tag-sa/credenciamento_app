import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import JobsList from '../../../components/AdvertiserEventDashboard/JobsList'
import { TabItem } from '../../../components/TabItem'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { UserType } from '../../../model/user.model'
import { useUserStore } from '../../../store/user.store'

export const JobsScreen = ({ navigation }) => {
  const { getUser } = useUserStore()
  const [activeTab, setActiveTab] = useState<'available' | 'favorite' | 'applications'>('available')
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    async function load() {
      const user = getUser()

      setUser(user)
    }

    load()
  }, [])

  return (
    <>
      <View style={styles.tabs}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: COLORS.darkBlue
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TabItem
            label="DISPONÍVEIS"
            item="available"
            activeTab={activeTab}
            setActiveTab={(tab: 'available' | 'favorite' | 'applications') => {
              setActiveTab(tab)
            }}
          />
          <TabItem
            label="FAVORITAS"
            item="favorite"
            activeTab={activeTab}
            setActiveTab={(tab: 'available' | 'favorite' | 'applications') => {
              setActiveTab(tab)
            }}
          />
          <TabItem
            isLast={true}
            label="MINHAS CANDIDATURAS"
            item="applications"
            activeTab={activeTab}
            setActiveTab={(tab: 'available' | 'favorite' | 'applications') => {
              setActiveTab(tab)
            }}
          />
        </ScrollView>
      </View>

      <View style={styles.containerJobs}>{activeTab === 'available' && <JobsList onClick={undefined} />}</View>
    </>
  )
}
const styles = StyleSheet.create({
  tabs: {
    backgroundColor: COLORS.darkBlue,
    height: 32,
    flexDirection: 'row'
  },
  body: {
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.horizontal
  },
  containerJobs: {
    backgroundColor: COLORS.white,
    paddingHorizontal: PADDINGS.horizontal,
    height: '100%',
    position: 'relative'
  }
})
