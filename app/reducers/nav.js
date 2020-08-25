import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const loginNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Main');
const mainNavState = AppNavigator.router.getStateForAction(secondAction);
const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

// ------------------------------------------------------------------
export default function reducer(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    // ------------------------------------------------------------------
    case 'LOGIN_FULFILLED':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' })
        ]
      }), state);
      break;
    // ------------------------------------------------------------------
    case 'LOGOUT':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' })
        ]
      }), state);
      break;
    // ------------------------------------------------------------------
    case "NAVIGATE_TO":
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: action.payload.link }), state)
      return nextState
      break;
    // ------------------------------------------------------------------
    case "RESET_TO_HOME":
      nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      }), state);
      return nextState
      break;
    // ------------------------------------------------------------------

    case "GO_BACK":
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
  
    // ------------------------------------------------------------------
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}