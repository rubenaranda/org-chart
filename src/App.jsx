import React, { useEffect, useState } from 'react';
import { OrgChartComponent } from './orgChart';
import * as d3 from 'd3';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    d3.csv(
      'https://raw.githubusercontent.com/rubenaranda/mock-csv-sample/master/src/mockData/mock.csv'
    ).then((data) => {
      console.log(data)
     setData(data)
    });
  }, []);

  return <OrgChartComponent data={data} />;
};

export default App;
