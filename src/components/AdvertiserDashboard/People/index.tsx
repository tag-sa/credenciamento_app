import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'
import { axiosApi } from '../../../services/axios'
import { useLoadingStore } from '../../../store/loading.store'
import { AdvertiserInviteUserModalContent } from '../../AdvertiserInviteUserModalContent'
import Button from '../../Button/Button'
import { DialogModal } from '../../DialogModal'
import { DialogModalContent } from '../../DialogModalContent'
import { NotFound } from '../../NotFound'

interface AdverstiserPeopleProps {
  advertiserId: number
  users: any[]
  invites: any[]
  reload: () => void
}

export const AdverstiserPeople = ({ advertiserId, reload, users, invites }: AdverstiserPeopleProps) => {
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [idToDelete, setIdToDelete] = useState()
  const [typeToDelete, setTypeToDelete] = useState<'user' | 'invite'>()
  const [allUsersAndInvites, setAllUsersAndInvites] = useState<any[]>([
    ...users.map((user) => ({ ...user, type: 'user' })),
    ...invites.map((invite) => ({ ...invite, type: 'invite' }))
  ])

  const remove = async () => {
    useLoadingStore.setState({ isLoading: true })

    try {
      await axiosApi.delete(`/advertisers/${idToDelete}/remove-user/${typeToDelete}`)
      reload()
      useLoadingStore.setState({ isLoading: false })
    } catch (e) {
      //TODO: show error message
      useLoadingStore.setState({ isLoading: false })
    }
  }

  return (
    <>
      <View style={styles.content}>
        <DialogModalContent modalVisible={inviteModalVisible} setModalVisible={setInviteModalVisible}>
          <AdvertiserInviteUserModalContent
            reload={() => {
              setInviteModalVisible(false)
              reload()
            }}
            advertiserId={advertiserId}
            setModalVisible={() => setInviteModalVisible(false)}
          />
        </DialogModalContent>

        <DialogModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'Remover pessoa'}
          message={'Tem certeza que deseja remover essa pessoa?'}
          confirmAction={remove}
        />

        {!allUsersAndInvites && (
          <View style={{ marginBottom: 0, paddingHorizontal: PADDINGS.horizontal }}>
            <NotFound text_1="Você ainda não convidou ninguém" text_2="Convide uma pessoa clicando no botão abaixo" />
          </View>
        )}

        {allUsersAndInvites?.map((item, index) => {
          if (item.type === 'invite') {
            return (
              <View
                style={{
                  ...styles.card,
                  marginBottom: 15
                }}
                key={index}
              >
                <View style={{ ...styles.iconContainer, backgroundColor: COLORS.orange }}>
                  <IMAGES.ICONS.IconUser />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={{ ...styles.email, color: COLORS.orange }}>{item.email}</Text>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    {/* <Text style={{ ...styles.function, color: COLORS.orange }}>FUNÇÃO</Text> */}
                    {/* TODO: ADICIONAR FUNÇÃO */}
                  </View>
                </View>
                <View style={styles.TrashContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setIdToDelete(item.id)
                      setTypeToDelete('invite')
                      setModalVisible(true)
                    }}
                  >
                    <IMAGES.ICONS.Trash />
                  </TouchableOpacity>
                </View>
              </View>
            )
          } else {
            return (
              <View
                style={{
                  ...styles.card,
                  marginBottom: 15
                }}
                key={index}
              >
                <View style={styles.iconContainer}>
                  <IMAGES.ICONS.IconUser />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={styles.name}>{item.user.name}</Text>
                  <Text style={styles.email}>{item.user.email}</Text>
                  <View style={{ flexDirection: 'row', gap: 5 }}>
                    {/* <Text style={styles.function}>FUNÇÃO</Text> */}
                    {/* TODO: ADICIONAR FUNÇÃO */}
                  </View>
                </View>
                <View style={styles.TrashContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setIdToDelete(item.id)
                      setTypeToDelete('user')
                      setModalVisible(true)
                    }}
                  >
                    {users.length > 1 && <IMAGES.ICONS.Trash />}
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        })}

        <View style={{ marginBottom: 30 }}>
          <Button buttonEnabled={true} onPress={() => setInviteModalVisible(true)} label={'Nova pessoa'} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PADDINGS.horizontal,
    marginTop: 20
  },
  card: {
    height: 90,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 30
  },
  iconContainer: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 10
  },
  TrashContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 40
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.darkBlue
  },
  email: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.darkBlue,
    marginTop: 5
  },
  city: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.lightBlue,
    marginTop: 5
  },
  function: {
    fontWeight: 'bold',
    fontSize: 10,
    color: COLORS.lightBlue,
    marginTop: 5
  }
})
