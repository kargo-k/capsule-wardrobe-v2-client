import React from 'react';

const Browse = props => {
  return (
    <div id='browse'>
      <h1>Browse the Curated Collection</h1>
      <form id='filter'>
        <input
          name='search'
          type='text'
          placeholder='Search by Keyword'
          value={props.search}
          onChange={props.onChange}
        />

        <select
          name='category'
          value={props.sel}
          onChange={props.onSelect}
        >
          <option value="">Search by Category</option>
          <option value="bottoms">Bottoms</option>
          <option value="denim">Denim</option>
          <option value="one piece">One Pieces</option>
          <option value="outerwear">Outwear</option>
          <option value="pants">Pants</option>
          <option value="shorts">Skirts/Shorts</option>
          <option value="sweater">Sweaters</option>
          <option value="tee">Tees</option>
          <option value="top">Tops</option>
        </select>

        <button className='btn' id='reset' onClick={props.onReset}>Reset</button>


        <label id='n_item'>Results:
        <select
            id='n_item'
            name='n_item'
            value={props.n_item}
            onChange={props.nItemSelect}
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="80">80</option>
          </select>
        </label>
        <button className='btn page' id='back'>{`<<`}</button>
        <button className='btn page' id='next'>{`>>`}</button>

      </form>
    </div>
  )
}

export default Browse;

// class Browse extends React.Component {

//   state = {
//     all: [],
//     search: "",
//     price: "",
//     color: "",
//     category: "all",
//     collection_page: 0,
//     results_page: 0,
//     showCollection: true
//   }

//   componentDidMount() {
//     this.props.fetchCollection()
//   }

//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value })
//   }

//   handleNext = e => {
//     let prevPage = this.state[e.target.name]
//     this.setState({ [e.target.name]: prevPage + 1 })
//   }

//   filterCollection = e => {
//     e.preventDefault()
//     this.setState(prevState => {
//       let str = prevState.search
//       let cat = prevState.category
//       let results = this.props.collection.filter(item => {
//         if (str === "" && cat === 'all') {
//           return this.props.collection
//         } else if (str === "") {
//           return (item.category === cat || item.category2 === cat)
//         } else if (cat === 'all') {
//           return item.name.toLowerCase().includes(str)
//         } else {
//           return (item.name.toLowerCase().includes(str) && (item.category === cat || item.category2 === cat))
//         }
//       })
//       return { all: results, showCollection: false }
//     })
//   }

//   render() {

//     // pagination increments
//     let n_items = 16;

//     let initialState = {
//       search: "",
//       price: "",
//       color: "",
//       category: "all",
//       collection_page: 0,
//       results_page: 0,
//       showCollection: true
//     }

//     const reset = () => {
//       this.setState({ ...initialState })
//     }

//     return (
//       <div id='browse'>
//         <h1>Browse the Collection</h1>

//         <div>
//           <form id='filter' onSubmit={this.filterCollection}>
//             <input
//               name='search'
//               value={this.state.search}
//               type='text'
//               onChange={this.handleChange}
//               placeholder='Search by Keyword'
//             />



//             <input className='btn' type='submit' value='Search' />
//             <button className='btn' id='reset' onClick={reset}>Reset</button>
//           </form>
//         </div>
//         </div>
//         )
//       }
//     }

// export default connect(mapStateToProps, mapDispatchToProps)(Browse)