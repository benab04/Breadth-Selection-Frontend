import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import * as d3 from "d3";

function LineGraph({ showModal, data, onClose }) {
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  const tableRef = useRef(null); // Define table reference

  useEffect(() => {
    if (showModal) {
      drawGraph();
    }
  }, [showModal]);

  const drawGraph = () => {
    if (!data || data.length === 0) return;

    const svgWidth = 800; // Increased SVG width
    const svgHeight = 500; // Increased SVG height
    const margin = { top: 50, right: 50, bottom: 100, left: 100 }; // Adjusted margins
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const legend = d3.select(legendRef.current);
    const table = d3.select(tableRef.current);

    const x = d3
      .scaleBand()
      .domain(["EX", "A", "B", "C", "D", "P", "F"])
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data.flatMap((d) => Object.values(d).slice(0, -1)))])
      .nice()
      .range([height + margin.top, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const line = d3
      .line()
      .x((d, i) => x.bandwidth() / 2 + x(Object.keys(data[0])[i]))
      .y((d) => y(d));

    svg.selectAll("*").remove(); // Clear previous drawings

    data.forEach((sessionData, index) => {
      const sessionName = sessionData.session;
      const sessionColor = colorScale(sessionName);

      const path = svg
        .append("path")
        .datum(Object.values(sessionData).slice(0, -1))
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", sessionColor)
        .style("fill", "none")
        .on("mouseover", function () {
          table
            .selectAll("tr")
            .style("background-color", "rgba(255, 255, 255, 0.6)"); // Reduce opacity of table row background color
          table.select(`#row-${index}`).style("background-color", sessionColor); // Highlight corresponding table row
        });

      // Draw dots for each point
      svg
        .selectAll(`.dot-${index}`) // Use unique class for each plot
        .data(Object.values(sessionData).slice(0, -1))
        .enter()
        .append("circle")
        .attr("class", `dot dot-${index}`) // Use unique class for each plot
        .attr("cx", (d, i) => x.bandwidth() / 2 + x(Object.keys(data[0])[i]))
        .attr("cy", (d) => y(d))
        .attr("r", 5) // Adjust the radius to make the dots bold
        .style("fill", sessionColor)
        .style("opacity", 0.6) // Reduced opacity for highlighting
        .style("cursor", "pointer") // Change cursor to pointer on hover
        .on("mouseover", function () {
          path.style("stroke-width", 3); // Increase line width on hover
          table
            .selectAll("tr")
            .style("background-color", "rgba(255, 255, 255, 0.6)"); // Reduce opacity of table row background color
          table.select(`#row-${index}`).style("background-color", sessionColor); // Highlight corresponding table row
        })
        .on("mouseout", function () {
          path.style("stroke-width", 1); // Reset line width
        });

      // Add legend
      legend
        .append("div")
        .attr("class", "legend-item")
        .style("color", sessionColor)
        .text(sessionName);

      // Add data to table
      if (index === 0) {
        const columns = Object.keys(sessionData).slice(0, -1); // Get column headings
        table
          .append("tr")
          .selectAll("th")
          .data(columns)
          .enter()
          .append("th")
          .text((d) => d); // Set column headings
      }
      const rowData = Object.values(sessionData).slice(0, -1);
      table
        .append("tr")
        .attr("id", `row-${index}`)
        .selectAll("td")
        .data(rowData)
        .enter()
        .append("td")
        .text((d) => d);
    });

    // Draw axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  };

  return (
    <Modal show={showModal} onHide={onClose} size="lg">
      {" "}
      {/* Set the modal size to large */}
      <Modal.Header closeButton>
        <Modal.Title>Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <svg ref={svgRef}></svg>
        <div ref={legendRef} className="legend"></div>
        <div className="table-responsive">
          {" "}
          {/* Center the table */}
          <table
            ref={tableRef}
            className="my-3 table table-bordered"
          ></table>{" "}
          {/* Add table for data */}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LineGraph;
