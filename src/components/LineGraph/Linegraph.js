import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import * as d3 from "d3";

function LineGraph({ showModal, data, onClose }) {
  const modalRef = useRef(null);
  data = [
    {
      EX: 3,
      A: 11,
      B: 2,
      C: 7,
      D: 3,
      P: 1,
      F: 0,
      session: "Autumn 22",
    },
  ];
  useEffect(() => {
    if (showModal) {
      drawGraph();
    }
  }, [showModal]);

  const drawGraph = () => {
    const svgWidth = 400;
    const svgHeight = 200;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select("#lineGraph")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.EX)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d.EX));

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .style("stroke", "steelblue")
      .style("fill", "none");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  };

  return (
    <Modal show={showModal} onHide={onClose} ref={modalRef}>
      <Modal.Header closeButton>
        <Modal.Title>Graph</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* You can place SVG or any content here for the graph */}
        <svg ref={modalRef}></svg>
      </Modal.Body>
    </Modal>
  );
}

export default LineGraph;
