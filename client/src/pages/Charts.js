import React from "react";

function Charts() {
  return (
    <div>
      <iframe
        style={{background: "#F1F5F4",border: "none",borderRadius: "2px",boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)", height:"750px", width:"100%"}}
        src="https://charts.mongodb.com/charts-project-0-zjwhg/embed/dashboards?id=6c7b8193-f412-4f2c-b4f7-5fe12e794789&theme=light&autoRefresh=true&maxDataAge=300&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
      ></iframe>
    </div>
  );
}

export default Charts;
