import moment from 'moment'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { Avatar } from '../../Avatar'
import { NotFound } from '../../NotFound'

interface WorkerProfileTabProps {
  jobs: {
    name: string
    function_name: string
    date_start: string
    date_end: string
  }[]
}

export const WorkerProfileTab = ({ jobs }: WorkerProfileTabProps) => {
  if (!jobs.length) {
    return (
      <View style={{ marginBottom: 45 }}>
        <NotFound text_1="Nenhum trabalho encontrado" />
      </View>
    )
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Eventos trabalhados</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={jobs}
        renderItem={({ item }) => {
          return (
            <View style={{ borderWidth: 1, flexDirection: 'row', paddingVertical: 10, borderColor: COLORS.lightGrayColor, borderRadius: 10, marginBottom: 10 }}>
              <View style={{ width: 80, alignItems: 'center' }}>
                <Avatar uri="https://via.placeholder.com/150/24f355" width={40} height={40} borderRadius={50000} borderWidth={1} borderColor={COLORS.lightGrayColor} />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.function_name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <IMAGES.ICONS.Calendar />
                    <Text style={styles.details}>{moment(item.date_start).format('DD/MM/YYYY')}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <IMAGES.ICONS.Clock />
                    <Text style={styles.details}>
                      {moment(item.date_start).format('HH:mm')} ás {moment(item.date_end).format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
        keyExtractor={(item, index) => item.name + index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    color: COLORS.primaryColor,
    fontWeight: 'bold',
    marginBottom: 20
  },
  name: {
    fontSize: 16,
    color: COLORS.primaryColor,
    fontWeight: 'bold'
  },
  job: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 2,
    color: COLORS.primaryColor,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 10,
    color: COLORS.secBlueColor,
    marginLeft: 5,
    fontWeight: 'bold'
  }
})
