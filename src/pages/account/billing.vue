<template>
    <div>
        <section class="billing mb-4">
            <Header/>
            <div class="profilecenterbox">
                <div class="text-center pb-4">
                    <Breadcrumb />
                </div>
                <div
                    class="changeplan-box"
                    v-if="subscriptionInfo.cancel_at_period_end && this.subscriptionInfo.status == 'active'"
                >
                    <div class="changeplan-left">
                        <h4>
                            {{
                                "$" +
                                subscriptionInfo.price +
                                "/" +
                                (subscriptionInfo.price >= 150
                                    ? "year"
                                    : "month")
                            }}
                        </h4>
                        <div class="inputsec-changeplan">
                            <input
                                type="text"
                                :placeholder="subscriptionInfo.card_last4"
                                disabled
                            />
                            <img
                                src="~@/assets/images/icons/cardtype.png"
                                class="card-icon"
                            />
                            <a @click="
                                    (update_method.open = true),
                                        (update.open = false)
                                "
                                ><img
                                    src="~@/assets/images/icons/refreshcardd.png"
                                    class="card-refresh"
                            /></a>
                        </div>
                        <p>
                            Your plan will remain active until your billing
                            period ends on :
                            <span>{{
                                subscriptionInfo.current_period_end
                            }}</span>
                        </p>
                        <a @click="handleModalContent()"
                            >Reactivate subscription</a
                        >
                    </div>
                    <div
                        class="changeplan-right"
                        v-if="this.$store.state.subscribed"
                    >
                        <h5>Change plan</h5>
                        <p>You can easily change the plan you choose</p>
                        <button 
                            v-on:click="
                                    (update.open = true),
                                        (update_method.open = false)
                                "
                            class="btn btn btn-fw btn-primary">
                            Change
                        </button>
                    </div>
                </div>
                <div class="changeplan-box" v-if="this.$store.state.subscribed && !subscriptionInfo.cancel_at_period_end">
                    <div class="changeplan">
                        <h3>Current Plan</h3>
                        <h4>
                            {{
                                "$" +
                                subscriptionInfo.price +
                                "/" +
                                (subscriptionInfo.price >= 150
                                    ? "year"
                                    : "month")
                            }}
                        </h4>
                        <div class="inputsec-changeplan">
                            <input
                                type="text"
                                :placeholder="subscriptionInfo.card_last4"
                                disabled
                            />
                            <img
                                src="~@/assets/images/icons/cardtype.png"
                                class="card-icon"
                            />
                        </div>
                        <div class="row">
                            <a
                                v-on:click="
                                    (update.open = true),
                                        (update_method.open = false)
                                "
                                >Change Plan</a
                            >
                            <a
                                v-on:click="
                                    (update_method.open = true),
                                        (update.open = false)
                                "
                                >Update Payment Method</a
                            >
                            <a v-on:click="handleModalContent"
                                >Cancel Subscription</a
                            >
                        </div>
                    </div>
                </div>
                <div class="grid-margin stretch-card mb-0">
                    <div class="card border-0">
                        <div class="card-body pl-0 pr-0 pb-0">
                            <!-- <div class="inline-block border p-3 rounded">
                                <div
                                    class="row p-2"
                                    v-if="this.$store.state.subscribed"
                                >
                                    <span class="col-sm-6">Current plan</span>
                                    <span
                                        class="col-sm-6 font-weight-bold"
                                        v-if="subscriptionInfo.price"
                                        >{{
                                            "$" +
                                            subscriptionInfo.price +
                                            "/" +
                                            (subscriptionInfo.price >= 150
                                                ? "year"
                                                : "month")
                                        }}</span
                                    >
                                </div>
                                <div
                                    class="row p-2"
                                    v-if="this.$store.state.subscribed"
                                >
                                    <span class="col-sm-6"
                                        >Card Ending in
                                    </span>
                                    <span class="col-sm-6 font-weight-bold"
                                        ><span>{{
                                            subscriptionInfo.card_brand
                                        }}</span
                                        >&bull;&bull;&bull;&bull;{{
                                            subscriptionInfo.card_last4
                                        }}</span
                                    >
                                </div>
                                <div
                                    class="row p-2"
                                    v-if="this.$store.state.subscribed"
                                >
                                    <router-link
                                        to=""
                                        class="card-link"
                                        v-on:click.native="update.open = true"
                                    >
                                        Change plan</router-link
                                    >

                                    <router-link
                                        to=""
                                        class="card-link"
                                        v-on:click.native="handleModalContent"
                                        v-if="
                                            !subscriptionInfo.cancel_at_period_end
                                        "
                                    >
                                        Cancel subscription</router-link
                                    >
                                </div>
                            </div> -->
                            <div
                                class="inline-block border p-3 rounded"
                                v-if="!this.$store.state.subscribed || this.subscriptionInfo.status != 'active'"
                            >
                                <div class="subsbox-fix">
                                    <div class="">
                                        <h4>Start Your Subscription</h4>
                                        <p>
                                            Choose the plan that suits you best.
        
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        class="btn btn btn-fw btn-primary"
                                        @click="onUpgrade"
                                    >
                                        View Plans
                                    </button>
                                </div>
                            </div>
                            <!-- Update Form -->
                            <div class="w-full pt-4" v-if="update.open">
                                <button
                                    type="button"
                                    class="close"
                                    @click="update.open = false"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="card-title">
                                    Update Your Subscription
                                </h5>
                                <form
                                    id="payment-form"
                                    @submit.prevent="updateSubscription"
                                >
                                    <div class="flex flex-wrap -mx-3 mb-3">
                                        <div class="w-full px-3 mb-0">
                                            <label
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
                                                Plans
                                            </label>
                                            <div class="form-group">
                                                <select
                                                    class="form-control"
                                                    id="plans"
                                                    name="plans"
                                                    v-model="update.newPlan"
                                                >
                                                    <!-- <option value="free" selected>Free</option> -->
                                                    <option
                                                        v-for="item in plans"
                                                        :value="item"
                                                        v-bind:key="
                                                            item.nickname
                                                        "
                                                    >
                                                        {{ item.nickname }}({{
                                                            item.amount
                                                        }}/{{ item.interval }})
                                                        <!-- <option value="hidden" v-if="!isHidden">{{ item.formatted }}</option> -->
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mt-3">
                                        <button
                                            :disabled="!update.newPlan"
                                            type="submit"
                                            class="
                                                btn btn-block btn-primary btn-lg
                                                font-weight-medium
                                                auth-form-btn
                                            "
                                        >
                                            UPDATE PLAN
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="w-full pt-4" v-if="update_method.open">
                                <button
                                    type="button"
                                    class="close"
                                    @click="update_method.open = false"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 class="card-title">
                                    Update Payment Method
                                </h5>
                                <!-- <form
                                    id="payment-form"
                                    @submit.prevent="updateSubscription"
                                >
                                    <div class="cardcc-details">
                                        <div class="cardinfo-1">
                                            <div class="cardinfo-number">
                                                <input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                            <div class="cardinfo-expiry">
                                                <input
                                                    type="text"
                                                    placeholder="MM"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="YY"
                                                />
                                            </div>
                                        </div>
                                        <div class="cardinfo-2">
                                            <div class="cardinfo-cvv">
                                                <input
                                                    type="text"
                                                    placeholder="CVV/CVC"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mt-3">
                                        <button
                                            :disabled="!update.newPlan"
                                            type="submit"
                                            class="
                                                btn btn-block btn-primary btn-lg
                                                font-weight-medium
                                                auth-form-btn
                                            "
                                        >
                                            UPDATE PLAN
                                        </button>
                                    </div>
                                </form> -->
                                <StripeCard
                                    ref="stripeComponent"
                                    v-bind:stripeObj="stripeObj"
                                ></StripeCard>
                                <div class="form-group mt-3">
                                    <button
                                    type="submit"
                                    class="
                                        btn btn-block btn-primary btn-lg
                                        font-weight-medium
                                        auth-form-btn
                                    "
                                    @click="upate_payment_method"
                                >
                                    UPDATE
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
                            </div>
                            <!-- Update Form End -->
                        </div>
                    </div>
                </div>
                <div v-if="subscriptionInfo.invoices" class="col-md-12">
                    <h6 class="card-title">Invoices</h6>
                    <div class="col-md-8 grid-margin stretch-card">
                        <b-table
                            :items="subscriptionInfo.invoices"
                            id="table-list"
                            responsive
                        >
                            <template v-slot:cell(Invoice)="data">
                                <b-link
                                    :href="data.value"
                                    class="
                                        btn
                                        btn-outline-HelloScribe
                                        btn-icon-text
                                    "
                                    role="button"
                                    ><i class="icon-doc btn-icon-append"></i
                                    >Download</b-link
                                >
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </section>
        <!-- DELETE USER MODAL -->
        <div v-if="modal.open" class="users-modal">
            <transition name="model">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <span>{{ modal.title }}</span>
                                    <button
                                        type="button"
                                        class="close"
                                        @click="modal.open = false"
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form
                                        class="custom-form"
                                        v-on:submit.prevent="
                                            handleModalfunction
                                        "
                                    >
                                        <div>
                                            <span
                                                ><span>{{ modal.body }}</span>
                                                {{ subscriptionInfo.plan }}
                                                Plan?</span
                                            >
                                        </div>
                                        <br />
                                        <div align="center">
                                            <input
                                                type="submit"
                                                class="
                                                    btn
                                                    btn-outline-primary
                                                    btn-icon-text
                                                "
                                                v-model="modal.actionButton"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- END DELETE USER MODAL -->
    </div>
