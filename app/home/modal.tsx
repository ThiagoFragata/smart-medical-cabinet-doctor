import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getDatabase, ref, update } from "firebase/database";
import { useForm } from "react-hook-form";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import { ChevLeft } from "@/src/assets/svg";
import { Button } from "@/src/components/atoms/button";
import { Text } from "@/src/components/atoms/text";
import { ControllerInput } from "@/src/components/molecules/controllerInput";
import { scaleSize } from "@/src/functions/scaleSize";
import { styles } from "@/src/styles/modal";
import { theme } from "@/src/theme";

const Schema = yup
  .object({
    medicament: yup.string().required("Informe um medicamento"),
    amount: yup.string().required("Informe a quantidade"),
    interval: yup.string().required("Informe o intervalo de uso"),
  })
  .required();

type SchemaType = yup.InferType<typeof Schema>;

export default function Modal() {
  const params = useLocalSearchParams<{ id?: string }>();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<SchemaType>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = handleSubmit(({ amount, interval, medicament }) => {
    const db = getDatabase();
    update(ref(db, `medicaments/${params.id}`), {
      amount: Number(amount),
      interval,
      medicament,
    })
      .then(() => {
        Alert.alert("Remédio atualizado com sucesso!");
        router.back();
        queryClient.invalidateQueries({ queryKey: ["medicaments"] });
      })
      .catch((error) => {
        Alert.alert("Error ao atualizar o remédio!");
        console.error(error);
      });
  });

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />

      {Platform.OS === "android" ? (
        <View style={styles.headerTitle}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ paddingVertical: scaleSize(16) }}>
            <ChevLeft stroke={theme.colors.dark} />
          </TouchableOpacity>
          <Text type={"title"} value={`Atualizar ${params.id}` || "Atualizar"} />
        </View>
      ) : (
        <Text
          type={"title"}
          value={`Atualizar ${params.id}` || "Atualizar"}
          textStyle={{ textAlign: "center", marginBottom: scaleSize(16) }}
        />
      )}

      <View style={styles.vStack}>
        <ControllerInput
          name="medicament"
          label="Nome do remédio"
          control={control}
          keyboardType="default"
        />

        <ControllerInput
          name="amount"
          label="Quantidade"
          control={control}
          keyboardType="numeric"
        />

        <ControllerInput
          name="interval"
          label="Intervalo de dose"
          control={control}
          keyboardType="numeric"
        />
      </View>

      <Button title={"Salvar"} onPress={onSubmit} />
    </View>
  );
}
