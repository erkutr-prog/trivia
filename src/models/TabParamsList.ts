import { Categories, CategoryInformation } from "./Category"

export type RootStackParamList = {
    Home: undefined,
    Profile: undefined
}

export type AppStackParamList = {
    Main: undefined,
    GameOptions: { category: CategoryInformation },
    Game: { link: string, categoryName: Categories, totalQuestions: number, timelimit: Boolean },
    GameResult: { score: number, totalQuestions: number}
}