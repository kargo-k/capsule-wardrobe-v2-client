import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addItem, fetchCapsules } from '../actions';

const mapStateToProps = state => {
  return {
    item: state.show_item,
    capsules_list: state.capsules_list,
    active_capsule: state.active_capsule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (payload) => dispatch(addItem(payload)),
    fetchCapsules: () => dispatch(fetchCapsules())
  }
}

const ShowItem = ({ item, capsules_list, addItem, active_capsule }) => {

  let style

  const handleSubmit = e => {
    e.preventDefault()
    let payload = {
      capsule_id: e.target.capsule.value,
      item_id: item.id
    }
    addItem(payload)
  }

  if (!item) {
    return <Redirect to='/explore' />
  } else {
    style = { display: 'none' }
    return (
      <div id='item-details'>
        <h1>{item.name}</h1>

        <img src={item.image} alt={item.name} />
        <div className='text'>Brand: {item.brand}</div>
        <div className='text'>Price: {item.price}</div>

        {/* <div><a target='_blank' className='btn' href={`https://${item.shop_link}`}>Purchase</a></div> */}

        <form onSubmit={handleSubmit} id='show-item-form'>

          {/* active capsule is the default selected capsule */}
          <select name='capsule' defaultValue={active_capsule.id}>
            {capsules_list.map(capsule => <option key={capsule.id} value={capsule.id} >{capsule.title}</option>)}
          </select>

          <label><input
            className='btn'
            name="submit"
            type="submit"
            value="Add to Capsule" /></label>

        </form>

        <div className='added-message' style={style}>Added Item!</div>

      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem)