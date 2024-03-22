import { StyleProp, TextStyle, View } from "react-native";

import { BadgeInfo, Calendar, Pill } from "@/src/assets/svg";
import { Text } from "@/src/components/atoms/text";
import { scaleSize } from "@/src/functions/scaleSize";
import { theme } from "@/src/theme";

type iconsType = keyof typeof icons;
const icons = {
  badgeInfo: (color: string) => <BadgeInfo stroke={color} />,
  calendar: (color: string) => <Calendar stroke={color} />,
  pill: (color: string) => <Pill stroke={color} />,
};

interface ItemMedicamentProps {
  icon?: iconsType;
  iconColor?: string;
  label: string;
  value: string | number;

  textStyle?: StyleProp<TextStyle>;
}

export function ItemMedicament({
  icon,
  iconColor = theme.colors.dark,
  label,
  value,
}: ItemMedicamentProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: scaleSize(8) }}>
      <View>{icon && icons[icon](iconColor)}</View>

      <View>
        <Text type="paragraph" value={label} textStyle={{ color: theme.colors.gray }} />
        <Text type="heading" value={value} />
      </View>
    </View>
  );
}
