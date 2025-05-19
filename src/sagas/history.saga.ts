import { historyActions } from "@/redux-store/history.slice";
import { takeEvery } from "redux-saga/effects";

function* logHistory(action: ReturnType<typeof historyActions.addHistory>) {
  console.log("📝 Lịch sử:", action.payload);
}

export function* historySaga() {
  yield takeEvery(historyActions.addHistory.type, logHistory);
}
