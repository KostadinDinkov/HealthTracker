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

    this.state = {
      exercise:' ',
      food:' ',
      food_details:'',
      exercise_details:'',
      food_options:' ',
      exercise_options:' ',
      exercise_list:[],
      food_description:<p>Add a food to see how many calories you're consuming.</p>,
      foods_list:[],
      exercise_description:<p>Add an exercise to see how many calories you're burning.</p>,
      caloric_balance:0,
      proteins:0,
      carbs:0,
      fats:0,
      email:'',
      loggedIn:false
    }

    if(localStorage.getItem('loggedIn')==="true"){
      this.state.loggedIn = true;
      this.state.email = localStorage.getItem('email')
    }
  }

  componentDidMount(){
    if(localStorage.getItem('loggedIn')==="true"){
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
        var balance = this.state.caloric_balance
        var proteins = this.state.proteins
        var carbs = this.state.carbs
        var fats = this.state.fats

        var list = []
        for(const item of res){
          balance +=  parseFloat(item["nf_calories"])
          proteins += parseFloat(item["nf_protein"])
          carbs += parseFloat(item["nf_total_carbohydrate"])
          fats += parseFloat(item["nf_total_fat"])
          list.push(
            <tr className="food-row" name={item["serving_qty"]+" "+item["serving_unit"]+" "+item["food_name"]} onClick={this.onPickSuggestion}>
          <td>
            {item["food_name"]}
          </td>
          <td>
            {item["nf_calories"]}
          </td>
          <td>
            {item["nf_protein"]}
          </td>
          <td>
            {item["nf_total_carbohydrate"]}
          </td>
          <td>
            {item["nf_total_fat"]}
          </td>
          <td>
            {item["serving_unit"]}
          </td>
          <td>
            {item["serving_qty"]}
          </td>
        </tr>
          )
        }

        this.setState({foods_list : list});
        this.setState({caloric_balance: balance})
        this.setState({proteins:proteins})
        this.setState({carbs:carbs})
        this.setState({fats:fats})
      }
      )
    .catch(error=>{console.error(error)})

    fetch('/exercise/dailyExercises', requestOptions).then(res => res.json())
    .then(res => 
      {
        var balance = this.state.caloric_balance
      
        var list = []
        for(const item of res){
          balance -=  parseFloat(item["nf_calories"])

          list.push(
            <tr className="exercise-row" name={item["duration_min"]+" min " + item["name"]} onClick={this.onGetExerciseDetails}>
        <td>
          {item["name"]}
        </td>
        <td>
         {item["duration_min"]}
        </td>
        <td>
          {item["nf_calories"]}
        </td>
      </tr>
          )
        }
        this.setState({caloric_balance: balance})
        this.setState({exercise_list:list});

      }
      )
    .catch(error=>{console.error(error)})
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
        <tr className="food-row" name={this.state.food_details["serving_qty"] + " " + this.state.food_details["serving_unit"]+" "+this.state.food_details["food_name"]} onClick={this.onPickSuggestion}>
          <td>{this.state.food_details["food_name"]} </td>
          <td>{this.state.food_details["nf_calories"]}</td>
          <td>
            {this.state.food_details["nf_protein"]}
          </td>
          <td>
            {this.state.food_details["nf_total_carbohydrate"]}
          </td>
          <td>
            {this.state.food_details["nf_total_fat"]}
          </td>
          <td>
            {this.state.food_details["serving_unit"]}
          </td>
          <td>
            {this.state.food_details["serving_qty"]}
          </td>
        </tr>
      )
      var balance = this.state.caloric_balance
      var proteins = this.state.proteins
      var carbs = this.state.carbs
      var fats = this.state.fats

      balance +=  parseFloat(this.state.food_details["nf_calories"])
      proteins += parseFloat(this.state.food_details["nf_protein"])
      carbs += parseFloat(this.state.food_details["nf_total_carbohydrate"])
      fats += parseFloat(this.state.food_details["nf_total_fat"])
      this.setState({caloric_balance: balance})
      this.setState({proteins:proteins})
      this.setState({carbs:carbs})
      this.setState({fats:fats})
      this.setState({foods_list:updated_foods_list})

      if(this.state.loggedIn === true){

        var user = {}
        user["email"] = this.state.email;
        user["foods"]=[this.state.food_details]
  
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body:  JSON.stringify(user)
        };
    
        fetch('/food/add', requestOptions).then(res => res.text())
        .then(res => 
          {
              console.log(res)
          }
          )
        .catch(error=>{console.error(error)})
  
      }
  }

  addExercise(){
    var updated_exercise_list = [...this.state.exercise_list]
    updated_exercise_list.push(
      <tr className="exercise-row" name={this.state.exercise_details["duration_min"]+" min " + this.state.exercise_details["name"]} onClick={this.onGetExerciseDetails}>
        <td>
          {this.state.exercise_details["name"]}
        </td>
        <td>
         {this.state.exercise_details["duration_min"]}
        </td>
        <td>
          {this.state.exercise_details["nf_calories"]}
        </td>
      </tr>
    )
    var balance = this.state.caloric_balance
    balance -= parseFloat(this.state.exercise_details["nf_calories"])
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
  
      fetch('/exercise/add', requestOptions).then(res => res.text())
      .then(res => 
        {
            console.log(res)
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
        <div class="balance">
        <span className="caloric-balance">Caloric Balance: {this.state.caloric_balance.toFixed(2)}</span>
        <span className="caloric-details">Proteins: {this.state.proteins.toFixed(2)}</span>
        <span className="caloric-details">Carbs: {this.state.carbs.toFixed(2)}</span>
        <span className="caloric-details">Fats: {this.state.fats.toFixed(2)}</span>
        </div>
        <div className="exercises">
          <div className="exercise-header">
            <div className="header-title">
              <span>Exercises</span>
            </div>
          </div>
          <div className="search-field">
          <div className="search-container">
            <input type="text" type="Search" className="search-bar" placeholder="Search for exercises here..." id="exercise_search" value={this.state.exercise} onChange={this.onChangeExercise} />
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
                  Duration (Minutes)
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
            <input type="text" type="Search" className="search-bar" placeholder="Search for foods here..." id="food_search" value={this.state.food} onChange={this.onChangeFood}/>
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
                <th>Name</th>
                <th>Calories</th>
                <th>Proteins</th>
                <th>Carbs</th>
                <th>Fats</th>
                <th>Unit</th>
                <th>Quantity</th>
              </tr>
              {this.state.foods_list}
          </table>
        </div>
      </div>

      
    );
  }

}

export default Homepage;