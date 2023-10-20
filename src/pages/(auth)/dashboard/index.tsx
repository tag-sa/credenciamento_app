import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
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
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.white
      }}
    >
      {user?.type === 'pj' && <AdvertiserDashboardComponent />}
      {user?.type === 'pf' && <WorkerDashboardComponent />}
    </ScrollView>
  )
}
