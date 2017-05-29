import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {getTickerData} from '../../../utils/api';

import '../../../assets/css/footer.css';
import '../../../assets/css/table.css';

class ChartPairs extends Component {

    interval;

    constructor() {
        super()

        this.state = {
            tickers: []
        };

        this.options = {
            defaultSortName: 'name',
            defaultSortOrder: 'asc',
            expandRowBgColor: 'white'
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

    onRowSelect(row) {
        this.props.onClick(row.selector);
    }

    isExpandableRow(row) {
        return true;
    }

    expandComponent(row) {

        if(row.options){

            let expandData = [];

            Object.keys(row.options).map((key, value) => {
                let object = [];
                object["name"] = key;
                object["value"] = row.options[key];
                expandData.push(object)
                return false;
            });

            const cellEditProp = {
                mode: 'click'
            };

            return (
                <div className="tickers-table-tr">
                    <div className="tickers-table-tr-header">
                        Click to edit
                    </div>
                    <BootstrapTable
                        data={expandData}
                        trClassName='tickers-table-tr'
                        striped={true}
                        hover={true}
                        cellEdit={ cellEditProp }
                    >
                        <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="value">Value</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            );
        }

    }

    expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = '';

        if (isExpandableRow) {
            content = (isExpanded ? '(-)' : '(+)' );
        } else {
            content = ' ';
        }
        return (
            <div> { content } </div>
        );
    }


    render() {

        let session = this;
        let tickers = this.state.tickers;
        let selectedName = session.props.pair.split("_").pop();
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

        let selectRowProp = {
            mode: 'radio',
            bgColor: '#ffccc6',
            onSelect: function(row) {
                session.props.onClick(row.pair);
            },

            clickToExpand:true,
            selected:[selectedName]
        };

        return (
            <div>
                <Tabs defaultActiveKey={4} animation={false} id="ticksTabs">
                    <Tab eventKey={1} title="BTC" tabClassName="tickers-tab">
                        <BootstrapTable
                            data={btcTickers}
                            options={ this.options }
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            trClassName='tickers-table-tr'
                            tableContainerClass='tickers-table-body'
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent
                            } }
                            striped={true}
                            hover={true}
                            selectRow={ selectRowProp }
                            pagination
                        >
                            <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                            <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                        </BootstrapTable>
                    </Tab>
                    <Tab eventKey={2} title="ETH" tabClassName="tickers-tab">
                        <BootstrapTable
                            data={ethTickers}
                            options={ this.options }
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            trClassName='tickers-table-tr'
                            tableContainerClass='tickers-table-body'
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent
                            } }
                            striped={true}
                            hover={true}
                            selectRow={ selectRowProp }
                            pagination
                        >
                            <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                            <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                        </BootstrapTable>
                    </Tab>
                    <Tab eventKey={3} title="XMR" tabClassName="tickers-tab">
                        <BootstrapTable
                            data={xmrTickers}
                            options={ this.options }
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            trClassName='tickers-table-tr'
                            tableContainerClass='tickers-table-body'
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent
                            } }
                            striped={true}
                            hover={true}
                            selectRow={ selectRowProp }
                            pagination
                        >
                            <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                            <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                        </BootstrapTable>
                    </Tab>
                    <Tab eventKey={4} title="USDT" tabClassName="tickers-tab">
                        <BootstrapTable
                            data={usdtTickers}
                            options={ this.options }
                            expandableRow={ this.isExpandableRow }
                            expandComponent={ this.expandComponent }
                            trClassName='tickers-table-tr'
                            tableContainerClass='tickers-table-body'
                            expandColumnOptions={ {
                                expandColumnVisible: true,
                                expandColumnComponent: this.expandColumnComponent
                            } }
                            striped={true}
                            hover={true}
                            selectRow={ selectRowProp }
                            pagination
                        >
                            <TableHeaderColumn dataField="name" dataSort={true} isKey={true}>Pair</TableHeaderColumn>
                            <TableHeaderColumn dataField="change" dataSort={true} >Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="price" dataSort={true} >Price</TableHeaderColumn>
                        </BootstrapTable>
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