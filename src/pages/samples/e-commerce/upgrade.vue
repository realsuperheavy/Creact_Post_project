<template>
    <div>
        <section class="pricing-table">
            <div class="text-center">
                <div class="cuscrip-plan-info">
                    <h4>Unlock Full Access Today</h4>
                    <p>Create your way to sucess!</p>
                </div>
                <subscription-plans
                    @toggleSelected="toggleSelected($event)"
                    @next_clicked="step = 2"
                    v-if="step === 1"
                    :plan="activePlan"
                />
                <div id="payment-form" class="flex justify-center" v-else>
                    <div class="customsubs-page">
                        <div class="tabbed-data">
                            <ul>
                                <li class="active">
                                    1. Choose a Plan
                                </li>
                                <li class="active">
                                    2. Pay Securely
                                </li>
                            </ul>
                        </div>
                        <div class="row mb-3">
                            <div class="col-12 csutom-coupon" role="group">
                                <b-form-input
                                    v-model="couponCode"
                                    placeholder="Add promotional code"
                                    @keypress="couponInfo = null"
                                />
                                <small
                                    class="form-text text-danger"
                                    v-if="couponErrMsg"
                                >
                                    {{ couponErrMsg }}
                                </small>
                                <b-button
                                    :disabled="!couponCode || couponApplying"
                                    variant="outline-danger"
                                    @click="applyCoupon()"
                                >
                                    <b-spinner
                                        class="mr-2"
                                        small
                                        v-if="couponApplying"
                                    />
                                    Apply
                                </b-button>
                            </div>
                        </div>
                        <!-- <div class="paytype-bill">
                            <ul>
                                <li>
                                    <input type="radio" value="1" v-model="payment_cycle"/> Pay Annualy
                                </li>
                                <li>
                                    <input type="radio" value="2" v-model="payment_cycle" /> Pay Monthly
                                </li>
                            </ul>
                        </div> -->
                        <div class="choosen-billdata">
                            <ul>
                                <li class="subs-pay">
                                    <strong>{{
                                        activePlan
                                            ? activePlan.nickname
                                            : "Choose a Plan"
                                    }}</strong>
                                    {{ activePlan ? activePlan.amount : "" }} x
                                    1 {{activePlan? activePlan.interval: ""}} <span>{{ activePlan ? activePlan.amount : "" }}</span>
                                </li>
                                <li>
                                    {{
                                        this.couponInfo &&
                                        couponInfo.coupon.percent_off
                                            ? couponInfo.coupon.percent_off
                                            : "0"
                                    }}% off paid {{activePlan?(activePlan.interval=='month'?'monthly':'annually'):''}}
                                    <span>-${{ amountOff }}</span>
                                </li>
                                <li class="total-pay">
                                    Total due today <span>${{calculatedAmount}}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- <div class="cardcc-details">
                            <div class="cardinfo-1">
                                <div class="cardinfo-number">
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                                <div class="cardinfo-expiry">
                                    <input type="text" placeholder="MM" />
                                    <input type="text" placeholder="YY" />
                                </div>
                            </div>
                            <div class="cardinfo-2">
                                <div class="cardinfo-cvv">
                                    <input type="text" placeholder="CVV/CVC" />
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-700 text-base">
                            → Total due now
                            <span id="total-due-now" class="font-weight-bold"
                                >{{
                                    this.$func.formattedCurrency(
                                        calculatedAmount
                                    )
                                }}
                                <span v-if="couponInfo"
                                    >(Amount Off:
                                    {{
                                        this.$func.formattedCurrency(amountOff)
                                    }})</span
                                ></span
                            >
                        </p> 
                        <p
                            id="price-selected"
                            class="text-gray-700 text-base mb-4"
                        >
                            → Subscribing to
                            <span id="priceId" class="font-weight-bold">{{
                                activePlan
                                    ? activePlan.nickname
                                    : "Choose a Plan"
                            }}</span>
                        </p> -->
                        <div class="w-full">
                            <form
                                id="payment-form"
                                @submit.prevent="upgradePlan()"
                            >
                                <div class="flex flex-wrap -mx-3 mb-3">
                                    <div class="w-full mb-0 text-left">
                                        <label style="font-size: 14px;font-weight: 500;"
                                            class="
                                                block
                                                uppercase
                                                tracking-wide
                                                text-gray-700 text-xs
                                                font-bold
                                                mb-2
                                            "
                                            for="grid-first-name"
                                        >
                                            Card Details
                                        </label>
                                        <img src="~@/assets/images/icons/cardss.png" style="float: right;">
                                        <StripeCard
                                            ref="stripeComponent"
                                            v-bind:stripeObj="stripeObj"
                                        ></StripeCard>
                                    </div>
                                </div>
                                
                                <div
                                    class="
                                        form-group
                                        mt-3 mb-4
                                        custm-billing-actions
                                    "
                                >
                                    <div class="back-step-billing">
                                        <a @click="step = 1"
                                            ><img
                                                src="~@/assets/images/icons/arrow-backk.png"
                                            />
                                            Previous:</a
                                        >
                                    </div>
                                    <button
                                        :disabled="!activePlan"
                                        type="submit"
                                        class="
                                            btn btn-block btn-primary btn-lg
                                            font-weight-medium
                                            auth-form-btn
                                        "
                                    >
                                        SUBSCRIBE
                                        <span
                                            v-if="stripeObj.loading"
                                            class="
                                                spinner-border spinner-border-sm
                                            "
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    </button>
                                </div>
                                <div style="text-align:left"><img src="~@/assets/images/icons/poweredby.png" /></div>
                            </form>
                        </div>
                        <span v-if="errorMessage" class="text-danger">{{
                            errorMessage
                        }}</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import * as paymentService from "../../../services/PaymentService";
