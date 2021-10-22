import React, { Component } from "react";
import Chart from "react-apexcharts";

class apex_chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",

          toolbar: {
            show: false,

          },
        },
        xaxis: {
          categories: [1980, 1982, 1984, 1986, 1988, 1990, 1992, 1994, 1996, 1980, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012],
          title: {
            text: ""
          }
        }
      },
      series: [
        {
          name: "All species (111)",
          data: [100, 100, 104, 105, 100, 112, 113, 114, 115, 116, 117, 118, 119, 120, 112, 132, 123, 129]
        },
        {
          name: "Olive Ridley Turtles (20)",
          data: ["100", "90", "92", "98", "91", "100", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113"]

        },
        {
          name: "Green Turtles (38)",
          data: ["100", "102", "100", "103", "90", "98", "110", "120", "123", "125", "126", "127", "130", "120", "121", "140", "145", "130"]

        },
        {
          name: "LeatherBack Turtles (19)",
          data: ["100", "108", "110", "115", "117", "119", "111", "123", "124", "126", "118", "115", "133", "134", "115", "135", "136", "138"],

        },
      ]

    };

  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default apex_chart;