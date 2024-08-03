import React from 'react';
import '../styles/MealCard.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function MealCard({ meal, onSelectMeal, isSelected, onDelete, showDeleteButton }) {
  return (
    <div className={`meal-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelectMeal(meal)}>
          {showDeleteButton && (
        <button className="delete-button" onClick={(e) => {
          e.stopPropagation();
          onDelete(meal.id);
        }}>
             <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
      <div className="meal-image-container">
        <img src={meal.image} alt={meal.name} className="meal-image"/>
        <span className="meal-type">{meal.mealType[0]}</span>
      </div>
      <div className="meal-details">
        <h3>{meal.name}</h3>
        <p>{meal.instructions.join(' ')}</p>
        <div className="meal-info">
            <span><strong>Cuisine:</strong> {meal.cuisine}</span>
            <div className="meal-rating">
            <span className="rating"><strong>Rating: </strong>{meal.rating}</span>
                {Array.from({ length: Math.round(meal.rating) }, (_, i) => (
                    <span key={i} className="star">&#9733;</span>
                ))}
                
            </div>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
