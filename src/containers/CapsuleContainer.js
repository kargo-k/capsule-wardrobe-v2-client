import React from 'react';
import { connect } from 'react-redux';
import Item from '../components/Item';

const mapStateToProps = state => {
  return { show_capsule: state.show_capsule }
}

const CapsuleContainer = ({ show_capsule }) => {
  console.log('this is in the capsule container')

  if (show_capsule) {
    return (
      <div id='grid-parent' className='capsule container'>
        <h2>Current Capsule: {show_capsule.title}</h2>
        <h4>(Number of Items) {show_capsule.items.length}</h4>
        {show_capsule.items.map(item => <Item key={item.id} item={item} />)}
      </div>
    )
  } else {
    return null
  }
}

export default connect(mapStateToProps)(CapsuleContainer)