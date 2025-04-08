import { Feather } from "@expo/vector-icons";

export const icon = {
  index: ({ color }: { color: string }) => (
    <Feather name="home" size={24} color={color} />
  ),
  explore: ({ color }: { color: string }) => (
    <Feather name="search" size={24} color={color} />
  ),
  profile: ({ color }: { color: string }) => (
    <Feather name="user" size={24} color={color} />
  ),
};
