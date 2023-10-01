import React from 'react'
import StatCards from './StatCards'

function Dashboard() {
    return (
        <>
            <h3 className="text-gray-800 font-bold py-5 text-2xl">Dashbaord</h3>
            <StatCards />
            {/* <BarChart /> */}
        </>
    )
}

export default Dashboard