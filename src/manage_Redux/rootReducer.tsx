import { combineReducers } from 'redux';
import ManageChart from './reducers_ManageChart';

// Root state type
const rootReducer = combineReducers({
  chart: ManageChart,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
