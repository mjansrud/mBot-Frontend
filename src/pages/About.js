import React, {Component} from 'react';
import Nav from './components/parts/Nav';
import Footer from './components/parts/Footer';
import Header from "./components/parts/Header";
import '../assets/css/app.css';
import '../assets/css/frontpage.css';
import 'moment/locale/nb';

class Dashboard extends Component {

    render() {

        return (
            <div className="page">
                <Nav />
                <Header title="About" />
                <Footer/>
            </div>
        );
    }
}

export default Dashboard;
