import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const people = [
    {
        id: 1,
        name: 'All Categories',
    },
    {
        id: 2,
        name: 'Dispached Out',
    },
    {
        id: 3,
        name: 'In Warehouse',
    },
    {
        id: 4,
        name: 'Being Brought In',
    },
    {
        id: 5,
        name: 'Delivered',
    },
];

function Filter(props) {
    const { title, searchTerm, setSearchTerm } = props;

    return (
        <>
            <div className="m-2 w-full">
                <div className="flex justify-between flex-wrap ">
                    <div className="flex flex-col w-[32rem]">
                        <input
                            type="text"
                            id="search"
                            placeholder={`${title} . . . `}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full sm:w-40">
                        <Listbox value={people[0]} onChange={() => { }}>
                            {({ open }) => (
                                <>
                                    <div className="relative mt-2">
                                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
                                            <span className="flex items-center">
                                                <span className="ml-3 block truncate">{people[0].name}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                </svg>
                                            </span>
                                        </Listbox.Button>

                                        <Transition
                                            show={open}
                                            as={Transition.Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {people.map((person) => (
                                                    <Listbox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `${active ? 'bg-blue-600 text-white' : 'text-gray-900'} relative cursor-default select-none py-2 pl-3 pr-9`
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={`${selected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}
                                                                    >
                                                                        {person.name}
                                                                    </span>
                                                                </div>
                                                                {selected ? (
                                                                    <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-blue-600'}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
