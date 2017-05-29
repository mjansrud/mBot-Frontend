import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";

var { LineSeries , RSISeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;

var { SingleValueTooltip, RSITooltip } = tooltip;

var { XAxis, YAxis } = axes;
var { rsi, atr, ema, sma } = indicator;

var { fitWidth } = helper;

class ChartRSI extends React.Component {
    render() {
        var { data, type, width, ratio } = this.props;
        var ema26 = ema()
            .id(0)
            .windowSize(26)
            .merge((d, c) => {d.ema26 = c})
            .accessor(d => d.ema26);

        var ema12 = ema()
            .id(1)
            .windowSize(12)
            .merge((d, c) => {d.ema12 = c})
            .accessor(d => d.ema12);

        var smaVolume50 = sma()
            .id(3)
            .windowSize(10)
            .sourcePath("volume")
            .merge((d, c) => {d.smaVolume50 = c})
            .accessor(d => d.smaVolume50);

        var rsiCalculator = rsi()
            .windowSize(14)
            .merge((d, c) => {d.rsi = c})
            .accessor(d => d.rsi);

        var atr14 = atr()
            .windowSize(14)
            .merge((d, c) => {d.atr14 = c})
            .accessor(d => d.atr14);

        return (
            <ChartCanvas ratio={ratio} width={width} height={300}
                         margin={{left: 70, right: 70, top:20, bottom: 30}} type={type}
                         seriesName="MSFT"
                         zoomEvent={false}
                         panEvent={false}
                         data={data} calculator={[ema26, ema12, smaVolume50, rsiCalculator, atr14]}
                         xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}>
                <Chart id={1}
                       yExtents={rsiCalculator.domain()}
                       height={125} origin={(w, h) => [0, h - 250]} >
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
                    <YAxis axisAt="right" orient="right" ticks={2} tickValues={rsiCalculator.tickValues()}/>
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <RSISeries calculator={rsiCalculator} />

                    <RSITooltip origin={[-38, 15]} calculator={rsiCalculator}/>
                </Chart>
                <Chart id={2}
                       yExtents={atr14.accessor()}
                       height={125} origin={(w, h) => [0, h - 125]} padding={{ top: 10, bottom: 10 }} >
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} />
                    <YAxis axisAt="right" orient="right" ticks={2}/>

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%d/%m %H:%M")}  />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <LineSeries yAccessor={atr14.accessor()} stroke={atr14.stroke()}/>
                    <SingleValueTooltip
                        yAccessor={atr14.accessor()}
                        yLabel={`ATR (${atr14.windowSize()})`}
                        yDisplayFormat={format(".2f")}
                        /* valueStroke={atr14.stroke()} - optional prop */
                        /* labelStroke="#4682B4" - optional prop */
                        origin={[-40, 15]}/>
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
};


ChartRSI.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    ratio: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

ChartRSI.defaultProps = {
    type: "svg",
};
ChartRSI = fitWidth(ChartRSI);

export default ChartRSI;
