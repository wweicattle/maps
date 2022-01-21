import _axios from "./index.js"
 function getHomeDatas(){
    let base="http://192.168.35.96:8900/svr-become/become?209"
    let params={
        "router": "jmsp",
        "method": "getAllPoint"
      }
    return _axios.post(base,params);
}

export default getHomeDatas;
