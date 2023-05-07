import React from 'react'
import { useRecoilState } from 'recoil'
import  {modalState} from "../atom/modalAtom"
export default function ComponentModal() {
    const [open,setOpen]=useRecoilState(modalState);
    return (
    <div>
       Component model
       {open&&<h1>the modal is open</h1>}
    </div>
  )
}
