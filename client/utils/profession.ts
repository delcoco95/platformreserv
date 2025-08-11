import { Car, Wrench, Key, Users } from "lucide-react";

export const getProfessionIcon = (profession: string) => {
  switch (profession) {
    case "automobile":
      return Car;
    case "plomberie":
      return Wrench;
    case "serrurerie":
      return Key;
    default:
      return Users;
  }
};

export const getProfessionLabel = (profession: string) => {
  switch (profession) {
    case "automobile":
      return "Automobile";
    case "plomberie":
      return "Plomberie";
    case "serrurerie":
      return "Serrurerie";
    default:
      return profession;
  }
};
