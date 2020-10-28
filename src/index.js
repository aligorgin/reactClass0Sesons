import React from "react";
import ReactDOM from 'react-dom';
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
    state = {lat: null, errorMessage: '', time: new Date().toLocaleTimeString()};

    componentDidMount() {
        setInterval(() => {
            this.setState({time: new Date().toLocaleTimeString()})
        }, 1000);
        window.navigator.geolocation.getCurrentPosition(
            // when we update one of them , state system dont touch other one that's all
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error : {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return (
                <SeasonDisplay lat={this.state.lat}/>
            );
        }
        return <Spinner message='please allow us to access your location'/>
    }

    // React says we have to define render!
    render() {
        return (
            <div className='border red'>
                <div>{this.renderContent()}</div>
                <div>time is : {this.state.time}</div>
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.querySelector('#root'));