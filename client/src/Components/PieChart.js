import React from 'react'
import useD3 from '../hooks/useD3'
import * as d3 from 'd3';

function PieChart() {

  let color = d3.scaleOrdinal()
    .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor"])
    .range(["#8ce8ad", "#57e188", "#34c768", "#2db757", "#27acaa", "#42c9c2", "#60e6e1"]);

  const randomData = () => {
    let labels = color.domain();
    return labels.map(function (label) {
      return { label: label, value: Math.random() };
    });
  }


  const ref = useD3(
    (svg) => {
      const data = randomData();

      let width = 300;
      let height = 300;
      let margin = { top: 10, right: 10, bottom: 10, left: 40 };

      let boxSize = 500;

      let radius = Math.min(width, height) / 2 - 10;

      svg
        .attr("width", "100%")
        .attr("height", "100%")
        .attr('viewBox', `0 0 ${boxSize} ${boxSize}`)
        .append("g")
        .attr("transform", `translate(${boxSize / 2},${boxSize / 2})`);	

      let pie = d3.pie()
        .value(d => d.value);

      let data_ready = pie(data);

      console.log(data_ready);

      svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", d3.arc()
          .innerRadius(radius / 1.75)
          .outerRadius(radius)
        )
        .attr("fill", (d) => {
          return color(d.data.label);
        })
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("opacity", 0.7);

    }, []);


  return (
    <svg ref={ref}></svg>
  )
}

export default PieChart