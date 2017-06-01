import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import Navigation from './components/parts/Navigation';
import Footer from './components/parts/Footer';
import ChartPairs from './components/tables/Pairs'
import Trades from './components/tables/Trades'
import Bots from './components/tables/Bots'
import Balances from './components/tables/Balances'
import ChartViewer from "./components/chart/ChartViewer";
import Header from "./components/parts/Header";
import '../assets/css/app.css';
import '../assets/css/dashboard.css';
import 'moment/locale/nb';

class Dashboard extends Component {

    constructor() {
        super()

        this.state = {
            pair: 'USDT_BTC'
        };

        this.changeHandler = this.changeHandler.bind(this);

    }

    changeHandler(selector) {
        this.setState({ pair: selector })
    }
    
    render() {

        let fluid = true;
        let pair = this.state.pair;

        return (
            <div className="page">
                <Navigation />
                <Header title={pair} />
                <Grid className="grid" fluid={fluid}>
                    <Row className="show-grid">
                        <Col sm={8} md={8}>
                            <ChartViewer pair={pair}/>
                            <Trades pair={pair} onClick={this.changeHandler}/>
                        </Col>
                        <Col sm={4} md={4}>
                            <ChartPairs pair={pair} onClick={this.changeHandler}/>
                            <Balances/>
                            <Bots pair={pair}/>
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
