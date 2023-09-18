import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { BackButton } from "../../../components/BackButton";
import CustomInputWithTextAndIcon from "../../../components/Input/CustomInputWithTextAndIcon";
import { useState } from "react";
import Button from "../../../components/Button/Button";
import { axiosApi } from "../../../services/axios";

export const AdvertiverAddScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [about, setAbout] = useState("");

  const MAX_LENGTH_ABOUT = 300;

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={style.scrollView}
    >
      <View style={style.container}>
        <View style={{ marginTop: 10 }}>
          <BackButton />
        </View>

        <Text style={style.title}>Novo Anunciante</Text>
        <CustomInputWithTextAndIcon
          marginTop={40}
          label="Nome"
          onChangeText={setName}
          value={name}
        />
        <CustomInputWithTextAndIcon
          marginTop={20}
          label="URL"
          autoCapitalize="none"
          onChangeText={setUrl}
          value={url}
        />
        <CustomInputWithTextAndIcon
          marginTop={20}
          multiline={true}
          numberOfLines={150}
          label="Sobre"
          onChangeText={(val) => {
            if (val.length > MAX_LENGTH_ABOUT) return;

            setAbout(val);
          }}
          value={about}
        />
        <Text style={style.aboutMaxLength}>
          {about.length}/{MAX_LENGTH_ABOUT}
        </Text>

        <Button
          label="Salvar"
          buttonEnabled={name.length > 0}
          onPress={async () => {
            try {
              await axiosApi.post("/advertisers", {
                name,
                url,
                about,
              });

              navigation.replace("Dashboard");
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: COLORS.whiteColor,
    paddingVertical: PADDINGS.vertical,
  },
  container: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.horizontal,
  },
  title: {
    fontSize: 20,
    color: COLORS.primaryColor,
    fontWeight: "700",
    marginTop: 20,
  },
  aboutMaxLength: {
    fontSize: 12,
    color: COLORS.grayColor,
    textAlign: "right",
    marginTop: 5,
  },
});