</template>
<script>
import Breadcrumb from "../account/breadcrumb";
import * as paymentService from "../../services/PaymentService";
import * as auth from "../../services/AuthService";
import { http } from "../../services/HttpService";
import { mapGetters } from "vuex";
import StripeCard from "../../components/stripe/stripeCard.vue";
import Header from "./header.vue";

//import store from "../../store/index";
export default {
    name: "billing",
    components: {
        Breadcrumb,
        StripeCard,
        Header
    },
    data() {
        return {
            plans: null,
            isHidden: true,
            subscriptionInfo: {
                plan: null,
                card_last4: null,
                card_brand: null,
                current_period_end: null,
                cancel_at_period_end: null,
                subscription_id: null,
                invoices: null,
                status: null,
            },
            modal: {
                open: false,
                actionButton: "",
                title: "",
                body: "",
            },
            update: {
                open: false,
                newPlan: null,
            },
            update_method: {
                open: false,
                newPlan: null,
            },
            stripeObj: {
                plan: null,
                loading: false,
                error: "",
                success: "",
                errMsg: "",
                subscribing: null,
            },
        };
    },
    computed: {
        ...mapGetters({
            userInfo: "getCurrentUser",
        }),
    },
    methods: {
        handleModalContent() {
            var subscriptionState = this.subscriptionInfo.cancel_at_period_end;
            if (subscriptionState === true) {
                this.modal.actionButton = "Reactivate Subscription";
                this.modal.title = "Activate Subscription";
                this.modal.body = "Confirm Reactivatition";
                this.modal.open = true;
            } else {
                this.modal.actionButton = "Cancel Subscription";
                this.modal.title = "Cancel Subscription";
                this.modal.body = "Are you sure you want to cancel";
                this.modal.open = true;
            }
        },
        handleModalfunction() {
            var subscriptionState = this.subscriptionInfo.cancel_at_period_end;
            if (subscriptionState === true) {
                this.reactivateSubscription();
            } else {
                this.cancelSubscription();
            }
        },
        showSubscriptionInformation() {
            const stripeCustomerId = this.userInfo.stripeCustomerId;
            paymentService.getSubscriptionInformation(stripeCustomerId).then(
                function (response) {
                    if (response) {
                        this.subscriptionInfo.subscription_id =
                            response.data.subscriptionInfo.subscription_id;
                        this.subscriptionInfo.price =
                            response.data.subscriptionInfo.price / 100;
                        this.subscriptionInfo.card_last4 =
                            response.data.subscriptionInfo.card_last4;
                        this.subscriptionInfo.card_brand =
                            response.data.subscriptionInfo.card_brand.toUpperCase();
                        this.subscriptionInfo.current_period_end =
                            paymentService.secondsToISOString(
                                response.data.subscriptionInfo
                                    .current_period_end
                            );
                        this.subscriptionInfo.cancel_at_period_end =
                            response.data.subscriptionInfo.cancel_at_period_end;
                        this.subscriptionInfo.status = response.data.subscriptionInfo.status;
                    }
                }.bind(this)
            );
            console.log("sub_info", this.subscriptionInfo);
        },
        cancelSubscription() {
            this.modal.open = false;
            paymentService
                .cancelSubscription(this.subscriptionInfo.subscription_id)
                .then((response) => {
                    return response;
                })
                .then((cancelSubscriptionResponse) => {
                    //auth.setToken(cancelSubscriptionResponse.data.payload)
                    // Display to the user that the subscription has been cancelled.
                    this.$router.go(0);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: cancelSubscriptionResponse.data.message,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        },
        reactivateSubscription() {
            this.modal.open = false;
            paymentService
                .reactivateSubscription(this.subscriptionInfo.subscription_id)
                .then((response) => {
                    return response;
                })
                .then((reactivateSubscriptionResponse) => {
                    //auth.setToken(reactivateSubscriptionResponse.data.payload)
                    // Display to the user that the subscription has been cancelled.
                    this.$router.go(0);
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: reactivateSubscriptionResponse.data.message,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        },
        updateSubscription() {
            const newPrice = JSON.parse(this.update.newPlan.formatted);
            if (newPrice.nickname === this.$store.state.plan) {
                this.$swal.fire({
                    position: "top-end",
                    icon: "info",
                    title: `You are already on ${newPrice.nickname} plan.`,
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }
            const subscriptionId = this.subscriptionInfo.subscription_id;
            const stripeCustomerId = this.$store.state.stripeCustomerId;
            paymentService
                .updateSubscription(
                    newPrice.id,
                    subscriptionId,
                    stripeCustomerId
                )
                .then((response) => {
                    return response;
                })
                .then((updateSubscriptionResponse) => {
                    auth.setSession(updateSubscriptionResponse.data.payload);
                    // Display to the user that the subscription has been updated.
                    this.$router.push({
                        name: this.$routerItems.SUBSCRIPTION_SUCCESS,
                    });
                    this.$swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: updateSubscriptionResponse.data.message,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                });
        },
        onUpgrade() {
            http()
                .get("/check-subscription")
                .then(
                    function (response) {
                        if (response.status === 200) {
                            this.$router.push({
                                name: this.$routerItems.UPGRADE,
                            });
                        }
                    }.bind(this)
                )
                .catch(
                    function (error) {
                        if (error.response) {
                            auth.updateSession(
                                error.response.data.state.payload
                            );
                            this.$swal.fire({
                                position: "top-end",
                                icon: "error",
                                title: error.response.data.state.message,
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    }.bind(this)
                );
        },
        upate_payment_method() {

        },
    },
    mounted: function () {
        if (this.$store.state.subscribed) {
            this.showSubscriptionInformation();
        }
        const canceled = auth.getCanceled();
        if (canceled) {
            this.$swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Warning",
                text: "Your current plan has expired. Please upgrade to continue",
                showConfirmButton: true,
            });
        }
    },
    beforeCreate: function () {
        paymentService
            .getHelloScribePlans()
            .then(
                function (response) {
                    if (response) {
                        this.plans = response.data.product.plans;
                    }
                }.bind(this)
            )
            .catch(function (error) {
                console.log(error);
            });
    },
    beforeMount: function () {
        const cusId = auth.getCustomerId();
        if (!cusId) {
            return;
        }
        paymentService.getInvoices(cusId).then(
            function (response) {
                if (response.data.invoices.length > 0) {
                    // the array is defined and has at least one element
                    this.subscriptionInfo.invoices = response.data.invoices;
                }
            }.bind(this)
        );
    },
};
</script>
<style>
.isDisabled {
    color: currentColor;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
    text-decoration: none;
}
.alert-profile-tag a:not([href]):not([class]) {
    text-decoration: underline;
    color: #e91e63;
    cursor: pointer;
}
a {
    cursor: pointer;
}
</style>
