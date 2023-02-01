const initState = {
    themeId: 1,
    //value: 'light'
}
export type initStateType={
    themeId: number
   // value: string
}

export const themeReducer = (state:initStateType = initState, action: changeThemeIdType): initStateType => {
    // fix any
    switch (action.type) {
        case "SET_THEME_ID":{
            return {...state, themeId:action.id}
        }
        // дописать

        default:
            return state
    }
}
type changeThemeIdType=ReturnType<typeof changeThemeId>
export const changeThemeId = (id: number) => ({ type: 'SET_THEME_ID', id }as const) // fix any
