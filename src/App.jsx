import React, { useEffect, useState } from 'react';
import { OrgChartComponent } from './orgChart';
import * as d3 from 'd3';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then((data) => {
     setData(data)
    });
  }, []);

  return <OrgChartComponent data={data} />;
};

export default App;
