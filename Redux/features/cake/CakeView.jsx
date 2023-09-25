import React from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import {ordered, restocked} from './cakeSlice'

export const CakeView = () => {
  const cakeNum = useSelector((state)=> state.cake.numOfCakes)
  const dispatch = useDispatch()
  console.log(cakeNum)
  return (
    <div>
        <h2>Number of Cakes - {cakeNum}</h2>
        <button onClick={()=> dispatch(ordered())}>Order Cake</button>
        <button onClick={()=> dispatch(restocked(5))}>Restock cake</button>
    </div>
  )
}
