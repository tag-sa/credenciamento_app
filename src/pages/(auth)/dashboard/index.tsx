import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { AdvertiserDashboardComponent } from '../../../components/Dashboard/Advertiser'
import { WorkerDashboardComponent } from '../../../components/Dashboard/Worker'
import { COLORS } from '../../../constants/Colors'
import { UserType } from '../../../model/user.model'
import { auth } from '../../../services/auth'

export const DashboardScreen = ({ navigation }) => {
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    async function load() {
      const user = await auth().getUser()

      setUser(user)
    }

    load()
  }, [])

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.whiteColor
      }}
    >
      {user?.type == 'pj' ? <AdvertiserDashboardComponent /> : <WorkerDashboardComponent />}
    </ScrollView>
  )
}
