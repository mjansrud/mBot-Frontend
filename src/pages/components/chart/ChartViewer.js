import React, { Component } from 'react';
import {getChartData} from '../../../utils/api';
import CandleStickChartWithMACDIndicator from './Chart';

import '../../../assets/css/footer.css';
import '../../../assets/css/chart.css';

class ChartViewer extends Component {

    constructor() {
        super()

        this.state = {
            periods: [],
            pair: 'USDT_BTC'
        };
    }

    componentDidMount() {

        this.getPeriods();
        setInterval(() => {
            this.getPeriods();
        }, 120000);

    }

    componentWillReceiveProps(props) {
        if (props.pair !== this.state.pair) {
            this.setState({ pair: props.pair });
            this.getPeriods();
        }
    }

    getPeriods(){
        getChartData(this.state.pair, 300, Math.round(new Date().getTime() / 1000) - (24 * 3600), 9999999999).then(periods=>Object.values(periods)).then((periods) => {
            this.setState({ periods: periods });
        });
    }

    render() {
        let periods = this.state.periods;

        if(periods.length){

            periods.forEach((d, i) => {
                d.date = new Date(periods[i].date);
                d.open = +d.open;
                d.high = +d.high;
                d.low = +d.low;
                d.close = +d.close;
                d.volume = +d.volume;
            });

            return (
                <div className="chart-container center-block">
                    <CandleStickChartWithMACDIndicator type="hybrid" data={periods} />
                </div>
            )
        }

        return (
            <div className="chart-container loading">
                Loading chart ...
            </div>
        )

    }
}



ChartViewer.propTypes = {
    pair: React.PropTypes.string.isRequired
};

export default ChartViewer;