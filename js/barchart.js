/*

Basic Bar Chart
Author: Álvaro Sánchez Pérez - https://github.com/alvarosperez


Initialize with:
    chart = new BarChart("cssSelector", 500, 300)
Update data with:
    chart.setData(dataset)
Expected format:
    dataset = [{"id": 10, "value": 20}, {...}]

*/


class BarChart {

    // constructor method, initialize SVG holder, scales, axis...
    // no data yet!
    constructor(container, width, height) {

        // Create SVG element
        this.svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // calculate chart dimensions
        var marginLeft = 40,
            marginTop = 20,
            marginBottom = 20,
            marginRight = 20;
        this.chartHeight = height - marginTop - marginBottom;
        this.chartWidth = width - marginLeft - marginRight;

        // chart G holder
        this.chart = this.svg.append("g")
            .attr("transform", "translate(" + marginLeft + ", " + marginTop + ")")

        // scales
        this.xScale = d3.scaleBand()
            .rangeRound([0, this.chartWidth])
            .padding(.05);
        this.yScale = d3.scaleLinear()
            .range([this.chartHeight, 0]);
        this.heightScale = d3.scaleLinear()
            .range([0, this.chartHeight]);
        this.colorScale = d3.scaleLinear()
            .range(["lightblue", "blue"]);

        // x Axis
        this.xAxis = d3.axisBottom().scale(this.xScale);
        this.xAxisContainer = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.chartHeight + ")")
            .call(this.xAxis);

        // y axis
        this.yAxis = d3.axisLeft().scale(this.yScale);
        this.yAxisContainer = this.chart.append("g")
            .attr("class", "y axis")
            .call(this.yAxis);
    }

    // update chart with data
    // set new scale domains, update axis, update elements
    setData(dataset) {

        // update scales
        var maxValue = d3.max(dataset, function(row) {
            return row["value"];
        });
        this.xScale.domain(dataset.map(function(d) { return d["id"]; }));
        this.yScale.domain([0, maxValue * 1.2]);
        this.heightScale.domain([0, maxValue * 1.2]);
        this.colorScale.domain([0, maxValue]);

        // update axis
        this.yAxisContainer.transition().duration(500).call(this.yAxis);
        this.xAxisContainer.transition().duration(500).call(this.xAxis);

        // update elements
        this.updateBars(dataset);
        this.updateLabels(dataset);
    }

    // update chart elements - bars
    updateBars(dataset) {
        var self = this;

        // update rects
        var bars = self.chart.selectAll("rect").data(dataset);

        // enter new elements
        bars
            .enter()
            .append("rect")
                .attr("width", self.xScale.bandwidth())
                .attr("x", function(d) {
                    return self.xScale(d["id"]);
                })
                // position before transition
                .attr("y", self.chartHeight)
                // events
                .on("mouseover", function(d) {
                    d3.select(this)
                        .transition().duration(300)
                        .attr("fill", "orange");
                })
                .on("mouseleave", function(d) {
                    d3.select(this)
                        .transition().duration(300)
                        .attr("fill", function(d) {
                            return self.colorScale(d["value"]);
                        });
                })
                .on("click", function(d) {
                    d3.select("#textBox").text(function(d) {
                        console.log(d)
                        return d
                    })
                })
            .transition().duration(1000)
                .attr("y", function(d) {
                    return self.yScale(d["value"]);
                })
                .attr("height", function(d) {
                    return self.heightScale(d["value"]);
                })
                .attr("fill", function(d) {
                    return self.colorScale(d["value"]);
                })

        // update current
        bars
            .transition().duration(500)
            .attr("x", function(d) {
                return self.xScale(d["id"]);
            })
            .attr("width", self.xScale.bandwidth())
            .attr("y", function(d) {
                return self.yScale(d["value"]);
            })
            .attr("height", function(d) {
                return self.heightScale(d["value"]);
            })
            .attr("fill", function(d) {
                return self.colorScale(d["value"]);
            });

        // exit old elements
        bars
            .exit()
            .transition().duration(1000)
            .attr("height", 0)
            .attr("y", self.chartHeight)
            .remove();
    }

    // update chart elements - labels
    updateLabels(dataset) {
        var self = this;

        // update labels
        var labels = self.chart.selectAll("text.label").data(dataset);

        // enter new elements
        labels
            .enter()
            .append("text")
            .attr("class", "label")
                // opacity value before transition
                .attr("opacity", 0)
                .attr("x", function(d, i) {
                    return self.xScale(d["id"]) + self.xScale.bandwidth() / 2;
                })
                // position before transition
                .attr("y", self.chartHeight)
                .text(function(d) {
                    return d["value"]
                })
                .attr("fill", "black")
                .attr("font-size", "10px")
                .attr("text-anchor", "middle")
            .transition().duration(1000)
                .attr("opacity", 1)
                .attr("y", function(d) {
                    return self.yScale(d["value"]) - 5;
                });

        // update current
        labels
            .text(function(d) {
                return d["value"]
            })
            .transition().duration(500)
            .attr("x", function(d, i) {
                return self.xScale(d["id"]) + self.xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return self.yScale(d["value"]) - 5;
            })

        // exit old elements
        labels.exit()
            .transition().duration(1000)
            .attr("opacity", 0)
            .remove();
    }
}
