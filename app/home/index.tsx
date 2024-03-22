import { useQuery } from "@tanstack/react-query";
import { getDatabase, onValue, ref } from "firebase/database";
import { FlatList, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { appFirebase } from "@/firebaseConfig";
import { Text } from "@/src/components/atoms/text";
import { ItemMedicament } from "@/src/components/molecules/itemMedicament";
import { getGreeting } from "@/src/functions/getGreeting";
import { scaleSize } from "@/src/functions/scaleSize";
import { styles } from "@/src/styles/home";
import { theme } from "@/src/theme";

interface MedicamentProps {
  id: number;
  medicament: string;
  amount: number;
  updateAt: string;
}

const renderHeader = () => (
  <Text type="heading" value="Meus remédios" style={{ marginTop: scaleSize(16) }} />
);

const renderItems = ({ item }: { item: MedicamentProps }) => (
  <View style={styles.itemList}>
    <View style={styles.vStack}>
      <ItemMedicament icon="badgeInfo" label={"Porta"} value={item.id} />
      <ItemMedicament icon="pill" label={"Remédio"} value={item.medicament} />
      <ItemMedicament icon="calendar" label={"Última dose"} value={item.updateAt} />
    </View>
    <View>
      <Text type="paragraph" value={"Quantidade"} textStyle={{ color: theme.colors.gray }} />
      <Text type="title" value={item.amount} textStyle={{ fontSize: scaleSize(64) }} />
    </View>
  </View>
);

export default function Home() {
  const { top } = useSafeAreaInsets();

  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["medicaments"],
    queryFn: async () => {
      const db = getDatabase(appFirebase);
      const medicamentsURL = ref(db, "medicaments/");

      const medicaments = new Promise((resolve, reject) => {
        onValue(
          medicamentsURL,
          (snapshot) => {
            const data = snapshot.val();
            const arrayMedicaments = Object.keys(data).map((key) => {
              return { id: key, ...data[key] };
            });

            resolve(arrayMedicaments);
          },
          (error) => {
            reject(error);
          },
        );
      });
      return medicaments as unknown as MedicamentProps[];
    },
    initialData: [] as MedicamentProps[],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text type="title" value={`👋`} />
        <View>
          <Text type="title" value={`Olá, ${getGreeting()}`} textStyle={{}} />
          <Text type="subtitle" value="Seja bem-vindo(a)" />
        </View>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.colors.dark}
            colors={[theme.colors.secondary.light]}
          />
        }
        refreshing={isLoading}
        data={data}
        keyExtractor={(item) => item.medicament}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            {isError && (
              <Text type={"title"} value={"Não encontramos seus dados ou pode estar offline"} />
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItems}
        contentContainerStyle={{
          gap: scaleSize(16),
          paddingBottom: top,
          paddingHorizontal: scaleSize(4),
        }}
      />
    </View>
  );
}
