import React, { useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import {ordered, restocked} from './icecreamSlice'

export const IcecreamView = () => {
  const icecreamNum = useSelector((state)=>state.icecream.numOfIcecreams)
  const dispatch = useDispatch()
  const [value , setValue] = useState(1)
  return (
    <div>
        <h2>Number of Icecream - {icecreamNum}</h2>
        <button onClick={()=> dispatch(ordered())}>Order Icecream</button>
        <input placeholder='default "1"' type="number" value={value}  onChange={ev =>setValue(parseInt(ev.target.value))}/>
        <button onClick={()=> dispatch(restocked(value || 1))}>Restock Icecream</button>
    </div>
  )
}
