import React from 'react';
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onPickExercise = this.onPickExercise.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.discardExercise = this.discardExercise.bind(this);
    this.onGetExerciseDetails = this.onGetExerciseDetails.bind(this)


    this.onChangeFood = this.onChangeFood.bind(this);
    this.onPickSuggestion = this.onPickSuggestion.bind(this);
    this.onPickUserFood = this.onPickUserFood.bind(this);
    this.addFood = this.addFood.bind(this);
    this.discardFood = this.discardFood.bind(this);

    if(localStorage.getItem('loggedIn')==="true"){
      this.state = {
        exercise:' ',
        food:' ',
        food_details:'',
        exercise_details:'',
        food_options:' ',
        exercise_options:' ',
        exercise_list:[],
        food_description:<p>Add Foods and we'll tell you how many calories you're consuming.</p>,
        foods_list:[],
        exercise_description:<p>Add Exercises and we'll tell you how many calories you're burning.</p>,
        caloric_balance:0,
        loggedIn:true
      }


      var user = {}
      user["email"] = localStorage.getItem('email')
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body:  JSON.stringify(user)
      };

      fetch('/food/dailyIntake', requestOptions).then(res => res.json())
    .then(res => 
      {
        this.state.foods_list = res

      }
      )
    .catch(error=>{console.error(error)})

    fetch('/exercise/dailyExercises', requestOptions).then(res => res.json)
    .then(res => 
      {
        this.state.exercise_list = res

      }
      )
    .catch(error=>{console.error(error)})

    }
    else{
      this.state = {
        exercise:' ',
        food:' ',
        food_options:' ',
        exercise_options:' ',
        exercise_list:[],
        food_description:<p>Add Foods and we'll tell you how many calories you're consuming.</p>,
        foods_list:[],
        exercise_description:<p>Add Exercises and we'll tell you how many calories you're burning.</p>,
        caloric_balance:0,
        loggedIn:false
      }

    }
  }


  
  onChangeExercise(e){
    this.setState({exercise: e.target.value})

    //const requestOptions = {
    //  method: 'POST',
    //  headers: { 'Content-Type' : 'application/json'},
    //  body:  JSON.stringify(e.target.value)
    //};
//
    //fetch('/exercise', requestOptions)
    //.then(res => res.json())
    //.then(res => console.log(res))
    //.catch(error=>{console.error(error)})
  }

  onPickExercise(){
    var item = this.state.exercise;
    //document.getElementById('food_search').innerHTML= item

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body:  JSON.stringify(item)
    };

    var item_description = '';
    fetch('/exercise', requestOptions)
  .then(res => res.json())
  .then(res => 
    {
      //console.log(res);
        item_description = 
        <div className="food-info">
            <img src={res["photo"]["thumb"]} alt=""></img>
            <span id='exercise-name' val={res["name"]}>Name: {res["name"]}</span>
            <span>Duration: {res["duration_min"]} m</span>
            <span id='exercise-calories' val={res["nf_calories"]}>Calories: {res["nf_calories"]} cal</span>
            <div className="exercise-buttons">
              <button onClick={this.addExercise}><FontAwesomeIcon className="icon" icon={faCheck}/></button>
              <button onClick={this.discardExercise}><FontAwesomeIcon className="icon" icon={faTimes}/></button>
            </div>
        </div>

      this.setState({exercise_description: item_description})
      this.setState({exercise_details:res})

    }
    )
  .catch(error=>{console.error(error)})

  }

  addFood(){
      var updated_foods_list = [...this.state.foods_list]
      updated_foods_list.push(
        <tr className="food-row" name={document.getElementById('food-name').getAttribute('val')} onClick={this.onPickSuggestion}>
          <td>
            {document.getElementById('food-name').getAttribute('val')}
          </td>
          <td>
            {document.getElementById('food-calories').getAttribute('val')}
          </td>
        </tr>
      )
      var balance = this.state.caloric_balance
      balance +=  parseFloat(document.getElementById('food-calories').getAttribute('val'))
      this.setState({caloric_balance: balance})
      this.setState({foods_list:updated_foods_list})

      if(this.state.loggedIn === true){

        var user = {}
        user["email"] = localStorage.getItem('email');
        user["foods"]=[this.state.food_details]
  
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body:  JSON.stringify(user)
        };
    
        fetch('/food/add', requestOptions)
        .then(res => 
          {
              console.log(res.statusText)
          }
          )
        .catch(error=>{console.error(error)})
  
      }
  }

  addExercise(){
    var updated_exercise_list = [...this.state.exercise_list]
    updated_exercise_list.push(
      <tr className="exercise-row" name={document.getElementById('exercise-name').getAttribute('val')} onClick={this.onGetExerciseDetails}>
        <td>
          {document.getElementById('exercise-name').getAttribute('val')}
        </td>
        <td>
          {document.getElementById('exercise-calories').getAttribute('val')}
        </td>
      </tr>
    )
    var balance = this.state.caloric_balance
    balance -= parseFloat(document.getElementById('exercise-calories').getAttribute('val'))
    this.setState({caloric_balance:balance})
    this.setState({exercise_list:updated_exercise_list})
    
    if(this.state.loggedIn === true){

      var user = {}
      user["email"] = localStorage.getItem('email');
      user["exercises"]=[this.state.exercise_details]

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body:  JSON.stringify(user)
      };
  
      fetch('/exercise/add', requestOptions)
      .then(res => 
        {
            console.log(res.statusText)
        }
        )
      .catch(error=>{console.error(error)})

    }
  }

  discardExercise(){
    var defaultVal = <p>Add Exercises and we'll tell you how many calories you're burning.</p>
    this.setState({exercise_description:defaultVal})
  }

  discardFood(){
    var defaultVal = <p>Add Foods and we'll tell you how many calories you're consuming.</p>
    this.setState({food_description:defaultVal})
    console.log(this.state.foods_list)
  }

  onChangeFood(e){
    this.setState({food: e.target.value});

    if(e.target.value.length===0){
      document.getElementById('food-suggestions').style.display='none'
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body:  JSON.stringify(e.target.value)
    };

    
    var food_options = [];

    fetch('/food', requestOptions)
    .then(res => res.json())
    .then(res => 
      {

        //console.log(res);
        for(const item of res){
          //console.log(item["food_name"]);
          food_options.push(<span className='suggestion' name={item["food_name"]} onClick={this.onPickSuggestion}>{item["food_name"]}</span>)
        }
        console.log(food_options)
        this.setState({food_options: food_options})
        document.getElementById('food-suggestions').style.display='flex'

      }
      )
    .catch(error=>{console.error(error)})
  }

  onGetExerciseDetails(e){
    var item = e.target.getAttribute('name')
    console.log(item)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body:  JSON.stringify(item)
    };

    var item_description = '';
    fetch('/exercise', requestOptions)
  .then(res => res.json())
  .then(res => 
    {
      
      //console.log(res);
        item_description = 
        <div className="food-info">
            <img src={res["photo"]["thumb"]} alt=""></img>
            <span id='exercise-name' val={res["name"]}>Name: {res["name"]}</span>
            <span>Duration: {res["duration_min"]} m</span>
            <span id='exercise-calories' val={res["nf_calories"]}>Calories: {res["nf_calories"]} cal</span>
            <div className="exercise-buttons">
              <button onClick={this.addExercise}><FontAwesomeIcon className="icon" icon={faCheck}/></button>
              <button onClick={this.discardExercise}><FontAwesomeIcon className="icon" icon={faTimes}/></button>
            </div>
        </div>

      this.setState({exercise_description: item_description})
      this.setState({exercise_details:res})

    }
    )
  .catch(error=>{console.error(error)})

  }
  onPickSuggestion(e){
      var item = e.target.getAttribute('name')
      //document.getElementById('food_search').innerHTML= item
      document.getElementById('food-suggestions').style.display='none'

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body:  JSON.stringify(item)
      };

      var item_description = '';
      fetch('/food/item', requestOptions)
    .then(res => res.json())
    .then(res => 
      {

        //console.log(res);
          item_description = 
          <div className="food-info">
              <img src={res["photo"]["thumb"]} alt=""></img>
              <span id='food-name' val={res["food_name"]}>Name: {res["food_name"]}</span>
              <span>Serving Quantity: {res["serving_qty"]}</span>
              <span>Serving Unit: {res["serving unit"]}</span>
              <span>Serving Weight: {res["serving_weight_grams"]} g</span>
              <span id='food-calories' val={res["nf_calories"]}>Calories: {res["nf_calories"]} cal</span>
              <span>Fat: {res["nf_total_fat"]} g</span>
              <span>Protein: {res["nf_protein"]} g</span>
              <span>Carbs: {res["nf_total_carbohydrate"]}</span>
              <div className="food-buttons">
                <button onClick={this.addFood}><FontAwesomeIcon className="icon" icon={faCheck}/></button>
                <button onClick={this.discardFood}><FontAwesomeIcon className="icon" icon={faTimes}/></button>
              </div>
          </div>     
        

        this.setState({food_description: item_description})
        this.setState({food_details:res})

      }
      )
    .catch(error=>{console.error(error)})

  }

  onPickUserFood(){
    var item = this.state.food
    //document.getElementById('food_search').innerHTML= item
    document.getElementById('food-suggestions').style.display='none'

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body:  JSON.stringify(item)
    };

    var item_description = '';
    fetch('/food/item', requestOptions)
  .then(res => res.json())
  .then(res => 
    {

      //console.log(res);
        item_description = 
        <div className="food-info">
              <img src={res["photo"]["thumb"]} alt=""></img>
              <span id='food-name' val={res["food_name"]}>Name: {res["food_name"]}</span>
              <span>Serving Quantity: {res["serving_qty"]}</span>
              <span>Serving Unit: {res["serving unit"]}</span>
              <span>Serving Weight: {res["serving_weight_grams"]} g</span>
              <span id='food-calories' val={res["nf_calories"]}>Calories: {res["nf_calories"]} cal</span>
              <span>Fat: {res["nf_total_fat"]} g</span>
              <span>Protein: {res["nf_protein"]} g</span>
              <span>Carbs: {res["nf_total_carbohydrate"]}</span>
              <div className="food-buttons">
                <button onClick={this.addFood}><FontAwesomeIcon className="icon" icon={faCheck}/></button>
                <button onClick={this.discardFood}><FontAwesomeIcon className="icon" icon={faTimes}/></button>
              </div>
          </div>   
      

      this.setState({food_description: item_description})
      this.setState({food_details:res})

    }
    )
  .catch(error=>{console.error(error)})
  }



  render() {
    return (
      <div className="Homepage">
        <span className="caloric-balance">Calorie Balance: {this.state.caloric_balance}</span>
        <div className="exercises">
          <div className="exercise-header">
            <div className="header-title">
              <span>Exercises</span>
            </div>
          </div>
          <div className="search-field">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search for exercises here..." id="exercise_search" value={this.state.exercise} onChange={this.onChangeExercise} />
            <button className="search-button" onClick={this.onPickExercise}><FontAwesomeIcon className="icon" icon={faSearch}/></button>
          </div>
          </div>
          
          <div className="exercise-description">
            {this.state.exercise_description}
          </div>

          <table className="exercise-list">
              <tr className="exercise-table-header">
                <th>
                  Name
                </th>
                <th>
                  Calories
                </th>
              </tr>
              {this.state.exercise_list}
          </table>
        </div>

        <div className="foods">
          <div className="foods-header">
            <div className="header-title">
              <span>Foods</span>
            </div>
          </div>
          <div className="search-field">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search for foods here..." id="food_search" value={this.state.food} onChange={this.onChangeFood}/>
            <button className="search-button" ><FontAwesomeIcon className="icon" icon={faSearch} onClick={this.onPickUserFood}/></button>
          </div>
          <div className="suggestion-container">
          <div id="food-suggestions" className="suggestions">
            {this.state.food_options}
              </div>
          </div>
          </div>
          
          
          <div id="food-description" className="foods-description">
              {this.state.food_description}
          </div>

          <table className="foods-list">
              <tr className="food-header">
                <th>
                  Name
                </th>
                <th>
                  Calories
                </th>
              </tr>
              {this.state.foods_list}
          </table>
        </div>
      </div>

      
    );
  }

}

export default Homepage;