import React from 'react';
import { connect } from 'react-redux';
import { fetchCollection } from '../actions';
import Item from '../components/Item';

const mapStateToProps = state => {
  return { collection: state.collection }
}

const mapDispatchToProps = dispatch => {
  return { fetchCollection: () => dispatch(fetchCollection()) }
}

class CollectionContainer extends React.Component {

  state = {
    all: "",
    search: "",
    price: "",
    color: "",
    category: "all",
    collection_page: 0,
    results_page: 0
  }

  componentDidMount() {
    this.props.fetchCollection()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleNext = e => {
    let prevPage = this.state[e.target.name]
    this.setState({ [e.target.name]: prevPage + 1 })
  }

  filterCollection = e => {
    e.preventDefault()
    this.setState(prevState => {
      let all = prevState.all
      let str = prevState.search
      let cat = prevState.category
      let results = this.props.collection.filter(item => {
        if (str === "") {
          return (item.category === cat || item.category2 === cat)
        } else if (cat === 'all') {
          return item.name.toLowerCase().includes(str)
        } else {
          return (item.name.toLowerCase().includes(str) && (item.category === cat || item.category2 === cat))
        }
      })
      return { all: results }
    })
  }

  render() {

    // pagination increments
    let n_items = 15;

    return (
      <div className='container'>
        <h1>Browse the Collection</h1>

        <div>
          <form id='filter' onSubmit={this.filterCollection}>
            <input
              name='search'
              value={this.state.search}
              type='text'
              onChange={this.handleChange}
              placeholder='Search by Keyword'
            />

            <label>Category:
              <select name='category' value={this.state.category} onChange={this.handleChange}>
                <option value="all">All</option>
                <option value="top">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="one piece">One Pieces</option>
                <option value="denim">Denim</option>
                <option value="pants">Pants</option>
                <option value="shorts">Shorts</option>
                <option value="tee">Tees</option>
                <option value="sweater">Sweaters</option>
                <option value="outerwear">Outwear</option>
              </select>
            </label>

            <input className='btn' type='submit' value='Search' />
          </form>
        </div>

        <div className='grid'>
          {this.props.collection && this.state.all == [] &&
            this.props.collection.slice(this.state.collection_page, this.state.collection_page + n_items).map(item =>
              <Item key={item.id} item={item} />
            )
          }

          {this.props.collection && this.props.collection.length > n_items &&
            <button id='next' name='collection_page' onClick={this.handleNext} className='btn overlay'>Next Page</button>
          }

          {this.state.all &&
            this.state.all.slice(this.state.results_page, this.state.results_page + n_items).map(item =>
              <Item key={item.id} item={item} />
            )}

          {this.state.all && this.state.all.length > n_items &&
            <button id='next' name='results_page' onClick={this.handleNext} className='btn overlay'>Next Page</button>
          }
        </div>


      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionContainer)