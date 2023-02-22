import React from 'react'
import upI from './../../icons/UP.png'
import downI from './../../icons/down.png'
import twoI from './../../icons/two.webp'

// добавить в проект иконки и импортировать
const downIcon = downI
const upIcon = upI
const noneIcon = twoI

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    //sort: (click) => down (click) => up (click) => '' (click) => down ...
    // console.log(sort)
    // пишет студент,
  //  debugger

    return sort===down ?
        up:sort===up?'': down
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
   // debugger
    const up = '0' + value
    const down = '1' + value
    
    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            {/*сделать иконку*/}
            <img
                id={id + '-icon-' + sort}
                src={icon}
                width={'10px'}
                height={'10px'}
            />

           {/* {icon}*/} {/*а это убрать*/}
        </span>
    )
}

export default SuperSort