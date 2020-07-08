import React, { Component } from "react";

export default class LineGraph extends Component {
  state = {
    properties: {
      type: "horizontal",
      height: 400,
      width: 600,
      id: 1234,
      color: {
        fillColor: "#34b4eb",
        selectedColor: "#174558",
        textColor: "black",
      },
      border: {
        borderWidth: 2,
        borderColor: "#4F8098",
      },
      marginTop: 60,
      fontSize: 20,
      shadow: {
        shadowBlur: 5,
        shadowColor: "#239ace",
      },
    },
    dataSet: [
      { title: "name name name", value: 6500, high_light: false },
      { title: "name", value: 4700, high_light: false },
      { title: "name", value: 1200, high_light: false },
      { title: "name", value: 35, high_light: false },
      { title: "name", value: 450, high_light: false },
      { title: "name", value: 750, high_light: false },
      { title: "name", value: 1172, high_light: false },
      { title: "name", value: 1172, high_light: false },
      { title: "name", value: 250, high_light: false },
      { title: "name", value: 1400, high_light: false },
      { title: "name", value: 405, high_light: false },
      { title: "name", value: 300, high_light: false },
      { title: "expenses", value: 4250, high_light: false },
      { title: "name", value: 113, high_light: false },
    ],
    locations: [],
  };

  render() {
    let style = {
      border: "1px solid black",
      backgroundColor: "white",
    };
    return (
      <div>
        <canvas
          style={style}
          id={this.state.properties.id}
          onMouseMove={(e) => {
            this.hoverHandler(e);
          }}
        ></canvas>
      </div>
    );
  }

  hoverHandler(e) {
    let canvas = document.getElementById(this.state.properties.id);
    let left = e.clientX - canvas.offsetLeft;
    let top = e.clientY - canvas.offsetTop;

    let dateSet = JSON.parse(JSON.stringify(this.state.dataSet));

    for (let i in this.state.locations) {
      let left_start = this.state.locations[i].start.left;
      let left_end = this.state.locations[i].end.left;

      if (left_start <= left && left <= left_end) {
        dateSet[i].high_light = true;
      } else {
        dateSet[i].high_light = false;
      }

      this.setState(
        {
          dataSet: dateSet,
        },
        () => {
          this.renderGraph(this.state.properties, this.state.dataSet);
        }
      );
    }
  }