import StripeCard from "../../../components/stripe/stripeCard";
import * as auth from "../../../services/AuthService";
import SubscriptionPlans from "./SubscriptionPlans.vue";
import { mapGetters } from "vuex";
export default {
    name: "upgrade",
    components: {
        StripeCard,
        SubscriptionPlans,
    },
    data() {
        return {
            plans: null,
            isHidden: true,
            activePlan: null,
            errorMessage: null,
            stripeObj: {
                plan: null,
                loading: false,
                error: "",
                success: "",
                errMsg: "",
                subscribing: null,
            },
            couponInfo: null,
            couponCode: "",
            couponApplying: false,
            couponErrMsg: "",
            step: 1,
            payment_cycle: 1,
        };
    },
    mounted() {
        
    },
    beforeCreate: function findPlans() {
        paymentService
            .getHelloScribePlans()
            .then((response) => {
                this.plans = response.data.product.plans;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        toggleSelected: function (item) {
            this.activePlan = item;
            this.stripeObj.plan = item;
        },
        async upgradePlan() {
            if (auth.getSubStatus()) {
                this.errorMessage = `You're already subscribed to ${auth.getUserPlan()} plan`;
                return;
            }
            const user = {
                email: this.userInfo.email,
                name: this.userInfo.username,
                plan: this.stripeObj.plan.formatted,
            };
            const couponCode = this.couponInfo
                ? this.couponInfo.coupon.id
                : null;
            try {
                await paymentService.handleSubmit(
                    this.stripeObj,
                    this.$refs.stripeComponent,
                    user,
                    couponCode
                );
                // eslint-disable-next-line no-empty
            } catch (err) {
                console.log(err);
            }
        },
        async applyCoupon() {
            this.couponApplying = true;
            this.couponErrMsg = "";
            this.couponInfo = null;
            try {
                const { data } = await paymentService.getCouponInformation(
                    this.couponCode.trim()
                );
                if (data.length > 0) {
                    const couponInfo = data[0];
                    if (couponInfo.redeem_by) {
                        let dt = new Date(couponInfo.redeem_by * 1000);
                        let today = new Date();
                        if (dt < today) {
                            this.couponErrMsg =
                                "This promo code has been expired";
                            return;
                        }
                    }
                    if (couponInfo.max_redemptions) {
                        if (
                            couponInfo.max_redemptions <=
                            couponInfo.times_redeemed
                        ) {
                            this.couponErrMsg =
                                "This promo code has been expired";
                            return;
                        }
                    }
                    this.couponInfo = couponInfo;
                } else {
                    this.couponErrMsg = "Your coupon code is invalid.";
                }
            } catch (err) {
                this.couponErrMsg = err.response.data.message;
            }
            this.couponApplying = false;
        },
    },
    computed: {
        ...mapGetters({
            userInfo: "getCurrentUser",
        }),
        planAmount() {
            let amount = this.activePlan
                ? Number(this.activePlan.amount_decimal)
                : 0;
            return amount / 100;
        },
        amountOff() {
            let amount_off = 0;
            if (this.couponInfo) {
                if (this.couponInfo.coupon.amount_off) {
                    amount_off = this.couponInfo.coupon.amount_off / 100;
                } else {
                    amount_off =
                        (this.planAmount * this.couponInfo.coupon.percent_off) /
                        100;
                }
            }
            return amount_off;
        },
        calculatedAmount() {
            return (this.planAmount - this.amountOff).toFixed(2);
        },
    },
};
</script>

<style lang="scss" scoped>
.powered-by-stripe {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    img {
        width: 120px;
    }
}
a {
    cursor: pointer;
}
</style>
