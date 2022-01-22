import _axios from "./index.js"
let base = "http://webt.lilang.com:8901/svr-become"
export function getHomeDatas() {
  let bases = base + "/become?209"
  let params = {
    "router": "jmsp",
    "method": "getAllPoint"
  }
  return _axios.post(bases, params);
}

// export default getHomeDatas;
export function getShopDatas(id) {
  let api = base + "/become?2";
  let params = {
    "router": "jmsp",
    "method": "getJmsp",
    "data": {
      "id": id
    }
  };
  return _axios.post(api, params);
}


export function getPicture(id=7749,req) {
  let api = base+ "/become?802";
  let params = {
    "router": "jmsp",
    "method": "getPicture",
    "data": {
      "id": id || '0',
      "tplxmc": req
    }
  }
  return _axios.post(api, params)
}
