import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { BackButton } from "../../../components/BackButton";
import CustomInputWithTextAndIcon from "../../../components/Input/CustomInputWithTextAndIcon";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button/Button";
import { axiosApi } from "../../../services/axios";
import { useGlobalStore } from "../../../store";

export const AdvertiverPlaceAddScreen = ({ navigation, route }) => {
  const [name, setName] = useState("");

  const { advertiserId } = route.params;
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const [zip, setZip] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const addressNumberInputRef = useRef(null);
  const nameInputRef = useRef(null);

  const cepMask = "99999-999";

  const saveAdvertiserPlace = async () => {
    if (!buttonEnabled) return;

    useGlobalStore.setState({ isLoading: true });

    try {
      await axiosApi.post(`/advertisers/${advertiserId}/places`, {
        name,
        zip,
        number: addressNumber,
        address,
        neighborhood,
        city,
        state,
      });

      navigation.navigate("AdvertiserDashboardScreen", {
        advertiserId,
      });
    } catch (e) {
      console.log(e.response.data);
    }

    useGlobalStore.setState({ isLoading: false });
  };

  const fetchAddress = async (val: string) => {
    useGlobalStore.setState({ isLoading: true });

    try {
      const search = await axiosApi.get(`/zip/${val}`);

      setAddress(search.data.data.address);
      setNeighborhood(search.data.data.neighborhood);
      setCity(search.data.data.city);
      setState(search.data.data.state);

      addressNumberInputRef.current.focus();
    } catch (e) {
      if (e.response.status === 404) {
        setErrors([...errors, "zipNotFound"]);
      }
    }

    useGlobalStore.setState({ isLoading: false });
  };

  navigation.addListener("focus", () => {
    nameInputRef.current.focus();

    setButtonEnabled(false);
    setErrors([]);
    setName("");
    setZip("");
    setAddressNumber("");
    setAddress("");
    setNeighborhood("");
    setCity("");
    setState("");
  });

  useEffect(() => {
    if (
      name &&
      zip &&
      addressNumber &&
      address &&
      neighborhood &&
      city &&
      state
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [name, zip, addressNumber, address, neighborhood, city, state]);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={style.scrollView}
    >
      <View style={style.container}>
        <View style={{ marginTop: 10 }}>
          {/* navigation.navigate("AdvertiserDashboardScreen", {
                    advertiserId: advertiser.id,
                  }); */}
          <BackButton
            route="AdvertiserDashboardScreen"
            routeParams={{ advertiserId }}
          />
        </View>

        <Text style={style.title}>Novo local</Text>
        <CustomInputWithTextAndIcon
          marginTop={40}
          label="Nome"
          addrRef={nameInputRef}
          onChangeText={setName}
          placeholder="Nome do local"
          value={name}
        />
        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="CEP"
          mask={cepMask}
          onChangeText={(_, value) => {
            if (value.length === 8) {
              fetchAddress(value);
              setZip(value);
            }
          }}
          error={errors.includes("document")}
          erroMessage="CEP inválido"
          value={zip}
          placeholder="00000-000"
        />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="Endereço"
          onChangeText={(_, value) => {
            setAddress(value);
          }}
          value={address}
          placeholder="Endereço"
        />
        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="Bairro"
          onChangeText={(_, value) => {
            setNeighborhood(value);
          }}
          value={neighborhood}
          placeholder="Seu bairro"
        />

        <CustomInputWithTextAndIcon
          autoCapitalize="none"
          marginTop={20}
          label="Cidade"
          onChangeText={(_, value) => {
            setCity(value);
          }}
          value={city}
          placeholder="Sua cidade"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            flexGrow={1}
            label="Estado"
            onChangeText={(_, value) => {
              setState(value);
            }}
            value={state}
            placeholder="Seu estado"
          />
          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Número"
            mask="9999999"
            flexGrow={1}
            onChangeText={(_, value) => {
              setAddressNumber(value);
            }}
            value={addressNumber}
            placeholder="Número"
            addrRef={addressNumberInputRef}
          />
        </View>

        <View style={{ marginVertical: 30 }}>
          <Button
            label="Salvar"
            buttonEnabled={buttonEnabled}
            onPress={saveAdvertiserPlace}
          />
        </View>
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
