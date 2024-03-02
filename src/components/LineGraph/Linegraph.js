import React, { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import * as d3 from "d3";

const LineGraphModal = ({ data, showModal, setShowModal }) => {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const modalNode = document.getElementById("lineGraphModal");
    setModal(new Modal(modalNode));
  }, []);

  useEffect(() => {
    if (modal) {
      if (showModal) {
        modal.show();
        drawLineGraph();
      } else {
        modal.hide();
      }
    }
  }, [modal, showModal]);

  const drawLineGraph = () => {
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
    <div
      className="modal fade"
      id="lineGraphModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Line Graph
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <svg id="lineGraph"></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineGraphModal;
