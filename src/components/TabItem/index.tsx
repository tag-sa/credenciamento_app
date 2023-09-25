import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

interface TabItemProps {
  label: string;
  item: any;
  activeTab: any;
  setActiveTab: (tab: string) => void;
}

export const TabItem = ({
  item,
  label,
  activeTab,
  setActiveTab,
}: TabItemProps) => {
  return (
    <TouchableOpacity onPress={() => setActiveTab(item)}>
      <View style={activeTab === item ? styles.tabItemActive : styles.tabItem}>
        <Text
          style={
            activeTab === item ? styles.tabItemTextActive : styles.tabItemText
          }
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tabItemActive: {
    marginLeft: 30,
    minWidth: 100,
    height: 32,
    backgroundColor: COLORS.whiteColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  tabItemText: {
    color: COLORS.secBlueColor,
    fontSize: 11,
    fontWeight: "bold",
  },
  tabItemTextActive: {
    color: COLORS.primaryColor,
    fontSize: 11,
    fontWeight: "bold",
  },
});
