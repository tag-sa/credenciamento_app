import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import moment from 'moment'

type JobsListProps = {
  jobs: {
    quantity: number
    occupied: number
    id: number
    user_id: number
    teams_id: number
    function_id: number
    date_start: string
    date_end: string
    confirmed: number
    created: string
    modified: string
    teams_users_status_id: number
    event_id: number
    team_name: string
    team_date_start: string
    team_date_end: string
    team_quantity: number
    event_name: string
  }[]
}

export const JobsList = ({ jobs }: JobsListProps) => {
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Pressable style={styles.imageContainer}>
        <IMAGES.ICONS.IconTeamsUsers />
      </Pressable>

      <View
        style={{
          flexGrow: 1
        }}
      >
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Pressable style={styles.textContainer}>
            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.name}>
              {item.event_name}
            </Text>

            <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.team}>
              {item.team_name}
            </Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <IMAGES.ICONS.Like style={{ marginRight: 10, width: 100, height: 100 }} />
            <IMAGES.ICONS.Share />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <IMAGES.ICONS.Calendar />

            <Text style={styles.details}>{moment(item.date_start).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IMAGES.ICONS.Clock />
            <Text style={styles.details}>
              {moment(item.date_start).format('HH:mm')} às {moment(item.date_end).format('HH:mm')}
            </Text>
          </View>
          <Text style={styles.details}>
            {item.occupied}/{item.quantity}
          </Text>
          <IMAGES.ICONS.IconMoney2 />
        </View>
      </View>
    </View>
  )

  return <FlatList data={jobs} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} style={{ marginTop: 20 }} />
}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 90,
    alignItems: 'center'
  },
  textContainer: {
    paddingHorizontal: 10,
    maxWidth: 220
  },
  name: {
    fontSize: 17,
    color: COLORS.darkBlue,
    fontWeight: 'bold'
  },
  team: {
    fontSize: 14,
    marginTop: 4,
    color: COLORS.mediumBlue,
    fontWeight: 'bold'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40
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
