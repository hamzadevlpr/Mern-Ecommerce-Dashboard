import React from 'react'

function Pagination({ productsPerPage, totalProducts, currentPage, setCurrentPage }) {

    const pageNumbers = [];
    // Calculate the total number of pages
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <div className="flex justify-center mt-8">
                <div className="flex rounded-md">
                    {pageNumbers.map((number) => (
                        <a
                            key={number}
                            href="#"
                            className={`py-2 px-4 leading-tight bg-white border border-gray-200 ${currentPage === number
                                ? 'bg-blue-500'
                                : 'text-gray-700 hover:bg-blue-500 hover:text-white'
                                } ${number === 1 ? 'rounded-l' : ''} ${number === pageNumbers.length ? 'rounded-r' : ''
                                }`}
                            onClick={() => setCurrentPage(number)}
                        >
                            <span>{number}</span>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Pagination