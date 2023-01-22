import React from 'react'
import {Slider, SliderProps} from '@mui/material'
import {green} from "@mui/material/colors";

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={(theme)=>({
                marginTop: '-6px',
                width: '147px',
                height: '4px',
                color: '#00CC22',
                '& .MuiSlider-thumb': {
                    height: '18px',
                    width: '18px',
                    border:'6px #fff solid',
                    outline: '1px solid #00CC22 ',
                    backgroundColor: '#00CC22',
                    },
                '& .MuiSlider-rail': {
                    color: theme.palette.mode === 'dark' ? '#00CC22' : '#8B8B8B',
                    height: 3,
                }


                // стили для слайдера // пишет студент
                
            })}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
