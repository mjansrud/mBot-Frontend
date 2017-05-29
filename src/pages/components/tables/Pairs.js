import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {getTickerData} from '../../../utils/api';
import PairsTab from './PairsTab';

import '../../../assets/css/footer.css';
import '../../../assets/css/table.css';

class ChartPairs extends Component {

    interval;

    constructor() {
        super()

        this.state = {
            tickers: []
        };

    }

    componentDidMount() {
        this.getTicker();
        this.interval = setInterval(() => {
            this.getTicker();
        }, 60000);
    }

    getTicker(){
        getTickerData().then((tickers) => {
            this.setState({ tickers: tickers });
        });
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {

        let tickers = this.state.tickers;
        let selectedName = this.props.pair.split("_").pop();
        let btcTickers = [];
        let ethTickers = [];
        let xmrTickers = [];
        let usdtTickers = [];

        Object.entries(tickers).map((entries) => {

            var ticker = entries[1];
            ticker.pair = entries[0];
            ticker.price = parseFloat(ticker.last).toFixed(3);
            ticker.change = parseFloat(ticker.percentChange).toFixed(2);
            ticker.prepair = ticker.pair.substring(0, ticker.pair.indexOf("_"));
            ticker.name = ticker.pair.split("_").pop();

            switch(ticker.prepair){
                case "USDT":
                    usdtTickers.push(ticker);
                    break;
                case "BTC":
                    btcTickers.push(ticker);
                    break;
                case "ETH":
                    ethTickers.push(ticker);
                    break;
                case "XMR":
                    xmrTickers.push(ticker);
                    break;
                default:
                        break;

            }

            return false;
        });

        return (
            <div>
                <Tabs defaultActiveKey={4} animation={false} id="ticksTabs">
                    <Tab eventKey={1} title="BTC" tabClassName="tickers-tab">
                        <PairsTab data={btcTickers} selected={selectedName} onClick={this.props.onClick}/>
                    </Tab>
                    <Tab eventKey={2} title="ETH" tabClassName="tickers-tab">
                        <PairsTab data={ethTickers} selected={selectedName} onClick={this.props.onClick}/>
                    </Tab>
                    <Tab eventKey={3} title="XMR" tabClassName="tickers-tab">
                        <PairsTab data={xmrTickers} selected={selectedName} onClick={this.props.onClick}/>
                    </Tab>
                    <Tab eventKey={4} title="USDT" tabClassName="tickers-tab">
                        <PairsTab data={ethTickers} selected={selectedName} onClick={this.props.onClick}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }

}

ChartPairs.propTypes = {
    pair: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};


export default ChartPairs;