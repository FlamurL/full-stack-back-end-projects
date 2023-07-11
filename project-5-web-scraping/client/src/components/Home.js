import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import "./Home.css"
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/companies');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'City', accessor: 'city' },
      { Header: 'Created At', accessor: 'createdAt' },
      { Header: 'Updated At', accessor: 'updatedAt' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className='full'>
      <h1>Companies</h1>
    <table {...getTableProps()} style={{ border: '1px solid black' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ background: 'gray' }}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', border: '1px solid black' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid black' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default Home;
