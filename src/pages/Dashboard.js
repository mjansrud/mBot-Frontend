import React, {Component} from 'react';
import {Grid, Row, Col} from "react-bootstrap";
import Nav from './components/Nav';
import Footer from './components/Footer';
import ChartPairs from './components/chart/ChartPairs'
import Trades from './components/Trades'
import ChartViewer from "./components/chart/ChartViewer";
import Header from "./components/Header";
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
                <Nav />
                <Header title={pair} />
                <Grid className="grid" fluid={fluid}>
                    <Row className="show-grid">
                        <Col sm={8} md={8}>
                            <ChartViewer pair={pair}/>
                            <Trades pair={pair} onClick={this.changeHandler}/>
                        </Col>
                        <Col sm={4} md={4}>
                            <ChartPairs pair={pair} onClick={this.changeHandler}/>
                        </Col>
                    </Row>
                </Grid>
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
