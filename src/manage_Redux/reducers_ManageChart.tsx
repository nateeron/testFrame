
interface ManageChartState {
      height: number | null;
      width: number | null;
    }

// Define action types
const MANAGE_CHART = 'MANAGE_CHART';

// Define action interfaces
interface SetUserAction {
  type: typeof MANAGE_CHART;
  payload: { height: number; width: number };
}

// Union of all user actions
type UserActionTypes = SetUserAction;

// Initial state
const initialState: ManageChartState = {
      height: null,
      width: null,
};

// Reducer function
const ManageChart = (state = initialState, action: UserActionTypes): ManageChartState => {
  switch (action.type) {
    case MANAGE_CHART:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default ManageChart;