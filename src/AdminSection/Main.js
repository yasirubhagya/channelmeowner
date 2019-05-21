import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from '../Layout/DashBoard';
import Doctors from './Doctors/Doctors';
import ConsultantType from './ConsultantType/ConsultantType';
import Channels from './Channels/Channels';
import City from './City/City';
import CcRegistration from './ChannelCenters/CcRegistration';
import Logout from '../Auth/Logout';
import DoctorsOfChannelCenter from './DoctorsOfChannelCenter/DoctorsOfChannelCenter';



class App extends Component {



    render() {
        return (

            <DashBoard>
                <Switch>
                    <Route path="/" exact component={null} />
                    <Route path="/Reports" exact component={null} />
                    <Route path="/CcRegistration" exact component={CcRegistration} />
                    <Route path="/Doctors" component={Doctors} />
                    <Route path="/ConsultantType" component={ConsultantType} />
                    <Route path="/City" component={City} />
                    <Route path="/Channels" component={Channels} />
                    <Route path="/Profile" component={null} />
                    <Route path="/Logout" exact render={(routeProps) => (
                        <Logout {...routeProps} setUserHandle={this.props.setUserHandle} />
                    )} />
                </Switch>
            </DashBoard>

        );
    }
}

export default App;
