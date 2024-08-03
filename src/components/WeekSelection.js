import '../styles/WeekSelectionModal.css';
import React, { useState } from 'react';

function WeekSelectionModal({ isOpen, onClose, onSave, selectedMeals }) {
    
    const [selectedWeek, setSelectedWeek] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (selectedWeek) {
            onSave(selectedWeek, selectedMeals);
            onClose();
            setSelectedWeek(''); 
        }
    };

    const handleModalClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={handleModalClick}>
          <h4>Select Week</h4>
          <div className="week-chips">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map(week => (
              <button key={week}
                      onClick={() => setSelectedWeek(week)}
                      className={`chip ${selectedWeek === week ? 'selected' : ''}`}>
                {week}
              </button>
            ))}
          </div>
          <div className="save">
            <button onClick={handleSave} className="modal-button save-button">Save</button>
          </div>
        </div>
      </div>
    );
}

export default WeekSelectionModal;

