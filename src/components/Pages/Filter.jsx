import React from 'react'
import Dropdown from '../Global/Dropdown'

function Filter() {
    return (
        <>
            <div className="m-2 w-full">
                <div className="flex justify-between flex-wrap ">
                    <div className="flex flex-col w-[32rem]">
                        <input
                            type="manufacturer"
                            id="manufacturer"
                            placeholder="Search Catalog"
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none"
                        />
                    </div>
                    <div className="flex flex-col w-full sm:w-40">
                        <Dropdown />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Filter