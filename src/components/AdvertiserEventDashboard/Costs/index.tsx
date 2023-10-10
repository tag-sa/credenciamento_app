import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { NumericFormat } from 'react-number-format'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'

interface AdvertiserEventCostsProps {
  totalExecuted: number
  totalPreview: number
  totalTeamsUsers: number
  totalTeamsUsersConfirmed: number
  teams: {
    name: string
    total_executed: number
    total_preview: number
    teamsUsers: any[]
  }[]
}

export const AdvertiserEventCostsTab = ({ teams, totalExecuted, totalPreview, totalTeamsUsers, totalTeamsUsersConfirmed }: AdvertiserEventCostsProps) => {
  const navigation = useNavigation<any>()

  return (
    <>
      <View style={styles.content}>
        <Text style={styles.title}>Previsão de Custos Resumida</Text>
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={styles.col}>
              <Text style={styles.headerText}>Equipe</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.headerText}>Previsto</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.headerText}>Realizado</Text>
            </View>
          </View>
          {teams.map((team, index) => (
            <View style={styles.body} key={index}>
              <View style={{ ...styles.col, alignItems: 'flex-start', paddingLeft: 10 }}>
                <View style={styles.colContent}>
                  <Text style={styles.teamName}>{team.name}</Text>
                  <Text style={styles.subTeamTitle}>Convocados</Text>
                </View>
              </View>
              <View style={styles.col}>
                <View style={styles.colContent}>
                  <NumericFormat
                    value={team.total_preview}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'R$ '}
                    renderText={(formattedValue) => <Text style={styles.teamValuePreview}>{formattedValue}</Text>}
                  />
                  <Text style={styles.subTeamPreview}>{team.teamsUsers.length}</Text>
                </View>
              </View>
              <View style={styles.col}>
                <View style={styles.colContent}>
                  <NumericFormat
                    value={team.total_executed}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'R$ '}
                    renderText={(formattedValue) => <Text style={styles.teamValueExecuted}>{formattedValue}</Text>}
                  />
                  <Text style={styles.subTeamExecuted}>{team.teamsUsers.filter((tu: any) => tu.confirmed == 'c').length}</Text>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.footer}>
            <View style={styles.col}>
              <Text style={{ ...styles.teamName, fontSize: 18 }}>Custo Total</Text>
            </View>
            <View style={styles.col}>
              <View style={styles.colContent}>
                <NumericFormat
                  value={totalPreview}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'R$ '}
                  renderText={(formattedValue) => <Text style={{ ...styles.teamValuePreview, fontSize: 18 }}>{formattedValue}</Text>}
                />
                <Text style={styles.subTeamPreview}>{totalTeamsUsers}</Text>
              </View>
            </View>
            <View style={styles.col}>
              <View style={styles.colContent}>
                <NumericFormat
                  value={totalExecuted}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'R$ '}
                  renderText={(formattedValue) => <Text style={{ ...styles.teamValueExecuted, fontSize: 18 }}>{formattedValue}</Text>}
                />
                <Text style={styles.subTeamExecuted}>{totalTeamsUsersConfirmed}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20,
    marginBottom: 50
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10
  },
  table: {
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  headerText: {
    color: COLORS.mediumBlue,
    fontWeight: '700'
  },
  teamName: {
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    fontSize: 12
  },
  subTeamTitle: {
    color: COLORS.mediumBlue,
    fontSize: 10,
    fontWeight: 'bold'
  },
  teamValuePreview: {
    color: COLORS.darkBlue,
    fontWeight: 'bold',
    fontSize: 14
  },
  subTeamPreview: {
    color: COLORS.mediumBlue,
    fontSize: 10,
    fontWeight: 'bold'
  },
  teamValueExecuted: {
    color: COLORS.green,
    fontWeight: 'bold',
    fontSize: 14
  },
  subTeamExecuted: {
    color: COLORS.darkTiffany,
    fontSize: 10,
    fontWeight: 'bold'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: COLORS.lightGray
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  col: {
    width: '33%',
    alignItems: 'center'
  },
  colContent: { flexDirection: 'column', alignItems: 'flex-start' }
})
