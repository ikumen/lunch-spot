import React from "react";

class SpotDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const spot = this.props.spot;
    return (
        <div className="card" id="result-card">
            {/* <div class="card-header">
                <h1>Lunch Sp<svg width="50" height="50"><circle cx="25" cy="25" r="20" fill="white" stroke="#507983" stroke-width="4"/></svg>ts
                </h1>
            </div> */}
            {/* style="width: 18rem;" */}
            <div className="card-body" id="result-body">
                {spot && 
                <div className="card" >
                    <img className="card-img-top" src={spot.image_url}/>
                    <div className="card-body">
                        {spot.name}
                        <a className="btn" href={spot.url} target="_new">GO</a>
                    </div>
                </div>
                }
            </div>
        </div>
    );    
  }
}

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.prepareFindSpot = this.prepareFindSpot.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.state = {
      category: '',
      price: '1',
      categoryOptions: [],
    }
  }

  async getCategories() {
    let resp = await fetch('/api/categories');
    return await resp.json();
  }

  prepareFindSpot(event) {
    event.preventDefault();
    this.props.onFindSpot({
      category: this.state.category,
      price: this.state.price,
      radius: 805,
      lat: 34.049001,
      lon: -118.258732
    })
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  componentDidMount() {
    this.getCategories().then(categories => {
      this.setState({
        categoryOptions: categories.map((c,i) =>
          <option key={i} value={c.k}>{c.v}</option>),
        category: categories[0].k // set default
      });
    });
  }

  render() {
    return (
        <div id="form">
            Choose Options
            <form onSubmit={this.prepareFindSpot}>
                <select value={this.state.category} onChange={this.handleCategoryChange}>{this.state.categoryOptions}</select>        
                <select value={this.state.price} onChange={this.handlePriceChange}>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                </select>
                <button type="submit" className="btn">Go</button>
            </form>
        </div>
    );
  }
}

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.onFindSpot = this.onFindSpot.bind(this);
      this.state = {
        spot: undefined
      }
    }
  
    onFindSpot(params) {
      //console.log(params)
      this.findSpot(params).then(spot => {
          this.setState({spot: spot})
      });
    }
  
    async findSpot(params) {
      let resp = await fetch('/api/spot', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      return await resp.json();
    }
  
    render() {
      return <div>
        <SearchComponent onFindSpot={this.onFindSpot} />
        <hr/>
        <SpotDetail spot={this.state.spot} />
      </div>
    }
  }
  
