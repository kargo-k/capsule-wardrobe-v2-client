import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';

const mapStateToProps = state => {
  return { items: state.active_capsule.items }
}

class Outfit extends React.Component {

  render() {
    let ootd = this.pickOutfit()
    return (
      <React.Fragment>
        <h1>#OOTD</h1>
        <div className='container' id='ootd-div'>
          {ootd.map(item => <Item key={item.id} item={item} />)}
        </div>
      </React.Fragment>
    )
  }

  pickOutfit() {

    let ootd, ootd_date
    ootd = JSON.parse(localStorage.getItem('ootd'))

    if (ootd) {
      // if the ootd is stored in local storage, get the date it was stored
      ootd_date = ootd.pop()
    }

    if (ootd && ootd_date < new Date()) {
      // if the ootd is stored in local storage and the date is less than today picks a new outfit based on weather forecast each day
      let one_piece_outfits = this.props.items.filter(i => i.category2 === 'one piece')
      let bottoms = this.props.items.filter(i => i.category2 === 'bottoms')
      let tops = this.props.items.filter(i => i.category2 === 'top')
      let n_two_piece_outfits = bottoms.length * tops.length
      let sweaters = this.props.items.filter(i => i.category === 'sweater')
      let outerwear = this.props.items.filter(i => i.category2 === 'outerwear')
      let total_outfits = one_piece_outfits.length + n_two_piece_outfits
      ootd = []

      // choose an outfit randomly based on the number of outfits
      let rand = Math.random()
      if (one_piece_outfits !== [] && rand <= one_piece_outfits.length / total_outfits) {
        // choose a one piece outfit
        ootd.push(one_piece_outfits[Math.floor(Math.random() * one_piece_outfits.length)])
      } else {
        // choose a two piece outfit

        if (this.props.hi < 60) {
          // if the weather is cold (below 60F), do not recommend shorts or skirt and add a sweater/outerwear
          let cold_layers = sweaters + outerwear

          cold_layers !== [] && ootd.push(cold_layers[Math.floor(Math.random() * cold_layers.length)])

          bottoms = bottoms.filter(i => i.category !== 'shorts')
        }

        ootd.push(tops[Math.floor(Math.random() * tops.length)])
        ootd.push(bottoms[Math.floor(Math.random() * bottoms.length)])
      }

      // if the probability of rain is greater than 60%, suggest a rain item if the user has one
      if (this.props.precip > .6) {
        let rain_gear = this.props.items.filter(i => i.name.includes('rain'))
        if (rain_gear !== []) {
          ootd.push(rain_gear[Math.floor(Math.random() * rain_gear.length)])
        }
      }

      // store the ootd in local storage for 24 hours
      let today = new Date()
      today.setHours(today.getHours() + 24)
      ootd.push(today);
      try {
        localStorage.setItem('ootd', JSON.stringify(ootd))
      }
      catch (e) { console.log(e) }

      return ootd
    } else {
      // returns the stored ootd from local storage if the date is current
      return ootd
    }
  }

}

export default connect(mapStateToProps)(Outfit);