import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart, series, scale, algorithm, annotation, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";

var { CandlestickSeries, BarSeries, LineSeries, AreaSeries, MACDSeries} = series;
var { discontinuousTimeScaleProvider } = scale;

var { Annotate, LabelAnnotation } = annotation;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
var { EdgeIndicator } = coordinates;

var { OHLCTooltip, MovingAverageTooltip, MACDTooltip } = tooltip;

var { XAxis, YAxis } = axes;
var { macd, ema, sma } = indicator;

var algo = algorithm.default;

var { fitWidth } = helper;

class ChartMACD extends React.Component {
    render() {
        var { data, type, width, ratio } = this.props;

        var ema26 = ema()
            .id(0)
            .windowSize(26)
            .merge((d, c) => { d.ema26 = c; })
            .accessor(d => d.ema26);

        var ema12 = ema()
            .id(1)
            .windowSize(12)
            .merge((d, c) => {d.ema12 = c;})
            .accessor(d => d.ema12);

        var macdCalculator = macd()
            .fast(12)
            .slow(26)
            .signal(9)
            .merge((d, c) => {d.macd = c;})
            .accessor(d => d.macd);

        var smaVolume50 = sma()
            .id(3)
            .windowSize(10)
            .sourcePath("volume")
            .merge((d, c) => {d.smaVolume50 = c;})
            .accessor(d => d.smaVolume50);

        var buySell = algo()
            .windowSize(2)
            .accumulator(([prev, now]) => {
                let buy = false;
                let sell = false;
                now.trades.forEach((trade, i) => {
                    if (trade.date > prev.date && trade.date <= now.date){
                        if(trade.type === 'buy') buy = true;
                        if(trade.type === 'sell') sell = true;
                    }
                });
                if(buy){
                    return "BUY";
                }else if(sell){
                    return "SELL";
                }

            })
            .merge((d, c) => {d.longShort = c})

        var defaultAnnotationProps = {
            fontFamily: "Glyphicons Halflings",
            fontSize: 20,
            opacity: 0.8,
            onClick: console.log.bind(console),
        }

        var buyAnnotationProps = {
            ...defaultAnnotationProps,
            fill: "#006517",
            text: "\ue093",
            y: ({ yScale, datum }) => yScale(datum.low) + 20,
            tooltip: "Buy",
        };

        var sellAnnotationProps = {
            ...defaultAnnotationProps,
            fill: "#E20000",
            text: "\ue094",
            y: ({ yScale, datum }) => yScale(datum.high) - 20,
            tooltip: "Sell",
        };


        return (
            <ChartCanvas ratio={ratio} width={width} height={600}
                         margin={{ left: 70, right: 70, top: 20, bottom: 30 }} type={type}
                         seriesName="MSFT"
                         zoomEvent={false}
                         panEvent={false}
                         data={data}
                         calculator={[ema26, ema12, smaVolume50, macdCalculator, buySell]}
                         xAccessor={d => d.date}
                         xScaleProvider={discontinuousTimeScaleProvider}>
                <Chart id={1} height={400}
                       yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
                       padding={{ top: 10, bottom: 20 }}>
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
                    <YAxis axisAt="right" orient="right" ticks={5} />

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <CandlestickSeries />
                    <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>
                    <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>

                    <CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
                    <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

                    <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                                   yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

                    <OHLCTooltip origin={[-40, 0]}/>
                    <MovingAverageTooltip onClick={(e) => console.log(e)} origin={[-38, 15]}
                                          calculators={[ema26, ema12]}/>

                    <Annotate with={LabelAnnotation} when={d => d.longShort === "BUY"}
                              usingProps={buyAnnotationProps} />
                    <Annotate with={LabelAnnotation} when={d => d.longShort === "SELL"}
                              usingProps={sellAnnotationProps} />

                </Chart>
                <Chart id={3} height={150}
                       yExtents={[d => d.volume, smaVolume50.accessor()]}
                       origin={(w, h) => [0, h - 300]}>
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.volume} fill="#d7d7d7" />
                    <AreaSeries yAccessor={smaVolume50.accessor()} stroke="#8ef4ab" fill="#a5ffbe"/>
                </Chart>
                <Chart id={4} height={150}
                       yExtents={macdCalculator.accessor()}
                       origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }} >
                    <XAxis axisAt="bottom" orient="bottom"/>
                    <YAxis axisAt="right" orient="right" ticks={2} />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%m/%d %H:%M")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <MACDSeries calculator={macdCalculator} />
                    <MACDTooltip origin={[-38, 15]} calculator={macdCalculator}/>
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
};

ChartMACD.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    ratio: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

ChartMACD.defaultProps = {
    type: "svg",
};


ChartMACD = fitWidth(ChartMACD);

export default ChartMACD;