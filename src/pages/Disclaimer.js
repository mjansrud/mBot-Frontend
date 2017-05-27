import React, {Component} from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Header from "./components/Header";
import '../assets/css/app.css';
import '../assets/css/frontpage.css';
import 'moment/locale/nb';

class Dashboard extends Component {

    render() {

        return (
            <div className="page">
                <Nav />
                <Header title="Disclaimer" />
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
