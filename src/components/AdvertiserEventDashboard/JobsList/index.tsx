import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import formatDate from '../../../utils/formatDate'
import formatDateTimeRange from '../../../utils/formatDateTimeRange'
import { Avatar } from '../../Avatar'

type JobsListProps = {
  jobs: {
    id?: number
    name: string
    modified: string
  }[]
  onClick?: () => void
  onButtonClick?: () => void
}

export const JobsList = ({ onClick }) => {
  const navigation = useNavigation<any>()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const loadJobs = async () => {
      useLoadingStore.setState({ isLoading: true })
      try {
        const response = await axiosApi.get(`/jobs`)
        if (response.data && response.data.data) {
          const jobsListData = response.data.data
          setJobs(jobsListData)
        } else {
          console.error('Dados inválidos retornados da API')
        }
        useLoadingStore.setState({ isLoading: false })
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
        useLoadingStore.setState({ isLoading: false })
      }
    }

    loadJobs()
  }, [])

  const handleViewClick = (route: any) => {
    navigation.navigate(route)
  }
  return (
    <View style={{ marginTop: 31 }}>
      {jobs.map((item, index) => (
        <View key={index}>
          <TouchableOpacity style={styles.container}>
            <Pressable style={styles.imageContainer} onPress={onClick}>
              <Avatar borderWidth={0} uri="https://via.placeholder.com/150/24f355" />
            </Pressable>
            <View key={index}>
              <Pressable style={styles.textContainer} onPress={onClick}>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    marginRight: -40,
                    marginTop: 20
                  }}
                >
                  <IMAGES.ICONS.Like style={{ marginRight: 20, width: 100, height: 100 }} />
                  <IMAGES.ICONS.Share />
                </View>
                <Text style={styles.name}>{item.team.event.name}</Text>
                <Text style={styles.vacancy}>{item.team.name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <IMAGES.ICONS.Calendar style={{ marginTop: 2 }} />

                    <Text style={styles.details}>{formatDate(item.team.date_start)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                    <IMAGES.ICONS.Clock style={{ marginTop: 2 }} />
                    <Text style={styles.details}>{formatDateTimeRange(item.team.date_start, item.team.date_end)}</Text>
                  </View>
                  <Text style={styles.details}>
                    {item.team.usedQuantity}/{item.team.quantity}
                  </Text>
                  <IMAGES.ICONS.IconMoney2 style={{ marginTop: 2, marginLeft: 20 }} />
                </View>
              </Pressable>
              <View style={styles.iconContainer}></View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    height: 90,
    marginVertical: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  textContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    maxWidth: 230
  },
  name: {
    fontSize: 16,
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    marginTop: 10
  },
  vacancy: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.mediumBlue,
    fontWeight: 'bold'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80
  },
  iconContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 8,
    paddingRight: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  details: {
    fontSize: 10,
    color: COLORS.darkBlue,
    marginLeft: 5,
    fontWeight: 'bold',
    marginRight: 3
  }
})

export default JobsList
