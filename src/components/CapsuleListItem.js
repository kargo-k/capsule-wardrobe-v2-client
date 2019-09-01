import React from 'react';
import { connect } from 'react-redux';
import { showCapsule } from '../actions';

const mapDispatchToProps = dispatch => {
  return { show_capsule: (capsule) => dispatch(showCapsule(capsule)) }
}

const CapsuleListItem = props => {
  console.log('inside capsuel list item', props)
  return (
    <div className="capsule-list-item" onClick={() => props.show_capsule(props.capsule)}>
      <h4>{props.capsule.title}</h4>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(CapsuleListItem)