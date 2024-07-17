import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailParams } from "../(tabs)/Details"
import { HomeParams } from "../(tabs)";
import { DetailSellParams } from "../(tabs)/DetailSell";
import { ModalParams } from "../modal";
import { ImageDetailsParams } from "../(tabs)/ImageDetails";


export type RootStackParamList = {
    Home : HomeParams,
    Detail : DetailParams,
    Sell : DetailSellParams,
    Modal : ModalParams,
    MiniGame : any,
    Image : ImageDetailsParams
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }