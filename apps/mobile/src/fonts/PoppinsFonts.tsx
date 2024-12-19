import { createFont } from "tamagui";

export const PoppinsFonts = createFont({
  family: "Poppins",
  size: {
    0.5: 10,
    1: 14,
    2: 16,
    3: 18,
    4: 22,
    5: 28,
    6: 32,
  },
  weight: {
    3: "300",
    4: "400",
    5: "500",
    6: "600",
    7: "700",
  },
  face: {
    300: { normal: "PoppinsLight" },
    400: { normal: "PoppinsRegular" },
    500: { normal: "PoppinsMedium" },
    600: { normal: "PoppinsSemiBold" },
    700: { normal: "PoppinsBold" },
  },
});
