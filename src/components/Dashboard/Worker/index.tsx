import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/Colors";
import { IMAGES } from "../../../constants/Images";
import { PADDINGS } from "../../../constants/Paddings";

import { NotFound } from "../../NotFound";
import { WorkerDashboardBannersComponent } from "../../WorkerDashboardBanners";
import EventCategoryList from "../../AdvertiserEventDashboard/Carroussel";
import JobsList from "../../AdvertiserEventDashboard/JobsList";

export const WorkerDashboardComponent = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);

  return (
    <>
      <View style={style.body}>
        <Text style={style.hello}>Olá</Text>
        <View style={{ marginVertical: 20, flexDirection: "row" }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <WorkerDashboardBannersComponent
              text="Aqui link para um blog com dicas de carreira, cursos gratuitos, cursos com valor simbólico, dicas de currículo e eventos patrocinados..."
              backgroundColor={COLORS.orangeColor}
              IconImage={IMAGES.WORKER.DashboardBanner1}
              marginRight={13}
            />
            <WorkerDashboardBannersComponent
              text="Aqui link para um blog com dicas de carreira, cursos gratuitos, cursos com valor simbólico, dicas de currículo e eventos patrocinados..."
              backgroundColor={COLORS.primaryColor}
              color="white"
              reverse={true}
              IconImage={IMAGES.WORKER.DashboardBanner2}
            />
          </ScrollView>
        </View>
        <EventCategoryList />
        <Text style={style.howTo}>Vagas em destaque </Text>
          {/* <Text style={style.howTo}>Como começar?</Text> */}
        {!jobs.length ? <JobsList onClick={undefined}/>:<NotFound /> }
        
      </View>
    </>
  );
};

const style = StyleSheet.create({
  body: {
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: PADDINGS.horizontal,
  },
  hello: {
    fontSize: 20,
    color: COLORS.primaryColor,
    marginTop: 20,
  },
  howTo: {
    fontSize: 20,
    color: COLORS.primaryColor,
    marginTop: 10,
    fontWeight: "bold",
  },
});
