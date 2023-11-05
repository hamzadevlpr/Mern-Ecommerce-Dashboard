import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

function Spinner() {
    const barColor = '#000'
    return (
        <div className="flex justify-center mt-20 h-40">
            <ClipLoader color="#000" size={60} className='h-96' />
        </div>
    )
}

export default Spinner