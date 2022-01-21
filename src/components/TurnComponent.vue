<template>
  <div class="container" >
    <div class="headers">
      <span class="icon"><img src="@/assets/img/tool.png" alt="" /></span>
      <span class="c-logo">LILANZ</span>
      <span class="icon"><img src="@/assets/img/select.png" alt="" /></span>
    </div>
    <div class="input-content">
      <van-search v-model="inputVal" placeholder="搜索门店" />
      <van-button icon="search" type="primary" />
    </div>
    <div class="item-contains">
      <div class="world-tit">
        <span class="all-world">全国</span>
        <span class="all-world"
          ><img src="@/assets/img/map.png" alt="" /> 125个门店</span
        >
      </div>
      <div class="item">
        <div class="city-pd">
          <van-collapse v-model="activeNames">
            <template v-for="(val, index) in 24" :key="index">
              <van-collapse-item
                :name="index"
                :value="index"
                class="first-collapse"
              >
                <template #title>
                  <div class="p-left">
                    <span class="pro-icon"><span class="small"></span></span>
                    <span class="pro-name">福建{{ index }}省</span>
                  </div>
                </template>
                <div class="city-contain">
                  <van-collapse v-model="activeNamess">
                    <template v-for="(val, index) in 4" :key="index">
                      <van-collapse-item
                        :name="index + 10"
                        :value="index + 10"
                        class="second-collapse"
                      >
                        <template #title>
                          <div>
                            <van-icon name="arrow-down" /><span class="country"
                              >泉州市</span
                            >
                          </div>
                        </template>
                        <template v-for="(i, index) in 5" :key="index">
                          <div class="citys">
                            <div class="left">
                              <img src="@/assets/img/city.png" alt="" />
                            </div>
                            <div class="right">
                              <div class="tit">晋江利郎万达街</div>
                              <div class="des">福建省晋江市世纪大道123号</div>
                              <div class="des">福建贸易公司</div>
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
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
let inputVal = ref("");
const activeNames = ref(["1"]);
const activeNamess = ref(["1"]);

// function onSearch() {
//   console.log(43434);
// }
const onClickButton = () => {
  console.log("click");
};
const desPro=()=>{
    console.log(
        "loading tioahzuan"
    );
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;
  z-index: 100;
  background: #fff;
  .headers {
    height: 52px;
    background: #1e2539;
    display: flex;
    align-items: flex-start;
    color: #fff;
    span {
      padding-top: 8px;
        &:hover{
            cursor: pointer;
        }
    }
    .c-logo {
      flex: 1;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      // font-family:"sysitem";
    }
    .icon {
      width: 50px;
      img {
        width: 34px;
      }
      text-align: center;
      display: inline-block;
    }
    // justify-content: space-around;
  }
  .input-content {
    position: relative;
    top: -14px;
    height: 32px;
    border-radius: 3px;
    width: calc(100% - 28px);
    margin: 0 auto;
    // border: 1px solid red;
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
    :deep(.van-search ) {
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
    height: calc(100% - 100px);
    margin-top: -14px;
    .world-tit {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      span {
        font-size: 15px;
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
        :deep(.van-collapse-item__wrapper)  {
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
        :deep( .van-collapse ){
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
            padding-right: 4px;
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
          }
          .first-collapse {
            border: 1px solid #f0f0f0;
            margin: 10px 0;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
            border-radius: 4px;
            &:first-child {
              margin-top: 0;
            }
            &:last-child {
              margin-bottom: 0;
            }

            .van-cell {
              &:hover {
                background: #fff;
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
          :deep(.van-cell__title)  {
            padding-left: 23px;
          }
          :deep(.van-cell__value ) {
            padding-right: 20px;
            font-weight: 600;
            color: #333;
          }
        }
        :deep(.van-cell__value ) {
          // padding-right: 20px;
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
}
</style>
