import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { PADDINGS } from '../../../constants/Paddings'

interface WorkerPersonalDataTabProps {
  user: {
    name: string
    email: string
    document: string
    birthdate: string
    score: number
  }
  address: {
    address: string
    number: string
    neighborhood: string
    city: string
    state: string
    zip: string
  }
  jobs: string[]
}

export const WorkerPersonalDataTab = ({ address, user, jobs }: WorkerPersonalDataTabProps) => {
  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.title}>Nome</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>
      <View>
        <Text style={styles.title}>E-mail</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.title}>CEP</Text>
          <Text style={styles.value}>{address?.zip}</Text>
        </View>
        <View>
          <Text style={styles.title}>Bairro</Text>
          <Text style={styles.value}>{address?.neighborhood}</Text>
        </View>
        <View>
          <Text style={styles.title}>Cidade</Text>
          <Text style={styles.value}>{address?.city}</Text>
        </View>
        <View>
          <Text style={styles.title}>Estado</Text>
          <Text style={styles.value}>{address?.state}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <View>
          <Text style={styles.title}>Endereço</Text>
          <Text style={styles.value}>{address?.address}</Text>
        </View>
        <View>
          <Text style={styles.title}>Número</Text>
          <Text style={styles.value}>{address?.number}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 40 }}>
        <View>
          <Text style={styles.title}>Data de nascimento</Text>
          <Text style={styles.value}>{moment(user?.birthdate).format('DD/MM/YYYY')}</Text>
        </View>
        <View>
          <Text style={styles.title}>CPF</Text>
          <Text style={styles.value}>{user?.document}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Funções pretendidas</Text>
        <Text style={styles.value}>{jobs?.join(', ')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    color: COLORS.darkGray
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.darkBlue
  }
})
