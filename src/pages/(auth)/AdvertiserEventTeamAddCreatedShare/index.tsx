import { Alert, Share, Text, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../../../components/BackButton'
import { COLORS } from '../../../constants/Colors'
import { IMAGES } from '../../../constants/Images'
import { PADDINGS } from '../../../constants/Paddings'

export const AdvertiserEventTeamAddCreatedShareScreen = ({ route, navigation }) => {
  const { eventId } = route.params

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        paddingHorizontal: PADDINGS.horizontal
      }}
    >
      <View
        style={{
          marginTop: 50,
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <BackButton Icon={IMAGES.ICONS.BackButtonWhite} />
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 70 }}>
        <IMAGES.ICONS.IconCheckWhite />
        <Text style={{ color: COLORS.white, fontSize: 23, fontWeight: 'bold' }}>Anúncio criado</Text>
        <Text style={{ color: COLORS.lightBlue, fontWeight: '600', marginTop: 6, marginBottom: 10, fontSize: 9 }}>Para gerenciar acesse o menu gestão do anunciante.</Text>
        <Text style={{ color: COLORS.white, fontSize: 14, fontWeight: '600', lineHeight: 20, textAlign: 'justify', paddingHorizontal: 5, marginTop: 15 }}>
          Você poderá compartilhar essa vaga em seus grupos de whatsapp gratuitamente ou realizar disparos para as pessoas no nosso banco de dados,{' '}
          <Text style={{ color: COLORS.mediumBlue, fontWeight: '800' }}>verifique condições.</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 6,
            height: 50,
            marginTop: 45,
            justifyContent: 'center',
            alignItems: 'center',
            width: 265,
            alignSelf: 'center',
            flexDirection: 'row',
            gap: 5,
            paddingHorizontal: 15
          }}
          onPress={async () => {
            try {
              const result = await Share.share({
                message: 'React Native | A framework for building native apps using React'
              })
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error: any) {
              Alert.alert(error.message)
            }
          }}
        >
          <IMAGES.ICONS.Share width={20} height={20} />
          <Text
            style={{
              color: COLORS.darkBlue,
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1.2
            }}
          >
            Compartilhar anúncio
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
