import React, { createContext, useContext, useReducer } from 'react';

const HabitContext = createContext();

const habitReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, { ...action.payload, id: Date.now().toString() }]
      };
    case 'TOGGLE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload
            ? { 
                ...habit, 
                completed: !habit.completed,
                streak: habit.completed ? habit.streak : habit.streak + 1
              }
            : habit
        )
      };
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState = {
  habits: []
};

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  return (
    <HabitContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  return context;
};