  componentDidMount() {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x,
      y,
      width,
      height,
      radius,
      fill,
      stroke
    ) {
      var cornerRadius = {
        upperLeft: 0,
        upperRight: 0,
        lowerLeft: 0,
        lowerRight: 0,
      };
      if (typeof stroke == "undefined") {
        stroke = true;
      }
      if (typeof radius === "object") {
        for (var side in radius) {
          cornerRadius[side] = radius[side];
        }
      }

      this.beginPath();
      this.moveTo(x + cornerRadius.upperLeft, y);
      this.lineTo(x + width - cornerRadius.upperRight, y);
      this.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + cornerRadius.upperRight
      );
      this.lineTo(x + width, y + height - cornerRadius.lowerRight);
      this.quadraticCurveTo(
        x + width,
        y + height,
        x + width - cornerRadius.lowerRight,
        y + height
      );
      this.lineTo(x + cornerRadius.lowerLeft, y + height);
      this.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - cornerRadius.lowerLeft
      );
      this.lineTo(x, y + cornerRadius.upperLeft);
      this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
      this.closePath();
      if (stroke) {
        this.stroke();
      }
      if (fill) {
        this.fill();
      }
    };

    this.renderGraph(this.state.properties, this.state.dataSet);
  }
  renderGraphOLD = (props, dataSet) => {
    let canvas = document.getElementById(props.id);
    let ctx = canvas.getContext("2d");

    canvas.width = props.width;
    canvas.height = props.height;
    ctx.font = props.fontSize + "px serif";
    let stepsSizw = props.width / dataSet.length;
    ctx.fillStyle = props.fillColor;
    ctx.strokeStyle = props.borderColor;
    ctx.lineWidth = props.borderWidth;
    let left = stepsSizw / 2 - stepsSizw / 4;
    const maxValue = this.findMaxValue(dataSet);
    ctx.shadowBlur = props.shadow.shadowBlur;
    ctx.shadowColor = props.shadow.shadowColor;

    let locations = [];

    // -------------------------------------------------------- > render bars
    for (let i in dataSet) {
      ctx.beginPath();
      // let size = dataSet[i].value*normalize;
      let size = (dataSet[i].value * props.height) / maxValue;

      if (size + props.marginTop > props.height) {
        size -= props.marginTop;
      }
      if (size < 10) size = 10;

      ctx.beginPath();
      locations.push({
        start: { left, top: props.height - size },
        end: { left: left + stepsSizw / 2, top: props.height },
      });
      ctx.fillStyle = props.fillColor;
      if (dataSet[i].high_light) {
        ctx.fillStyle = props.selectedColor;
      }

      ctx.roundRect(
        left,
        props.height - size,
        stepsSizw / 2,
        props.height,
        { upperLeft: 10, upperRight: 10 },
        true,
        dataSet[i].high_light
      );

      left += stepsSizw;
    }

    this.setState({ locations });

    left = stepsSizw / 2 - stepsSizw / 4;

    //----------------------------------------------------------> render text
    for (let i in dataSet) {
      ctx.beginPath();
      // let size = dataSet[i].value*normalize;
      let value = dataSet[i].value;
      let size = (value * props.height) / maxValue;

      if (size + props.marginTop > props.height) {
        size -= props.marginTop;
      }
      if (size < 5) size = 5;

      if (dataSet[i].high_light) {
        let delta = 10;
        let margin_text = 10;

        if (size >= 20 && size <= 40) delta = size * 1.5;

        if (size <= 20) delta = size * 4;

        console.log("size", size, "delta", delta);
        ctx.fillStyle = props.fillColor;
        ctx.shadowBlur = props.shadow.shadowBlur;
        ctx.shadowColor = props.shadow.shadowColor;

        let box_width = 0;
        if (dataSet[i].title.length > dataSet[i].value.toString().length)
          box_width = dataSet[i].title.length * (props.fontSize / 1.5);
        else {
          box_width =
            dataSet[i].value.toString().length * (props.fontSize / 1.5);
        }
        ctx.roundRect(
          left + margin_text - 10,
          props.height - size - delta - props.fontSize * 1.5,
          box_width + 10,
          props.fontSize * 3,
          { upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10 },
          true,
          true
        );
        ctx.fillStyle = props.textColor;
        ctx.shadowBlur = "";
        ctx.shadowColor = "";
        ctx.fillText(value, left + margin_text, props.height - size - delta);
        ctx.fillText(
          dataSet[i].title,
          left + margin_text,
          props.height - size - delta + props.fontSize
        );
      }
      ctx.stroke();

      left += stepsSizw;
    }
  };

  renderGraph = (props, dataSet) => {
    let canvas = document.getElementById(props.id);
    let ctx = canvas.getContext("2d");

    canvas.width = props.width;
    canvas.height = props.height;
    ctx.font = props.fontSize + "px serif";
    let stepsSizw = props.width / dataSet.length;
    let left = stepsSizw / 2 - stepsSizw / 4;
    const maxValue = this.findMaxValue(dataSet);

    let locations = [];

    // -------------------------------------------------------- > render bars
    for (let i in dataSet) {
      ctx.beginPath();
      let value = dataSet[i].value;
      let title = dataSet[i].title;
      let size = (dataSet[i].value * props.height) / maxValue;

      if (size + props.marginTop > props.height) {
        size -= props.marginTop;
      }
      if (size < 10) size = 10;

      ctx.beginPath();
      locations.push({
        start: { left, top: props.height - size },
        end: { left: left + stepsSizw / 2, top: props.height },
      });

      //----------------------------------------- line colors

      ctx.shadowBlur = props.shadow.shadowBlur;
      ctx.shadowColor = props.shadow.shadowColor;
      ctx.fillStyle = props.color.fillColor;
      ctx.strokeStyle = props.color.fillColor;
      ctx.lineWidth = 1;

      if (dataSet[i].high_light) {
        ctx.fillStyle = props.color.selectedColor;
        ctx.strokeStyle = props.border.borderColor;
        ctx.lineWidth = props.border.borderWidth;
      }
      //----------------------------------------- line colors

      if (!dataSet[i].high_light) {
        ctx.roundRect(
          left,
          props.height - size,
          stepsSizw / 2,
          props.height,
          { upperLeft: 10, upperRight: 10 },
          true,
          dataSet[i].high_light
        );
      }

      if (dataSet[i].high_light) {
        let text_position_delta = 0;
        if (i > dataSet.length - 3) text_position_delta = -stepsSizw * 2;
        ctx.shadowBlur = props.shadow.shadowBlur;
        ctx.shadowColor = props.shadow.shadowColor;
        ctx.fillStyle = props.color.fillColor;
        ctx.strokeStyle = props.border.color;

        let max_textBox_width =
          dataSet[i].value.toString().length * props.fontSize * 2;

        ctx.roundRect(
          left + text_position_delta - 5,
          props.marginTop / 6,
          max_textBox_width,
          props.fontSize * 2.5,
          { upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10 },
          true,
          dataSet[i].high_light
        );

        ctx.fillStyle = props.color.textColor;
        ctx.shadowBlur = "";
        ctx.shadowColor = "";
        ctx.fillText(value, left + text_position_delta, props.marginTop / 2);

        ctx.fillText(
          title,
          left + text_position_delta,
          props.marginTop / 2 + props.fontSize
        );

        ctx.shadowBlur = props.shadow.shadowBlur;
        ctx.shadowColor = props.shadow.shadowColor;
        ctx.fillStyle = props.color.selectedColor;
        ctx.strokeStyle = props.border.color;

        ctx.roundRect(
          left,
          70,
          stepsSizw / 2,
          props.height,
          { upperLeft: 10, upperRight: 10 },
          true,
          dataSet[i].high_light
        );

        /*
        ctx.fillText(
          value,
          left + text_position_delta,
          props.height - size - props.fontSize * 1.2
        );

        ctx.fillText(
          title,
          left + text_position_delta,
          props.height - size - props.fontSize * 0.2
        );
         */
      }
      ctx.stroke();

      //---------------------------

      left += stepsSizw;
    }

    this.setState({ locations });

    left = stepsSizw / 2 - stepsSizw / 4;

    return;
    //----------------------------------------------------------> render text
    for (let i in dataSet) {
      ctx.beginPath();
      // let size = dataSet[i].value*normalize;
      let value = dataSet[i].value;
      let size = (value * props.height) / maxValue;

      if (size + props.marginTop > props.height) {
        size -= props.marginTop;
      }
      if (size < 5) size = 5;

      if (dataSet[i].high_light) {
        let delta = 10;
        let margin_text = 10;

        if (size >= 20 && size <= 40) delta = size * 1.5;

        if (size <= 20) delta = size * 4;

        ctx.fillStyle = props.fillColor;
        ctx.shadowBlur = props.shadow.shadowBlur;
        ctx.shadowColor = props.shadow.shadowColor;

        let box_width = 0;
        if (dataSet[i].title.length > dataSet[i].value.toString().length)
          box_width = dataSet[i].title.length * (props.fontSize / 1.5);
        else {
          box_width =
            dataSet[i].value.toString().length * (props.fontSize / 1.5);
        }
        ctx.roundRect(
          left + margin_text - 10,
          props.height - size - delta - props.fontSize * 1.5,
          box_width + 10,
          props.fontSize * 3,
          { upperLeft: 10, upperRight: 10, lowerLeft: 10, lowerRight: 10 },
          true,
          true
        );
        ctx.fillStyle = props.textColor;
        ctx.shadowBlur = "";
        ctx.shadowColor = "";
        ctx.fillText(value, left + margin_text, props.height - size - delta);
        ctx.fillText(
          dataSet[i].title,
          left + margin_text,
          props.height - size - delta + props.fontSize
        );
      }
      ctx.stroke();

      left += stepsSizw;
    }
  };

  findMaxValue = (dataSet) => {
    let max = 0;
    for (let i in dataSet) {
      if (dataSet[i].value > max) max = dataSet[i].value;
    }
    return max;
  };
}
