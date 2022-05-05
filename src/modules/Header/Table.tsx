import { useState } from 'react';
import StickyHeader from './StickyHeader';
import { countryData } from './Data';

interface ITableProps {}

export default function Table({ headers = [], data = [] }): ITableProps {
  const { tableRef, isSticky } = StickyHeader();
  const [display, setDisplay] = useState(false);
  const [countryDetails, setData] = useState<string>({
    countryHistroy: null,
  });

  const openDetails = (e) => {
    countryData.forEach((details) => {
      if (details.country === e.target.textContent) {
        setData({
          countryHistroy: details.data,
        });
      }
    });

    setDisplay(true);
  };

  const closeDetails = () => {
    setDisplay(false);
  };

  const renderHeader = () => (
    <thead>
      <tr>
        {headers.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <>
      <div>
        {isSticky && (
          <table
            className="sticky"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {renderHeader()}
          </table>
        )}
        <table ref={tableRef}>
          {renderHeader()}
          <tbody>
            {data.map((item) => (
              <tr key={item.code}>
                <td className="country" onMouseEnter={openDetails} onMouseOut={closeDetails}>
                  {item.country}
                </td>
                <td>{item.code}</td>
                <td>{item.area}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="country-details" style={{ display: display ? 'block' : 'none' }}>
          <p className="country-description">{countryDetails.countryHistroy}</p>
        </div>
      </div>
    </>
  );
}
