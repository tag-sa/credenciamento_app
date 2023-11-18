import { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native'
import { AdvertiserDashboardComponent } from '../../../components/Dashboard/Advertiser'
import { WorkerDashboardComponent } from '../../../components/Dashboard/Worker'
import { COLORS } from '../../../constants/Colors'
import { UserType } from '../../../model/user.model'
import { useUserStore } from '../../../store/user.store'

export const DashboardScreen = () => {
  const { getUser } = useUserStore()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    async function load() {
      const user = getUser()

      setUser(user)
    }

    load()
  }, [])

  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      showsVerticalScrollIndicator={false}
      renderItem={null}
      ListHeaderComponent={() => (
        <>
          {user?.type === 'pj' && <AdvertiserDashboardComponent />}
          {user?.type === 'pf' && <WorkerDashboardComponent />}
        </>
      )}
    />
  )
}
