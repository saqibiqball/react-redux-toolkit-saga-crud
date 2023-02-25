import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../../apis";
import * as actions from "../slices/userSlice";
function* getUsers() {
  try {
    const response = yield call(api.fetchUsers);
    yield put(actions.getUsersSuccess(response.data));
  } catch (error) {
    yield put(actions.getUsersFailure());
  }
}
function* getUser(action) {
  try {
    const response = yield call(api.fetchUser, action.payload);
    yield put(actions.getUserSuccess(response.data));
  } catch (error) {
    yield put(actions.getUserFailure());
  }
}
function* deleteUser(action) {
  try {
    const response = yield call(api.deleteUser, action.payload?.id);
    console.log(response);
    yield put(actions.deleteUserSuccess(response.data));
  } catch (error) {
    yield put(actions.deleteUserFailure());
  }
}

function* addUser(action) {
  console.log("add user", action.payload);
  try {
    const response = yield call(api.addUser, action.payload);
    console.log(response);
    yield put(actions.addUserSuccess(response.data));
  } catch (error) {
    yield put(actions.addUserFailure());
  }
}

function* updateUser(action) {
  console.log("updates user", action.payload);
  try {
    const response = yield call(
      api.editUser,
      action.payload.id,
      action.payload
    );
    console.log(response);
    yield put(actions.updateUserSuccess(response.data));
  } catch (error) {
    yield put(actions.updateUserFailure());
  }
}
function* userSaga() {
  yield takeEvery("user/getUsersStart", getUsers);
  yield takeEvery("user/getUserStart", getUser);
  yield takeEvery("user/deleteUser", deleteUser);
  yield takeEvery("user/addUser", addUser);
  yield takeEvery("user/updateUser", updateUser);
}
export default userSaga;
