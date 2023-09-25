import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BackButton } from "../../../components/BackButton";
import Button from "../../../components/Button/Button";
import { DialogModalBottomSheet } from "../../../components/DialogModalBottom";
import CustomInputWithTextAndIcon from "../../../components/Input/CustomInputWithTextAndIcon";
import CustomSelectInput from "../../../components/SelectInput";
import { COLORS } from "../../../constants/Colors";
import { PADDINGS } from "../../../constants/Paddings";
import { axiosApi } from "../../../services/axios";
import { useGlobalStore } from "../../../store";

export const AdvertiverEventTeamAddScreen = ({ navigation, route }) => {
  const { event } = route.params;

  const [name, setName] = useState("");
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");
  const [eventTimeStart, setEventTimeStart] = useState("");
  const [eventTimeEnd, setEventTimeEnd] = useState("");
  const [jobs, setJobs] = useState("");

  const [functions, setFunctions] = useState<{ id: number; name: string }[]>([]);
  const [eventfunction, seteventFunction] = useState<{
    id: number;
    name: string;
  }>();

  const [errors, setErrors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalPresented = () => {
    setIsModalOpen(true);
  };

  const handleModalDismissed = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const dateMask = "99/99/9999";
  const timeMask = "99:99";
  const jobsMask = "9999";

  useEffect(() => {
    setEventDateStart(moment.utc(event.date_start).format("DD/MM/YYYY"));
    setEventTimeStart(moment.utc(event.date_start).format("HH:mm"));

    setEventDateEnd(moment.utc(event.date_end).format("DD/MM/YYYY"));
    setEventTimeEnd(moment.utc(event.date_end).format("HH:mm"));

    const loadFunctions = async () => {
      useGlobalStore.setState({ isLoading: true });

      const { data } = await axiosApi.get(`/functions`);
      setFunctions(data.data);

      useGlobalStore.setState({ isLoading: false });
    };

    loadFunctions();
  }, []);

  const save = async () => {
    const toSave = {
      name,
      date_start: moment(`${eventDateStart} ${eventTimeStart}`, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
      date_end: moment(`${eventDateEnd} ${eventTimeEnd}`, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
      functions_id: eventfunction?.id,
      status: "a",
      quantity: parseInt(jobs),
    };

    try {
      await axiosApi.post(`/events/${event.id}/teams`, toSave);
      navigation.navigate("AdvertiserEventTeamAddCreatedShareScreen", {
        eventId: event.id,
      });
    } catch (e) {
      // TODO: handle error
      console.log(e.response.data);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={style.container}>
          <View style={{ marginTop: 10 }}>
            {/* navigation.navigate("AdvertiserEventDashboardScreen", {
                eventId: event.id,
              }); */}
            <BackButton route="AdvertiserEventDashboardScreen" routeParams={{ eventId: event.id }} />
          </View>

          <Text style={style.title}>Nova equipe</Text>
          <CustomInputWithTextAndIcon marginTop={40} label="Nome" onChangeText={setName} placeholder="Nome da equipe" value={name} />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Data Inicial"
            keyboardType={"numeric"}
            mask={dateMask}
            onChangeText={(_, value) => {
              if (!moment(value, "DD/MM/YYYY").isValid()) {
                if (!errors.includes("dateStart")) setErrors([...errors, "dateStart"]);
              } else {
                if (moment(value, "DD/MM/YYYY").isBefore(moment())) {
                  if (!errors.includes("dateStart")) setErrors([...errors, "dateStart"]);
                } else {
                  setErrors(errors.filter((error) => error !== "dateStart"));
                }
              }

              setEventDateStart(value);
            }}
            error={errors.includes("dateStart")}
            erroMessage="Data inicial inválida"
            value={eventDateStart}
            placeholder="dd/mm/aaaa"
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Horário Inicial"
            placeholder="00:00"
            erroMessage="Horário Inicial inválido"
            error={errors.includes("timeStart")}
            keyboardType={"numeric"}
            mask={timeMask}
            onChangeText={(_, value) => {
              if (!moment(value, "HH:mm").isValid()) {
                if (!errors.includes("timeStart")) setErrors([...errors, "timeStart"]);
              } else {
                setErrors(errors.filter((error) => error !== "timeStart"));
              }

              setEventTimeStart(value);
            }}
            value={eventTimeStart}
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Data Final"
            keyboardType={"numeric"}
            mask={dateMask}
            onChangeText={(_, value) => {
              if (!moment(value, "DD/MM/YYYY").isValid()) {
                if (!errors.includes("dateEnd")) setErrors([...errors, "dateEnd"]);
              } else {
                if (moment(value, "DD/MM/YYYY").isBefore(moment(eventDateStart, "DD/MM/YYYY"))) {
                  if (!errors.includes("dateEnd")) setErrors([...errors, "dateEnd"]);
                } else {
                  setErrors(errors.filter((error) => error !== "dateEnd"));
                }
              }

              setEventDateEnd(value);
            }}
            error={errors.includes("dateEnd")}
            erroMessage="Data final inválida"
            value={eventDateEnd}
            placeholder="dd/mm/aaaa"
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Horário Final"
            placeholder="00:00"
            erroMessage="Horário Final inválido"
            error={errors.includes("time")}
            keyboardType={"numeric"}
            mask={timeMask}
            onChangeText={(_, value) => {
              if (!moment(value, "HH:mm").isValid()) {
                if (!errors.includes("timeEnd")) setErrors([...errors, "timeEnd"]);
              } else {
                setErrors(errors.filter((error) => error !== "timeEnd"));
              }

              setEventTimeEnd(value);
            }}
            value={eventTimeEnd}
          />

          <CustomSelectInput
            placeholder="Selecione uma função"
            label={"Função"}
            error={errors.includes("place")}
            marginTop={20}
            value={eventfunction?.name}
            onInputPress={handleOpenModal}
          />

          <CustomInputWithTextAndIcon
            autoCapitalize="none"
            marginTop={20}
            label="Número de vagas"
            placeholder="10"
            mask={jobsMask}
            keyboardType={"numeric"}
            onChangeText={(_, value) => {
              if (value === "" || parseInt(value) <= 0) {
                if (!errors.includes("jobs")) setErrors([...errors, "jobs"]);
              } else {
                setErrors(errors.filter((error) => error !== "jobs"));
              }

              setJobs(value);
            }}
            value={jobs}
          />

          <View style={{ marginVertical: 30 }}>
            <Button
              label="Salvar"
              buttonEnabled={
                name !== "" &&
                eventDateStart !== "" &&
                eventTimeStart !== "" &&
                eventDateEnd !== "" &&
                eventTimeEnd !== "" &&
                eventfunction !== undefined &&
                jobs !== "" &&
                errors.length === 0
              }
              onPress={save}
            />
          </View>
        </View>
      </ScrollView>
      <DialogModalBottomSheet
        data={functions}
        openModal={isModalOpen}
        onModalPresented={handleModalPresented}
        onModalDismissed={handleModalDismissed}
        onSelectItem={seteventFunction}
      />
    </>
  );
};

const style = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: COLORS.whiteColor,
    paddingVertical: PADDINGS.vertical,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.horizontal,
  },
  title: {
    fontSize: 20,
    color: COLORS.primaryColor,
    fontWeight: "700",
    marginTop: 20,
  },
});
