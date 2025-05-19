import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { userActions } from "@/redux-store/user.slice";
import { historyActions } from "@/redux-store/history.slice";
import { User } from "@/types/user.type";

function fakeFetchUsers(): Promise<User[]> {
  return new Promise((res) =>
    setTimeout(() => res([{ id: 1, name: "A" }, { id: 2, name: "B" }]), 1000)
  );
}

function* fetchUsersSaga() {
  try {
    const users: User[] = yield call(fakeFetchUsers);
    yield put(userActions.fetchUsersSuccess(users));
    yield put(historyActions.addHistory("Tải danh sách người dùng"));
  } catch{
    yield put(userActions.setError("Tải người dùng thất bại"));
  }
}

function* addUserSaga(action: PayloadAction<User>) {
  try {
    yield delay(500);
    yield put(userActions.addUserSuccess(action.payload));
    yield put(userActions.setMessage("Đã thêm người dùng thành công"));
    yield put(historyActions.addHistory(`Thêm người dùng ${action.payload.name}`));
  } catch {
    yield put(userActions.setError("Thêm người dùng thất bại"));
  }
}

export default function* userRootSaga() {
  yield takeLatest(userActions.fetchUsers.type, fetchUsersSaga); 
  yield takeLeading(userActions.addUser.type, addUserSaga); 
  yield takeEvery(userActions.addUserSuccess.type, function* (action: PayloadAction<User>) {
    yield put(historyActions.addHistory(`Xác nhận thêm: ${action.payload.name}`));
  });
}
