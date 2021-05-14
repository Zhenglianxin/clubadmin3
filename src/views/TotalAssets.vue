<template>
  <div class="total_assets">
    <div v-show="isShowConfirm">
      <Confirm :closeConfirm="closeConfirm" :hasBgImage="true">
        <template v-slot:title>
          <div class="title">收益说明</div>
        </template>
        <template v-slot:content>
          <div class="confirm-contentDiv" style="font-size: 3.73vw; margin-top: -2.76vw; margin-bottom: -0.66vw">
            <span class="color-009678">月收益=当月活动收入-当月活动支出 </span>
            <br /><br />
            <span class="color-009678">活动收入</span>
            <span class="color-353535">是指成员报名活动支付的费用，包含微信支付、线下支付、充值卡、年卡、次卡所有支付渠道所收到的收入总额。 </span>
            <br /><br />
            <span class="color-009678">活动支出</span>
            <span class="color-353535">是指场地、羽毛球等消耗的支出金额。</span>
          </div>
        </template>
      </Confirm>
    </div>
    <div class="bgcFF-box marginBottom-20">
      <div class="top-box flex">
        <div class="top-title leftGreen-title">总资产</div>
        <img class="before-assets-btn" @click="goToAddBudget" src="https://popbadminton.oss-cn-shanghai.aliyuncs.com/h5/Input%402x.png">
      </div>
      <assets-ring id="ring-echart" :ringColors="ringColors" :allAmount="allAmount" :ringData="ringData"></assets-ring>
      <div class="ring-msg flex">
        <div class="ring-msg-ones flex" :class="beforeColorClassList[i]" v-for="(data,i) in ringData" :key="i" @click="goToDetails(i)">
          <div class="ring-msg-name">{{ data.name }}</div>
          <div class="msg-money">{{data.value | fmtMoneyKeepTwo}}</div>
        </div>
      </div>
      <div class="check-details-btn" @click="goToDetails(0)">点击类目查看明细</div>
      <assets-line :dateArr="dateArr" :moneyArr="moneyArr"></assets-line>
    </div>

    <div class="bgcFF-box">
      <div class="income-analysis-box flex">
        <div class="leftGreen-title">活动收益分析</div>
        <img class="question-icon" @click="showConfirm" src="https://popbadminton.oss-cn-shanghai.aliyuncs.com/h5/blue_wenhao2.png" alt="">
      </div>
      <div class="ranking-box">
        <img class="ranking-bgimg" src="https://popbadminton.oss-cn-shanghai.aliyuncs.com/h5/rate_of_return.png" alt="">
        <div class="ranking-box-msgs ranking-til-msg">你上月的收益率跑赢了</div>
        <div class="ranking-box-msgs ranking-content-msg flex">
          <div class="ranking-percent">{{ percent }}</div>
          <div class="ranking-til-msg">全国俱乐部，加油哦！</div>
        </div>
      </div>
      <assets-bar
        :dataDay="dataDay"
        :dataMonth="dataMonth"
        :showDataDay="showDataDay"
        :showDataMonth="showDataMonth"
        :day_year_amount="showDataDay_year_amount"
        :month_year_amount="showDataMonth_year_amount"
      ></assets-bar>
      <div id="analysis" style="position: relative; top: 18.13vw"></div>
    </div>
  </div>
</template>


<script>
import assetsRing from '@/components/AssetsRingEcharts';
import assetsLine from '@/components/AssetsLineEcharts';
import assetsBar from '@/components/AssetsBarEcharts';
import Confirm from '@/components/Confirm';
export default {
  components: {
    assetsRing,
    assetsLine,
    assetsBar,
    Confirm,
  },
  props: ['from'],
  data() {
    return {
      id: null,
      beforeColorClassList: [
        'before-bgc-5793F3', 'before-bgc-544BFC', 'before-bgc-FD9C34', 'before-bgc-DE4444'
      ],
      isShowConfirm: false,
      cashObtain: false,    //是否拥有提现权限
      allAmount: 0,
      ringColors: ['#5793F3', '#544BFC', '#FD9C34', '#DE4444'],
      ringData: [],
      dateArr: [],
      moneyArr: [],

      percent: '0%', //收益百分比

      dataDay: [],
      dataMonth: [],
      showDataDay: [],
      showDataMonth: [],
      showDataDay_year_amount: [],
      showDataMonth_year_amount: [],
    }
  },

  created() {
    console.log(this.$route)
    this.id = this.$route.params.id;
    this.clubId = this.$route.query.clubId;
    this.cashObtain = this.$route.query.cashObtain;
    this.isAuthentication = this.$route.query.isCheck;
    this.initData();
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
      WeixinJSBridge.call('hideOptionMenu');
    });
  },
  mounted() {
    // window.addEventListener("resize", this.resizeTheChart);
    // this.$refs.runTimes_creditChart.echarts.resize();
    this.$nextTick(()=>{
      if (this.from && this.from === 'detail') {
        document.getElementById("analysis").scrollIntoView(false);
      }
    })
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.resizeTheChart);
  },
  methods: {
    initData() {
      console.log(this.$service)
      this.$service.post(this.api.getClubInfo, { clubId: this.clubId }).then(res => {
        console.log(res)
        this.percent = res['clubRevenue']['percent'] || '0%';
        this.ringData = [{
          name: '资金',
          value: res.clubData.dues
        }, {
          name: '场地卡',
          value: res.clubData.areaMoney
        }, {
          name: '球',
          value: res.clubData.ballMoney
        }, {
          name: '其他',
          value: res.clubData.otherMoney
        }]
        this.ringData.map(item => {
          this.allAmount = this.Add(this.allAmount, item.value)
        })
        this.allAmount = this.fmoney(this.allAmount.toFixed(2),2)

        for (let key in res.clubData.data) {
          this.dateArr.push(key)
          this.moneyArr.push(parseFloat(res.clubData.data[key]).toFixed(2))
        }

        for (let key in res.clubRevenue.month) {
          this.dataDay.push(res.clubRevenue.month[key]['date']);
          this.showDataDay.push((res.clubRevenue.month[key]['sum_amount'] * 1).toFixed(2));
          this.showDataDay_year_amount.push((res.clubRevenue.month[key]['year_amount'] * 1).toFixed(2));
        }

        for (let key in res.clubRevenue.year) {
          this.dataMonth.push(res.clubRevenue.year[key]['date']);
          this.showDataMonth.push((res.clubRevenue.year[key]['sum_amount'] * 1).toFixed(2));
          this.showDataMonth_year_amount.push((res.clubRevenue.year[key]['year_amount'] * 1).toFixed(2));
        }

        // this.dateArr = []

      }).catch(err => {
        console.log(err);
      })
    },
    // 将数字转化为带 逗号格式
    fmoney(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      return t.split("").reverse().join("") + "." + r;
    },
    Add(arg1, arg2) {
      let r1, r2, m;
      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2))
      return (arg1 * m + arg2 * m) / m
    },
    goToDetails(tabsAct) {
      this.$router.push({
        name: "TotalAssetsDetails",
        query: { clubId: this.clubId, tabsAct: tabsAct, cashObtain: this.cashObtain, isCheck: this.isAuthentication }
      });
    },
    // 原资产录入
    goToAddBudget() {
      console.log('e')
      this.$wx.miniProgram.navigateTo({
        url: `../../adminPages/addBudget/addBudget?clubId=${this.clubId}&status=1`
      });
    },

    showConfirm(value) {
      this.isShowConfirm = true;
    },
    // 关闭弹窗
    closeConfirm() {
      this.isShowConfirm = false;
    },
    resizeTheChart() {
      if (this.$refs.runTimes_creditChart) {
        this.$refs.runTimes_creditChart.resize();
      }

    },

  }
}
</script>

<style lang="scss" scoped>
.total_assets {
  background-color: #ededed;
  //   height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: 18.13vw;
}
.bgcFF-box {
  background-color: #fff;
}
.marginBottom-20 {
  margin-bottom: 2.66vw;
}
.color-353535 {
  color: #353535;
}
.color-009678 {
  color: #009678;
}
.confirm-contentDiv{
  div,span{
    line-height: 6.4vw;
  }
}
.leftGreen-title {
  font-size: 4.8vw;
  font-weight: bold;
  padding-left: 2.66vw;
  // border-left: 0.8vw border #009678;
  position: relative;
  margin-right: 1.2vw;
}
.leftGreen-title::before {
  position: absolute;
  content: "";
  height: 4.8vw;
  width: 0.8vw;
  left: 0;
  top: 0.8vw;
  background-color: #009678;
}
.top-box {
  align-items: center;
  justify-content: space-between;
  padding: 4.26vw 5.33vw;

  .before-assets-btn {
    width: 33.33vw;
    height: 8vw;
  }
}
#ring-echart {
  width: 100vw;
  height: 80vw;
  margin-bottom: 5.33vw;
}

.ring-msg {
  align-content: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 5.33vw;
  margin-bottom: 2.33vw;
  .ring-msg-ones {
    align-items: center;
    width: 44.66vw;
    line-height: 7.73vw;
    // padding-left: 6.66vw;
    padding-left: 5.47vw;
    box-sizing: border-box;
    position: relative;
    .round {
      width: 2.13vw;
      height: 2.13vw;
      background-color: red;
      border-radius: 50%;
      box-sizing: border-box;
      flex-wrap: 0;
      flex-shrink: 0;
    }
    .ring-msg-name,
    .msg-money {
      margin-left: 1.33vw;
      font-size: 3.73vw;
      color: #888;
    }
    .msg-money {
      // margin-left: 3.46vw;
      color: #000;
    }
  }
  .ring-msg-ones::before {
    content: "";
    display: block;
    width: 2.13vw;
    height: 2.13vw;

    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    left: 3.33vw;
  }
  .before-bgc-5793F3::before {
    background-color: #5793f3;
  }
  .before-bgc-544BFC::before {
    background-color: #544bfc;
  }
  .before-bgc-FD9C34::before {
    background-color: #fd9c34;
  }
  .before-bgc-DE4444::before {
    background-color: #de4444;
  }
}
.check-details-btn {
  line-height: 7.33vw;
  font-size: 3.2vw;
  color: #b2b2b2;
  text-align: center;
}
.income-analysis-box {
  height: 12vw;
  align-items: center;
  padding: 0 5.33vw;
  .question-icon {
    width: 4vw;
    height: 4vw;
  }
}
.ranking-box {
  margin: 0 5.33vw 5.33vw;
  position: relative;
  .ranking-bgimg {
    width: 89.33vw;
    height: 28vw;
  }
  .ranking-box-msgs {
    position: absolute;
    left: 4vw;
  }
  .ranking-til-msg {
    font-size: 3.73vw;
    color: #353535;
    top: 5.2vw;
  }
  .ranking-content-msg {
    align-items: flex-end;
    top: 15.73vw;
    .ranking-percent {
      font-size: 5.6vw;
      line-height: 5.6vw;
      color: #313131;
      font-weight: bold;
      margin-right: 3.33vw;
    }
  }
}
</style>
