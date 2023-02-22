import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import {useSearchParams} from 'react-router-dom'
import SuperPagination from "./common/c10-SuperPagination/SuperPagination";
import SuperSort from "./common/c10-SuperSort/SuperSort";


/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3',
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()

    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {

        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент

                if(res)
                {console.log(params)
                    if(sort==='1tech'){
                        setTechs((res.data.techs).sort((a,b)=>a.tech.localeCompare(b.tech)))
                        /*.*//*sort((a,b)=>a.developer.localeCompare(b.developer))*/
                    }
                    else if(sort==='0tech')
                    {
                        setTechs((res.data.techs).sort((a,b)=>b.tech.localeCompare(a.tech)))
                        /*.*//*(a,b)=>b.developer.localeCompare(a.developer)*/
                    }
                    else{
                        setTechs(res.data.techs)
                    }

                    setTotalCount(res.data.totalCount)
                }
                setLoading(false)
                // сохранить пришедшие данные
                //
            })
    }
    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        setPage(newPage)
        setCount(newCount)
        sendQuery({page:newPage, count:newCount, sort})
        setSearchParams({page, count, sort}.toString())
        setLoading(true)
    }
    const onChangeSort = (newSort: string) => {
        // делает студент
        setSort(newSort)
        setPage(1) // при сортировке сбрасывать на 1 страницу
        sendQuery({page, count, sort:newSort})
        setSearchParams({sort})
        setLoading(true)
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'}
                                   className={s.loading}>Loading...
                    <div className={s.loader}>
                        <div className={s.loaderInner}>
                            <div className={s.loaderLineWrap}>
                                <div className={s.loaderLine}></div>
                            </div>
                            <div className={s.loaderLineWrap}>
                                <div className={s.loaderLine}></div>
                            </div>
                            <div className={s.loaderLineWrap}>
                                <div className={s.loaderLine}></div>
                            </div>
                            <div className={s.loaderLineWrap}>
                                <div className={s.loaderLine}></div>
                            </div>
                            <div className={s.loaderLineWrap}>
                                <div className={s.loaderLine}></div>
                            </div>
                        </div>
                    </div>

                </div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort}
                                   value={'tech'}
                                   onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort}
                                   value={'developer'}
                                   onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15