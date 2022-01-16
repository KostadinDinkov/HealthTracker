import React from 'react';
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Homepage extends React.Component {
  render() {
    return (
      <div className="Homepage">

        <div className="exercises">
          <div className="exercise-header">
            <div className="header-title">
              <span>Exercises</span>
            </div>
          </div>
          <div className="search-field">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search for exercises here..." id="exercise_search" />
            <button className="search-button" ><FontAwesomeIcon className="icon" icon={faSearch} /></button>
          </div>
          </div>
          
          <div className="exercise-body">
            <p>Add Exercises and we'll tell you how many calories you're burning.</p>
          </div>
        </div>

        <div className="foods">
          <div className="foods-header">
            <div className="header-title">
              <span>Foods</span>
            </div>
          </div>
          <div className="search-field">
          <div className="search-container">
            <input type="text" className="search-bar" placeholder="Search for foods here..." id="food_search" />
            <button className="search-button" ><FontAwesomeIcon className="icon" icon={faSearch} /></button>
          </div>
          </div>
          
          <div className="foods-body">
            <p>Add Foods and we'll tell you how many calories you're consuming.</p>
          </div>
        </div>
      </div>

      
    );
  }

}

export default Homepage;