import React, {useEffect, useReducer, useState} from 'react'
import s from './HW12.module.css'
import s2 from '../../s1-main/App.module.css'
import SuperSelect from '../hw07/common/c5-SuperSelect/SuperSelect'
import {useDispatch, useSelector} from 'react-redux'
import {changeThemeId, initStateType, themeReducer} from './bll/themeReducer'
import {combineReducers, legacy_createStore} from "redux";
import {log} from "util";

/*
* 1 - в файле themeReducer.ts написать нужные типы вместо any, дописать редьюсер
* 2 - получить themeId из редакса
* 3 - дописать тип и логику функции change
* 4 - передать пропсы в SuperSelect
* */

export const themes = [
    {id: 1, value: 'light'},
    {id: 2, value: 'blue'},
    {id: 3, value: 'dark'},
]
type themesType=themeType[]
type themeType={
    id: number,
    value: string
}
const HW12 = () => {
    // взять ид темы из редакса
    const themeId = useSelector<AppRootStateType, number>(state => state.theme.themeId)
    console.log('themeId', themeId)
    //const [theme, setTheme]=useState<themeType[]>([{id: 1, value: 'light'}])
    const dispatch=useDispatch()

    const change = (id: number) => { // дописать функцию

          dispatch(changeThemeId(id))
    }

    useEffect(() => {
            document.documentElement.dataset.theme = themeId + ''
        //setTheme([...themes.map(el=>el.id==themeId?{...el, id:1}: el.id==1? {...el, id:+themeId}:el)])

   }, [themeId])
    //console.log(theme[themeId-1].id)
    return (
        <div id={'hw12'}>
            <div id={'hw12-text'} className={s2.hwTitle}>
                Homework #12
            </div>


            <div className={s2.hw}>
                <span>Выберите тему</span>
                <SuperSelect
                    id={'hw12-select-theme'}
                    className={s.select}
                    options={themes}
                    value={themeId}
                   //value={theme[themeId-1].id}
                    onChangeOption={change}

                    // сделать переключение тем

               />

            </div>
        </div>
    )
}

export default HW12

const rootReducer = combineReducers({
    theme: themeReducer
}as const)
export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
