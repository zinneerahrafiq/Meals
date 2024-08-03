import React, { useState, useEffect } from 'react';
import MealCard from './components/MealCard';
import pizzaImage from './images/pizza.jpg';  
import './styles/HomePage.css';
import WeekSelectionModal from './components/WeekSelection';

function HomePage() {
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('All Meals');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedWeekMeals, setSelectedWeekMeals] = useState({
    'Week 1': [], 'Week 2': [], 'Week 3': [], 'Week 4': []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToWeekClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveWeek = (week, mealsToAdd) => {
    setSelectedWeekMeals(prev => ({
      ...prev,
      [week]: [
        ...(prev[week] || []),
        ...mealsToAdd.filter(meal => !prev[week].some(m => m.id === meal.id))
      ]
    }));
    setSelectedMeals([]);  
  };

  const handleDeleteMeal = (week, mealId) => {
    setSelectedWeekMeals(prev => ({
      ...prev,
      [week]: prev[week].filter(meal => meal.id !== mealId)
    }));
  };
  
  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then(response => response.json())
      .then(data => setMeals(data.recipes))
      .catch(error => console.error('Error fetching meals:', error));
  }, []);

  const handleSelectMeal = (meal) => {
    setSelectedMeals(prevSelected => {
      const exists = prevSelected.find(m => m.id === meal.id);
      if (exists) {
        return prevSelected.filter(m => m.id !== meal.id);
      } else {
        return [...prevSelected, meal];
      }
    });
  };

  const renderMeals = () => {
    const mealsToDisplay = activeTab === 'All Meals' ? meals : selectedWeekMeals[activeTab];
    if (!mealsToDisplay || mealsToDisplay.length === 0) {
      return <p>No meals added.</p>;
    }
    return (
      <div className="meal-cards">
        {(activeTab === 'All Meals' ? meals : selectedWeekMeals[activeTab]).map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onSelectMeal={handleSelectMeal}
            isSelected={selectedMeals.some(m => m.id === meal.id)}
            onDelete={() => handleDeleteMeal(activeTab, meal.id)}
            showDeleteButton={activeTab !== 'All Meals'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="home-page">
      <div className="header">
        <img src={pizzaImage} alt="Optimized Meals" />
        <div className="header-image-overlay"></div> 
        <div className="header-content">
          <h1>Optimize Your Meal</h1>
          <p>Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.</p>
        </div>
      </div>

      <h2>Week Orders</h2>
      <div className="tab-buttons">
        {['All Meals', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'active' : ''}>
            {tab}
          </button>
        ))}
        <button onClick={handleAddToWeekClick} className={`add-to-week-button ${selectedMeals.length > 0 ? 'enabled' : 'disabled'}`} disabled={selectedMeals.length === 0}>
          Add to Week
        </button>

        <WeekSelectionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveWeek} 
          selectedMeals={selectedMeals} 
        />
      </div>
      <div className="meal-cards">
        {renderMeals()}
      </div>
    </div>
  );
}

export default HomePage;
