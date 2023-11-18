import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import moment from 'moment'
import { NotFound } from '../../NotFound'
import { NumericFormat } from 'react-number-format'

type JobsHistoryProps = {
  jobs: any[]
}

export const JobsHistory = ({ jobs }: JobsHistoryProps) => {
  const renderItem = ({
    item
  }: {
    item: {
      advertiser: string
      date_end: string
      date_start: string
      function: string
      place: string
      total_earnings: number
    }
  }) => {
    return (
      <View
        style={{
          borderColor: COLORS.lightGray,
          borderRadius: 10,
          marginBottom: 10,
          borderWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 10,
          minHeight: 90,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 40
          }}
        >
          <IMAGES.ICONS.IconTeamsUsers />
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: 'space-between'
          }}
        >
          <View style={{}}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontSize: 17,
                color: COLORS.darkBlue,
                fontWeight: 'bold'
              }}
            >
              {item.advertiser}
            </Text>

            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontSize: 14,
                marginTop: 4,
                color: COLORS.mediumBlue,
                fontWeight: 'bold'
              }}
            >
              {item.function}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, gap: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <IMAGES.ICONS.Calendar />

              <Text style={styles.details}>{moment(item.date_start).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <NumericFormat
                allowLeadingZeros
                value={item.total_earnings}
                displayType={'text'}
                prefix={'R$ '}
                renderText={(formattedValue) => <Text style={styles.details}>{formattedValue}</Text>}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  if (!jobs.length) {
    return (
      <View
        style={{
          marginBottom: 100
        }}
      >
        <NotFound text_1="Você ainda não participou de nenhum evento." text_2="" />
      </View>
    )
  }

  return <FlatList data={jobs} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} style={{ marginTop: 20 }} />
}

const styles = StyleSheet.create({
  details: {
    fontSize: 10,
    color: COLORS.lightBlue,
    marginLeft: 5,
    fontWeight: 'bold',
    marginRight: 3
  }
})

export default JobsHistory
