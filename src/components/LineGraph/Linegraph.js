import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import * as d3 from "d3";

function LineGraph({ showModal, data, onClose }) {
  const svgRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      drawGraph();
    }
  }, [showModal]);

  const drawGraph = () => {
    if (!data || data.length === 0) return;

    const svgWidth = 500;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const legend = d3.select(legendRef.current);

    const x = d3
      .scaleBand()
      .domain(["EX", "A", "B", "C", "D", "P", "F"])
      .range([margin.left, width + margin.left])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(Object.values(d).slice(0, -1)))])
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

      svg
        .append("path")
        .datum(Object.values(sessionData).slice(0, -1))
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", sessionColor)
        .style("fill", "none");

      // Add legend
      legend
        .append("div")
        .attr("class", "legend-item")
        .style("color", sessionColor)
        .text(sessionName);
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
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <svg ref={svgRef}></svg>
        <div ref={legendRef} className="legend"></div>
      </Modal.Body>
    </Modal>
  );
}

export default LineGraph;
