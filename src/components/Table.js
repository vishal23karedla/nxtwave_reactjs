import React, { useMemo, useState } from "react";
import { useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

function Table({ data }) {

    const columns = useMemo(() => [
        {
            Header: ' ',
            columns: [
                {
                    Header: 'Created At',
                    accessor: 'createdAt',
                },
                {
                    Header: 'Title',
                    accessor: 'title',
                },
                {
                    Header: 'Description',
                    accessor: 'description',
                },
                {
                    Header: 'Link',
                    accessor: 'link',
                    Cell: props => <a target='_blank' href={props.value} rel="noreferrer" >{props.value}</a>
                },
            ],
        },

    ], []);

    const [delFlag, setDelflag] = useState(false);
    const [filterInput, setFilterInput] = useState("");

    let deleteIds = [];
    const [tempData, setTempData] = useState(data);

    // Update the state when input changes
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter("title", value);
        setFilterInput(value);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex},
        setFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 6 },
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const getIds = () => {

        for (let [, value] of Object.entries(selectedFlatRows)) {
            deleteIds = [...deleteIds, parseInt(value.id) + 1];
        }
    }

    const handleDelete = () => {
        getIds();
        let res = data.filter(item => !deleteIds.includes(parseInt(item.id)))
        setTempData(res);
        setDelflag(true);
    }

    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate("/resource/create");
    }

    return (<>
        {
            delFlag === true ? (<Table data={tempData} />) :
                (
                    // search bar
                    <div className="container mt-5">
                        <input
                            value={filterInput}
                            onChange={handleFilterChange}
                            placeholder={" Search by title"}
                            className='m-5 rounded'
                        />

                        {/* Buttons */}
                        <div className="d-flex justify-content-end m-4">
                            {/* <button className="btn btn-success m-2" onClick={navigateToCreate}>Add Item</button> */}
                            {Object.keys(selectedRowIds).length > 0 ? (
                                <button className="btn btn-success m-2" disabled>Add Item</button>
                            ) :
                                <button className="btn btn-success m-2" onClick={navigateToCreate}>Add Item</button>
                            }
                            {Object.keys(selectedRowIds).length > 0 ? (
                                <button className="btn btn-danger m-2" onClick={handleDelete}>Delete Item(s)</button>
                            ) :
                                <button className="btn btn-danger m-2 disabled">Delete Item(s)</button>
                            }
                            {Object.keys(selectedRowIds).length > 0 ? (
                                <button className="btn btn-warning m-2">Edit Item(s)</button>
                            ) :
                                <button className="btn btn-warning m-2 disabled">Edit Item(s)</button>
                            }
                        </div>

                        {/* Table */}
                        <table className="table table-bordered" {...getTableProps()}>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className={
                                                    column.isSorted ? 
                                                    (column.isSortedDesc ? "sort-desc" : "sort-asc" ) : ("")
                                                }
                                            >
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row)
                                    return (<>
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>

                        {/* eslint-disable jsx-a11y/anchor-is-valid */}
                        <ul className="pagination d-flex justify-content-center">
                            <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                <a className="page-link" >{'<<'}</a>
                            </li>
                            <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                <a className="page-link" >{'<'}</a>
                            </li>
                            <li>
                                <a className="page-link" >
                                    Page{' '}
                                    <strong>
                                        {pageIndex + 1} of {pageOptions.length}
                                    </strong>{' '}
                                </a>
                            </li>
                            <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                                <a className="page-link" >{'>'}</a>
                            </li>
                            <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                <a className="page-link" >{'>>'}</a>
                            </li>

                            <li>
                                <a className="page-link" >
                                    <input
                                        className="form-control"
                                        type="number"
                                        defaultValue={pageIndex + 1}
                                        onChange={e => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            gotoPage(page)
                                        }}
                                        style={{ width: '100px', height: '25px' }}
                                    />
                                </a>
                            </li>{' '}
                        </ul>
                    </div>
                )
        }
    </>)
}

export default Table;