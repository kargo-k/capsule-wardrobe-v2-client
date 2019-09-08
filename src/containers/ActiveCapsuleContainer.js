import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Weather from '../components/Weather';
import { connect } from 'react-redux';
import ItemsContainer from './ItemsContainer';
import Outfit from '../components/Outfit';
import { WEATHER } from '../constants/api-url';
import { updateItem } from '../actions';

const mapStateToProps = state => {
  return {
    active_capsule: state.active_capsule,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return { updateItem: payload => dispatch(updateItem(payload)) }
}

class ActiveCapsuleContainer extends React.Component {

  location = localStorage.getItem('location')

  state = {
    fetchComplete: false
  }

  // const LOCATION_ENDPOINT = `/location/${location}`;
  // const WEATHER_ENDPOINT = `/weather?loc=${latitude}_${longitude}`;

  componentDidMount() {
    if (this.props.username) {
      fetch(WEATHER + `/location/${this.location}`)
        .then(res => res.json())
        .then(json => {
          let lat_lng = json.results[0].geometry.location;
          fetch(WEATHER + `/weather?loc=${lat_lng.lat}_${lat_lng.lng}`)
            .then(res => res.json())
            .then(json => {
              let current = json.currently
              let summary = json.hourly.summary
              let morning = json.hourly.data[8]
              let noon = json.hourly.data[12]
              let evening = json.hourly.data[17]
              let night = json.hourly.data[21]
              let day = json.daily.data[0]
              this.setState({
                current: current,
                summary: summary,
                day: day,
                morning: morning,
                noon: noon,
                evening: evening,
                night: night,
                fetchComplete: true
              })
            })
        })
    }
  }

  render() {
    if (this.state.fetchComplete && this.props.active_capsule) {
      return (
        <div className='container' id='active-container' >
          <div id='active-left' className='flex'>
            <Weather data={this.state} />
            <Outfit
              hi={this.state.day.apparentTemperatureHigh}
              lo={this.state.day.apparentTemperatureLow}
              precip={this.state.current.precipProbability} />
          </div>
          <div id='active-right' className='flex'>
            <h1>{this.props.active_capsule.title}</h1>
            <ItemsContainer updateItem={this.props.updateItem} />
          </div>
        </div>
      )
    } else if (this.props.user.username) {
      console.log('inside active capsule', this.props);
      return (
        <div className='container'>
          <h3>Welcome back, {this.props.user.username}</h3>
          <p>Looks like you don't have an active capsule. Activate an existing capsule, or <Link to='/new'>curate a new one!</Link></p>
        </div>
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCapsuleContainer);