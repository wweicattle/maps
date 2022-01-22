<template>
  <div class="container" ref="containerRef">
    <div
      class="headers"
      @dblclick="dbClickBtn"
      :class="{ 'center-header': !showBottomVis }"
    >
      <span class="icon" @click="expand">
        <img src="@/assets/img/tool.png" alt />
      </span>
      <span class="c-logo">
        <img src="@/assets/img/logos.png" alt />
      </span>
      <span class="icon">
        <!-- <img src="@/assets/img/select.png" alt /> -->
      </span>
    </div>
    <template v-if="showBottomVis">
      <div class="bottom-contain">
        <div class="input-content">
          <van-search v-model="inputVal" @keydown.enter="findShops" placeholder="搜索贸易公司或门店名称" />
          <van-button icon="search" type="primary" @click="findShops"  />
        </div>
        <div class="item-contains" v-if="showRight">
          <div class="world-tit">
            <span class="all-world">全国</span>
            <span class="all-world">
              <img src="@/assets/img/map.png" alt />
              {{ sumCitysNum || 2698 }}个门店
            </span>
          </div>
          <div class="item">
            <div class="city-pd">
              <van-collapse v-model="activeNames">
                <template v-for="(val, index) in homeData" :key="index">
                  <van-collapse-item
                    :name="index"
                    :value="val.totalnum"
                    class="first-collapse"
                  >
                    <template #title>
                      <div class="p-left">
                        <span class="pro-icon">
                          <span class="small"></span>
                        </span>
                        <span class="pro-name" @click="desPro(val, $event)">
                          {{ val.proName }}
                        </span>
                      </div>
                    </template>
                    <div class="city-contain">
                      <van-collapse v-model="activeNamess">
                        <template
                          v-for="(cityVal, index) in val.cityData"
                          :key="index + 50"
                        >
                          <van-collapse-item
                            :name="index + 10"
                            :value="cityVal.countryDatas.length || 0"
                            class="second-collapse"
                          >
                            <template #title>
                              <div>
                                <van-icon name="arrow-down" />
                                <span class="country">{{
                                  cityVal.cityName
                                }}</span>
                              </div>
                            </template>
                            <template
                              v-for="(
                                countryVal, index
                              ) in cityVal.countryDatas"
                              :key="index + 100"
                            >
                              <div
                                class="citys"
                                @click="cityClickBtn(countryVal)"
                              >
                                <div class="left">
                                  <img src="@/assets/img/city.png" alt />
                                </div>
                                <div class="right">
                                  <div class="tit">{{ countryVal.mdmc }}</div>
                                  <div class="des">{{ countryVal.sskhmc }}</div>
                                  <div class="come-in" @click="comeBatchPage">进入加盟界面</div>
                                </div>
                              </div>
                            </template>
                          </van-collapse-item>
                        </template>
                      </van-collapse>
                    </div>
                  </van-collapse-item>
                </template>
              </van-collapse>
            </div>
          </div>
        </div>
        <div
          class="item-contains"
          v-else-if="!showRight && inputContent"
          style="margintop: 2px"
        >
          <div class="item" v-if="newObj.data.length != 0">
            <div class="city-pd">
              <van-collapse v-model="searchactiveName">
                <template v-for="(val, index) in newObj.data" :key="index">
                  <van-collapse-item
                    :name="index"
                    :value="val.totalnum"
                    class="first-collapse"
                  >
                    <template #title>
                      <div class="p-left">
                        <span class="pro-icon">
                          <span class="small"></span>
                        </span>
                        <span class="pro-name" @click="desPro(val, $event)">
                          {{ val.proName }}
                        </span>
                      </div>
                    </template>
                    <div class="city-contain">
                      <van-collapse v-model="searchcityactiveName">
                        <template
                          v-for="(cityVal, index) in val.cityData"
                          :key="index + 50"
                        >
                          <van-collapse-item
                            :name="index + 10"
                            :value="cityVal.countryDatas.length || 0"
                            class="second-collapse"
                          >
                            <template #title>
                              <div>
                                <van-icon name="arrow-down" />
                                <span class="country">{{
                                  cityVal.cityName
                                }}</span>
                              </div>
                            </template>
                            <template
                              v-for="(
                                countryVal, index
                              ) in cityVal.countryDatas"
                              :key="index + 100"
                            >
                              <div
                                class="citys"
                                @click="cityClickBtn(countryVal)"
                              >
                                <div class="left">
                                  <img src="@/assets/img/city.png" alt />
                                </div>
                                <div class="right">
                                  <div class="tit">{{ countryVal.mdmc }}</div>
                                  <div class="des">{{ countryVal.sskhmc }}</div>
                                 <div class="come-in" @click="comeBatchPage">进入加盟界面</div>
                                </div>
                              </div>
                            </template>
                          </van-collapse-item>
                        </template>
                      </van-collapse>
                    </div>
                  </van-collapse-item>
                </template>
              </van-collapse>
            </div>
          </div>
          <div v-else>
            <van-empty image="search" description="无相关门店信息!" />
          </div>
        </div>
        <div class="item-contains spe-right" v-else>
          <div class="world-tit">
            <span class="all-world pro" @click="goBack">
              <van-icon name="arrow-left" />
              {{ rihgtData?.proName }}
            </span>
            <span class="all-world">
              <img src="@/assets/img/map.png" alt />
              {{ cityNums }}个门店
            </span>
          </div>
          <div class="item">
            <div class="city-pd">
              <van-collapse v-model="rightactiveNames">
                <template
                  v-for="(valss, index) in rihgtData.cityData"
                  :key="index"
                >
                  <van-collapse-item
                    :name="index"
                    :value="valss.countryDatas.length"
                    class="first-collapse"
                  >
                    <template #title>
                      <div class="p-left">
                        <span class="pro-icon">
                          <span class="small"></span>
                        </span>
                        <span class="pro-name">{{ valss.cityName }}</span>
                      </div>
                    </template>
                    <div class="city-contain">
                      <template
                        v-for="(countryVal, index) in valss.countryDatas"
                        :key="index + valss"
                      >
                        <div class="citys" @click="cityClickBtn(countryVal)">
                          <div class="left">
                            <img src="@/assets/img/city.png" alt />
                          </div>
                          <div class="right">
                            <div class="tit">{{ countryVal.mdmc }}</div>
                            <div class="des">{{ countryVal.sskhmc }}</div>
                                                           <div class="come-in" @click="comeBatchPage">进入加盟界面</div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </van-collapse-item>
                </template>
              </van-collapse>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>



<script setup>
import { ref, reactive, onMounted, watch, toRaw } from "vue";
const props = defineProps({
  homeData: Object,
  changePro: String,
});
let inputVal = ref("");
let activeNames = ref([-1]);
let searchactiveName = ref([0]);
let searchcityactiveName = ref([0]);

let activeNamess = ref([-1]);
let rightactiveNames = ref([0]);

let inputContent = ref(false);
let showBottomVis = ref(true);
const containerRef = ref(null);
let showRight = ref(true);
let rihgtData = ref(null);
let cityNums = ref(0);

const emit = defineEmits(["expandContent", "changeMap", "cityClickExpand"]);

let sumCitysNum = ref(0);
const expand = () => {
  showBottomVis.value = !showBottomVis.value;
};


const comeBatchPage=(e)=>{
  // console.log(323);
  alert("跳转加盟项目~")
  e.stopPropagation();
  return false;
}
const removeBtn = function () {
  //鼠标初始化位置
  var initMouseX = 0;
  var initMouseY = 0;
  //元素的初始化位置
  var initObjX = 0;
  var initObjY = 0;

  //鼠标按下标识
  var isDraging = false;
  function windowOpe() {
    window.addEventListener;
  }
  //事件处理程序
  function eventHandler(elem, eventName, eventType) {
    // elem.attachEvent 兼容IE8及以下版本浏览器事件
    // addEventListener 支持Chrome、FireFox、Opera、Safari、IE9.0及其以上版本都支持该函数
    elem.addEventListener
      ? elem.addEventListener(eventType, eventName, false)
      : elem.attachEvent("on" + eventType, eventName);
  }

  //获取style属性值
  function getStyleValue(elem, property) {
    //getComputedStyle、currentStyle 返回CSS样式声明对象([object CSSStyleDeclaration]) 只读
    //getComputedStyle 支持IE9+以上及正常浏览器
    //currentStyle 兼容IE8及IE8以下获取目标元素style样式
    return window.getComputedStyle(elem, null)
      ? window.getComputedStyle(elem, null)[property]
      : elem.currentStyle[property];
  }
  //设置目标元素的位置
  function setObjPos(elem, pos) {
    elem.style.left = pos.x + "px";
    elem.style.top = pos.y + "px";
  }
  //mousedown
  eventHandler(
    containerRef.value,
    function (event) {
      //鼠标初始化位置
      initMouseX = event.clientX;
      initMouseY = event.clientY;
      //元素的初始化位置
      initObjX = parseInt(getStyleValue(containerRef.value, "left"));
      initObjY = parseInt(getStyleValue(containerRef.value, "top"));
      //鼠标按下标识
      isDraging = true;
    },
    "mousedown"
  );
  //mousemove
  eventHandler(
    document.documentElement,
    function (event) {
      if (isDraging) {
        //鼠标初始化位置
        var moveX = event.clientX - initMouseX + initObjX;
        var moveY = event.clientY - initMouseY + initObjY;

        //设置元素位置
        setObjPos(containerRef.value, { x: moveX, y: moveY });
      }
    },
    "mousemove"
  );
  //mouseup  document.documentElement 防止鼠标拖出元素外
  eventHandler(
    document.documentElement,
    function (event) {
      //鼠标离开停止动画
      isDraging = false;
    },
    "mouseup"
  );
};
// const

onMounted((val) => {
  removeBtn();
});

const onClickButton = () => {
  console.log("click");
};
const desPro = (val, e) => {
  // 点击跳转省份的数据
  showRight.value = false;
  rihgtData.value = val;
  cityNums.value = val?.cityData.reduce((acc, val, index) => {
    return acc + val.countryDatas.length;
  }, 0);
  // 地图进行跳转
  emit("changeMap", val.proName);
  e.stopPropagation();
  return false;
};

const dbClickBtn = () => {
  showBottomVis.value = !showBottomVis.value;
};

const goBack = () => {
  emit("expandContent");
  showRight.value = true;
};
const changeRight = (newVal) => {
  //将台湾与香港排除 门数是0
  if(newVal=="台湾"||newVal=='澳门'||newVal=="香港")return;
  let findData = props.homeData.find((val) => {
    // console.log(val.proName.includes(newVal));
    if (val.proName.indexOf(newVal) >= 0) {
      return true;
    }
    return false;
  });
  // console.log(findData);
  showRight.value = false;

  cityNums.value = findData?.cityData.reduce((acc, val, index) => {
    return acc + val.countryDatas.length;
  }, 0);
  // if(!findData)return;
  rihgtData.value = findData;
};
const cityClickBtn = (val) => {
  emit("cityClickExpand", { lng: val.lng, lat: val.lat,mdmc:val.mdmc,sskhmc:val.sskhmc,id:val.id });
};
const findShops = () => {
      watchFn(inputVal.value);
  // 搜索条件
};
let newInputArrs = ref(null);
defineExpose({ changeRight });
let newObj = reactive({ data: [] });

let time = ref(null);
const watchFn = (newVal) => {
  searchactiveName.value = [0];
  newObj.data = [];
  inputContent.value = true;
  showRight.value = false;
  let homeData = props.homeData;
  // console.log(homeData);
  newInputArrs.value = JSON.parse(JSON.stringify(toRaw(homeData)));
  newInputArrs.value.forEach((val) => {
    val.cityData.map((cityVal) => {
      cityVal.countryDatas.map((counryVal, index) => {
        if (counryVal.mdmc.includes(newVal)||counryVal.sskhmc.includes(newVal)) {
          // 定义一个变量添加上去
          let proindex = newObj.data.findIndex((valsw) => {
            return valsw.proName == val.proName;
          });
          if (proindex >= 0) {
            // 有省份
            // debugger
            let cityIndex = newObj.data[proindex].cityData.findIndex(
              (valsa) => {
                return valsa.cityName == cityVal.cityName;
              }
            );
              newObj.data[proindex].totalnum=newObj.data[proindex].totalnum+1;

            if (cityIndex >= 0) {
              newObj.data[proindex].cityData[cityIndex].countryDatas.push(
                counryVal
              );
            } else {

              newObj.data[proindex].cityData.push({
                cityName: cityVal.cityName,
                countryDatas: [counryVal],
            
              });
            }
          } else {
            newObj.data.push({
              cityData: [
                {
                  cityName: cityVal.cityName,
                  countryDatas: [counryVal],
                },
              ],
              proName: val.proName,
              totalnum:1
             
          
            });
          }

          //保留
        } else {
          // counryVal.show = false;
          return;
        }
      });
    });
  });
  console.log( newObj.data );
 
}
watch(
  () => props.homeData,
  (newVal) => {
    newVal.forEach(val=>{
      val.totalnum=val.cityData.reduce((accs, vals) => {
        return vals.countryDatas.length + accs;
      }, 0);
    })
    sumCitysNum.value = newVal?.reduce((acc, val, index) => {
      let cNums = val.cityData.reduce((accs, vals) => {
        return vals.countryDatas.length + accs;
      }, 0);
      return acc + cNums;
    }, 0);
  }
);
;

