import { useEffect, useState } from 'react'
import { useUserStore } from '../../store/user.store'
import { UserType } from '../../model/user.model'
import { AdvertiserPanelScreen } from '../(auth)/AdvertiserPanel'
import { WorkerPanelScreen } from '../(auth)/WorkerPanel'

interface AdvertiserScreenProps {}

export const PanelScreen = ({}: AdvertiserScreenProps) => {
  const { getUser } = useUserStore()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    setUser(getUser())
  }, [])

  return (
    <>
      {user?.type == 'pj' && <AdvertiserPanelScreen />}
      {user?.type == 'pf' && <WorkerPanelScreen />}
    </>
  )
}
