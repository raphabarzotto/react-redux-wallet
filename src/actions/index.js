// Actions Type
export const LOGIN_ACTION = 'LOGIN';
// fetch quando carregar o header
// add expense
// delete expense
// edit expense

export function loginButtonPress(payload) {
  return {
    type: LOGIN_ACTION,
    payload,
  };
}