watch(inputVal, (newVal) => {
  // if (time.value) clearTimeout(time.value);
  // time.value = setTimeout(() => {
    // watchFn(newVal);
  // }, 300);
  
  if (newVal == "") {
    // 输入框空
    inputContent.value = false;
    showRight.value = true;
  }
});
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  // right: 40px;
  width: 18%;
  // max-height: 80%;
  height: 84%;
  // width: 100%;
  position: fixed;
  overflow: hidden;
  left: calc(100% - 18vw - 60px);
  top: 8%;
  // top: 0;
  // bottom: 0;
  // top: 50%;
  // margin: auto 0;
  .headers {
    height: 52px;
    background: #1e2539;
    display: flex;
    align-items: flex-start;
    color: #fff;
    span {
      padding-top: 8px;
    }
    .c-logo {
      flex: 1;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      img {
        width: 70px;
      }
      // font-family:"sysitem";
    }
    .icon {
      width: 50px;
      &:hover {
        cursor: pointer;
        opacity: 0.85;
      }
      img {
        width: 24px;
      }
      text-align: center;
      display: inline-block;
    }
    // justify-content: space-around;
  }
  .center-header {
    align-items: center;
    span {
      padding-top: 0;
    }
  }
  .bottom-contain {
    height: 100%;
    // overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);

    .input-content {
      position: relative;
      // position: absolute;
      // top: 30px;
      top: -14px;
      height: 32px;
      border-radius: 3px;
      width: calc(100% - 28px);
      margin: 0 auto;
      display: flex;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);

      .van-button {
        height: 100%;
        width: 40px;
        margin-left: 5px;
        border: none;
        background: #0670ff;
      }
      /deep/ .van-search {
        height: 100%;
        padding: 0;
        border: none;
        flex: 1;
        .van-search__content {
          // height: 100%;
          padding: 0;
        }
        .van-cell {
          padding: 0;
          padding-left: 10px;
        }

        .van-field__left-icon {
          display: none;
        }
      }
    }
    .item-contains {
      padding: 0 14px;
      height: calc(100% - 80px);
      margin-top: -14px;
      .world-tit {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        span {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        .all-world {
          display: flex;
          align-items: center;
          img {
            width: 20px;
          }
        }
      }
      .item {
        height: calc(100% - 40px);
        .city-pd {
          height: 100%;
          /deep/ .van-collapse-item__wrapper {
            .van-collapse-item__content {
              // padding: 0 20px;
              padding: 0;
            }
            .van-cell {
              background: #fff;
              & > i {
                display: none;
              }
            }
          }
          /deep/ .van-collapse {
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar {
              // 滚动条的背景
              width: 16px;
              background: inherit;
              height: 14px;
            }

            &::-webkit-scrollbar-track,
            &::-webkit-scrollbar-thumb {
              border-radius: 999px;
              width: 20px;
              border: 5px solid transparent;
            }

            &::-webkit-scrollbar-track {
              // box-shadow: 1px 1px 5px #fff;
            }

            &::-webkit-scrollbar-thumb {
              //滚动条的滑块样式修改
              width: 20px;
              min-height: 20px;
              background-clip: content-box;
              box-shadow: 0 0 0 5px #999 inset;
            }
            .van-cell {
              padding: 10px 0;
              padding-right: 9px;
              background: #f6f7f9;
              color: #333;
            }
            .p-left {
              display: flex;
              align-items: center;
              padding-left: 8px;
              .pro-icon {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                position: relative;
                z-index: 100;
                margin-right: 3px;
                background: #abc9f0;
                // opacity: 0.2;
                .small {
                  content: "";
                  position: absolute;
                  width: 50%;
                  height: 50%;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  border-radius: 50%;
                  top: 0;
                  margin: auto;
                  background: #0670ff;
                }
              }
              .pro-name {
                // font-size: 15px;
              }
            }
            .first-collapse {
              border: 1px solid #f0f0f0;
              margin: 10px 0;
              border-radius: 4px;
              // position: sticky;
              // top: 0;
              &:first-child {
                margin-top: 0;
              }
              &:last-child {
                margin-bottom: 0;
              }

              .van-cell {
                &:hover {
                  background: #fff;
                  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);

                  // font-size: 44px;
                  .p-left {
                    color: #0670ff;
                    .pro-name {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
            .second-collapse {
              .van-cell {
                background: #fff;
              }
            }
          }

          .city-contain {
            .citys {
              display: flex;
              border-bottom: 1px solid #ececec;
              padding: 10px 36px;
              .left {
                width: 20px;
                padding-right: 3px;
                // border: 1px solid red;
                img {
                  width: 100%;
                }
              }
              .right {
                color: #888;
                width: calc(100% - 30px);
                .tit {
                  color: var(--text-color);
                  font-weight: 600;
                  font-size: 14px;
                }
                .des {
                  font-size: 12px;
                }
                .come-in {
                  color: #0670ff;
                  text-decoration: underline;
                }
                & > div {
                  width: 100%;
                  // border: 1px solid yellow;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
              &:hover {
                // opacity: .7;
                background: #f2f8ff;
                cursor: pointer;
              }
            }
            .country {
              padding-left: 2px;
            }
            /deep/ .van-cell__title {
              padding-left: 23px;
            }
            /deep/ .van-cell__value {
              padding-right: 20px;
              font-weight: 600;
              color: #333;
            }
          }
          /deep/ .van-cell__value {
            // padding-right: 20px;
            font-weight: 600;
            color: #333;
          }
        }
      }
    }
    .spe-right {
      .pro {
        color: #0670ff !important ;
      }

      .van-cell {
        &:hover {
          background: #fff;
          // font-size: 44px;
          .p-left {
            color: #0670ff;
            .pro-name {
              text-decoration: none !important;
            }
          }
        }
      }
      .pro-name {
        &:hover {
        }
      }
    }
  }
}
</style>
