import React, { Component } from 'react';
import Axios from 'axios';
import BeerDeets from './BeerDeets';
// import { Redirect } from 'react-router';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      beer: {},
      search: ""
    }
  }

  handleChange(e) {
    this.setState({search: e.target.value});
  };

  handleSubmit(e) {
    console.log(this.state.beer);
    e.preventDefault();
    Axios.get(`https://api.punkapi.com/v2/beers?beer_name=${this.state.search}`)
    .then(response =>{
      console.log('response below');
      console.log(response.data[0].name);
      // console.log(response.data.Title);
      this.setState({
        beer: this.beerData(response.data[0])
      });
    })
    .catch(function (error) {
      console.log(error);
    })
}


   beerData(beerDatas){
    const beer = {};
    beer.Name = beerDatas.Name;
    beer.Image_url = beerDatas.Image_url;
    beer.ABV = beerDatas.ABV;
    beer.IBU = beerDatas.IBU;
    beer.Description = beerDatas.Description;
    beer.Tagline = beerDatas.Tagline;

    return beer;
  }

  saveBeer(){
    Axios.post("http://localhost:8080/", this.state.beer)
    // thanks Sabrina for pointing out this cool redirect
      .then(response => this.props.history.push("/"))
      .catch(response => alert("Couldn't save beer"));
  }

  showBeer(){
    if(this.state.beer){
      return (
        <BeerDeets beer={this.state.beer} saveBeer={this.saveBeer.bind(this)} />
      )
    }
  }


  render() {
     console.log(this.state.beer);
     console.log(this.state.search);
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
           Name:
          <input type="text"
           value={this.state.search}
           onChange={this.handleChange.bind(this)}/>
        </label>
        <input type="submit" value="Submit"/>
        {this.showBeer()}
      </form>
    );
  }
}

export default Search;