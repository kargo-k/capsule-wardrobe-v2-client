import React from 'react';

const CapsuleListItem = props => {
  console.log('capsule list item', props)
  return (
    <h4>capsule title here: {props.capsule.title}</h4>
  )
}

export default CapsuleListItem