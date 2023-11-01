import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import { Avatar } from '../../Avatar'
import Button from '../../Button/Button'
import CustomInputWithTextAndIcon from '../../Input/CustomInputWithTextAndIcon'

interface ProfileTabProps {
  userId: number
  name: string
  userType?: 'pf' | 'pj'
  about?: string
  jobs: any[]
  advertisers?: { id: number; name: string }[]
}

export const ProfileTab = ({ about, userType, jobs = [], advertisers = [], userId, name }: ProfileTabProps) => {
  const [editable, setEditable] = useState(false)
  const [aboutText, setAboutText] = useState('')
  const [workerEvents, setWorkerEvents] = useState<any[]>([])

  const [advertisersList, setAdvertisersList] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    setAboutText(about)

    if (advertisers.length) {
      setAdvertisersList(advertisers)
    }

    if (jobs.length) {
      setWorkerEvents(jobs)
    }
  }, [])

  const handleUpdate = async () => {
    if (editable) {
      useLoadingStore.setState({ isLoading: true })
      await axiosApi.put(`/users/${userId}`, { about: aboutText })
      useLoadingStore.setState({ isLoading: false })
      setEditable(false)
    } else {
      setEditable(true)
    }
  }

  return (
    <View style={styles.content}>
      <Text style={{ ...styles.title, marginBottom: 20 }}>{name}</Text>
      {!editable && (
        <View
          style={{ borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 7, minHeight: 150, paddingVertical: PADDINGS.vertical, paddingHorizontal: PADDINGS.horizontal }}
        >
          <Text style={{ color: COLORS.darkGray }}>{aboutText ? aboutText : userType === 'pf' ? 'Sobre mim' : 'Sobre minha empresa'}</Text>
        </View>
      )}
      {editable && <CustomInputWithTextAndIcon multiline={true} numberOfLines={110} onChangeText={setAboutText} value={aboutText} />}

      <View style={{ marginTop: 30 }}>
        <Text style={{ ...styles.title, marginBottom: 5 }}>Anunciantes relacionados</Text>
        {!advertisersList.length && <Text style={{ color: COLORS.red, fontWeight: 'bold' }}>Nenhum anunciante encontrado</Text>}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 }}>
          {advertisersList.map((adv, index) => (
            <Avatar uri="https://via.placeholder.com/150/24f355" key={index} borderWidth={0} />
          ))}
        </View>
      </View>

      {userType === 'pf' && (
        <View style={{ marginTop: 30 }}>
          <Text style={{ ...styles.title, marginBottom: 5 }}>Eventos trabalhados</Text>
          <View
            style={{
              marginTop: 5
            }}
          >
            {!workerEvents.length && <Text style={{ color: COLORS.red, fontWeight: '700' }}>Você ainda não trabalhou em nenhum evento</Text>}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 }}>
              {workerEvents.map((event, index) => (
                <Avatar uri="https://via.placeholder.com/150/24f355" key={index} borderWidth={0} />
              ))}
            </View>
          </View>
        </View>
      )}

      <View style={{ marginTop: 30, marginBottom: 100 }}>
        <Button label={editable ? 'SALVAR' : 'EDITAR'} buttonEnabled={true} onPress={handleUpdate} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 35
  },
  title: {
    fontSize: 18,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  }
})
