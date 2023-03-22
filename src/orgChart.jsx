import { OrgChart } from 'd3-org-chart';
import React, { useEffect, useRef } from 'react';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  useEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeHeight((d) => 70)
        .nodeWidth((d) => {
          if (d.depth === 0) return 250;
          if (d.depth === 1) return 220;
          return 140;
        })
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 35)
        .compactMarginPair((d) => 30)
        .neightbourMargin((a, b) => 20)
        .buttonContent(({ node, state }) => {
          return `<div style="border-radius:3px;padding:3px;font-size:10px;margin:auto auto;background-color:lightgray"> <span style="font-size:9px">${
            node.children
              ? `<i class="fas fa-chevron-up"></i>`
              : `<i class="fas fa-chevron-down"></i>`
          }</span> ${node.data._directSubordinates}  </div>`;
        })
        .nodeContent((d, i, arr, state) => {
          const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
          const color = colors[d.depth % colors.length];
          return `
          <div style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:50px">
          <img src=" ${
            d.data.imageUrl
          }" style="position:absolute;margin-top:5px;margin-left:${5}px;border-radius:100px;width:60px;height:60px;" />
          
          <div style="color:#fafafa;font-size:${
            d.depth < 2 ? 16 : 12
          }px;font-weight:bold;margin-left:70px;margin-top:15px"> ${d.depth < 2 ? d.data.name : (d.data.name || '').trim().split(/\s+/g)[0]} </div>
          <div style="color:#fafafa;margin-left:70px;margin-top:5px"> ${
            d.depth < 2 ? d.data.positionName : d.data.area
          }
          
          <div>${
            d.data.añosExp 
            ? `<div>${d.data.añosExp} años de profesion</div>`
            : `<div></div>`
          }
          `;
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};

