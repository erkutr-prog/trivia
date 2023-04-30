import { CategoryInformation } from "./Category"

export type RootStackParamList = {
    Home: undefined,
    Profile: undefined
}

export type AppStackParamList = {
    Main: undefined,
    GameOptions: { category: CategoryInformation },
    Game: { link: string }
}