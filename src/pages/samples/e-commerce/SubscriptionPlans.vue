<template>
    <div class="hello-scribe-home customsubs-page">
        <div class="tabbed-data">
            <ul>
                <li class="active">1. Choose a Plan</li>
                <li>2. Pay Securely</li>
            </ul>
        </div>
        <div
            data-duration-in="400"
            data-duration-out="200"
            class="tabs-2 w-tabs mt-0 mb-0"
        >
            <div class="tabs-menu-v2-2 w-tab-menu mb-0">
                <div
                    data-w-tab="Tab 1"
                    class="tab-link-v2-2 w-inline-block w-tab-link"
                    :class="{ 'w--current': !isMonthly }"
                    @click="isMonthly = false"
                >
                    <div>Annual Plans</div>
                </div>
                <div
                    data-w-tab="Tab 2"
                    class="tab-link-v2-2 w-inline-block w-tab-link"
                    :class="{ 'w--current': isMonthly }"
                    @click="isMonthly = true"
                >
                    <div>Monthly Plans</div>
                </div>
            </div>
            <div class="full-width w-tab-content" v-if="loaded">
                <div
                    data-w-tab="Tab 1"
                    class="pricing-tab-content w-tab-pane"
                    :class="{ 'w--tab-active': !isMonthly }"
                >
                    <div class="d-block d-md-flex justify-content-around">
                        <div v-if="false" class="pricing-v2-card">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Free Trial</div>
                                <div class="pricing-v2-description">
                                    Try FREE for 7 days, see how GURU works for
                                    you!<br />
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>$0</div>
                                <div class="pricing-v2-billing-2">7 Days</div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>
                                            <strong>Unlimited Runs</strong>
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            For <strong>Personal</strong> Use
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            Access all features<strong></strong>
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            Free for 7 days<strong></strong>
                                        </div>
                                    </div>
                                    <!-- <div class="pricing-feature-2 no">
                    <div class="pricing-feature-icon-2 no"></div>
                    <div class="text-block-10">No CMS Content</div>
                  </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="pricing-v2-card mr-c15">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Maverick</div>
                                <div class="pricing-v2-description">
                                Create more, better, faster - without writer's block or wasted time.
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>{{ plans[2].amount }}</div>
                                <div class="pricing-v2-billing-2">
                                    billed annually
                                </div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Single User</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Unlimited Runs</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Personal or Professional Use</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Lifetime Updates</div>
                                        <div class="info">
                                            <div class="info-icon"></div>
                                            <div class="tooltip-2 hidden">
                                                <div>
                                                    Writing result-oriented ad
                                                    copy is difficult, as it
                                                    must appeal to, entice, and
                                                    convince consumers to take
                                                    action.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="pricing-feature-2">
                    <div class="text-block-11">CMS Content</div>
                  </div> -->
                                </div>
                                <button
                                    @click.prevent="toggleSelected(plans[2])"
                                    v-bind:class="{
                                        'btn-danger': plans[2] === activePlan,
                                    }"
                                    class="btn btn-outline-danger btn-block"
                                >
                                    {{
                                        plans[2] === activePlan
                                            ? "Selected"
                                            : "Select"
                                    }}
                                </button>
                            </div>
                            <div class="pricing-badge-2">
                                <div class="pricing-badge-icon"></div>
                                <div>Recommended</div>
                            </div>
                        </div>
                        <div class="pricing-v2-card ml-c15">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Squad</div>
                                <div class="pricing-v2-description">
                                      Save time, get more done, and boost your team's creativity.
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>{{ plans[3].amount }}</div>
                                <div class="pricing-v2-billing-2">
                                    billed annually
                                </div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Up to 5 users</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Unlimited Runs</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Personal or Professional Use</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Lifetime Updates</div>
                                        <div class="info">
                                            <div class="info-icon"></div>
                                            <div class="tooltip-2 hidden">
                                                <div>
                                                    Writing result-oriented ad
                                                    copy is difficult, as it
                                                    must appeal to, entice, and
                                                    convince consumers to take
                                                    action.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="pricing-feature-2 ew">
                    <div class="pricing-feature-icon-2 new"></div>
                    <div class="text-block-11">Interactions</div>
                    <div class="info">
                      <div class="tooltip-2 hidden">
                        <div>
                          Writing result-oriented ad copy is difficult, as it
                          must appeal to, entice, and convince consumers to take
                          action.
                        </div>
                      </div>
                    </div>
                  </div> -->
                                </div>
                                <button
                                    @click.prevent="toggleSelected(plans[3])"
                                    v-bind:class="{
                                        'btn-danger': plans[3] === activePlan,
                                    }"
                                    class="btn btn-outline-danger btn-block"
                                >
                                    {{
                                        plans[3] === activePlan
                                            ? "Selected"
                                            : "Select"
                                    }}
                                </button>
                            </div>
                            <div class="text-block-6 squad">
                                <br />Need more users?
                                <a
                                    href='https://www.helloscribe.ai/home/contact-us'
                                    target="_blank"
                                    >Contact us</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    data-w-tab="Tab 2"
                    class="pricing-tab-content w-tab-pane"
                    :class="{ 'w--tab-active': isMonthly }"
                >
                    <div class="d-block d-md-flex justify-content-around">
                        <div v-if="false" class="pricing-v2-card">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Free Trial</div>
                                <div class="pricing-v2-description">
                                    Try us free for 7 days. Cancel anytime if
                                    you don&#x27;t like it.
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>$0</div>
                                <div class="pricing-v2-billing-2">7 Days</div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            <strong>Unlimited Runs</strong>
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            For <strong>Personal</strong> Use
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <div
                                            class="pricing-feature-icon-2"
                                        ></div>
                                        <div>
                                            Free for 7 days<strong></strong>
                                        </div>
                                    </div>
                                    <div class="pricing-feature-2 no">
                                        <div
                                            class="pricing-feature-icon-2 no"
                                        ></div>
                                    </div>
                                    <div class="pricing-feature-2 no">
                                        <div
                                            class="pricing-feature-icon-2 no"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pricing-v2-card mr-c15">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Maverick</div>
                                <div class="pricing-v2-description">
                                 Create more, better, faster - without writer's block or wasted time.
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>{{ plans[0].amount }}</div>
                                <div class="pricing-v2-billing-2">
                                    per month
                                </div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Single User</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Unlimited Runs</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Personal or Professional Use</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Lifetime Updates</div>
                                        <div class="info">
                                            <div class="info-icon"></div>
                                            <div class="tooltip-2 hidden">
                                                <div>
                                                    Writing result-oriented ad
                                                    copy is difficult, as it
                                                    must appeal to, entice, and
                                                    convince consumers to take
                                                    action.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    @click.prevent="toggleSelected(plans[0])"
                                    v-bind:class="{
                                        'btn-danger': plans[0] === activePlan,
                                    }"
                                    class="btn btn-outline-danger btn-block"
                                >
                                    {{
                                        plans[0] === activePlan
                                            ? "Selected"
                                            : "Select"
                                    }}
                                </button>
                            </div>
                        </div>
                        <div class="pricing-v2-card ml-c15">
                            <div class="pricing-v2-header-2">
                                <div class="pricing-v2-name">Squad</div>
                                <div class="pricing-v2-description">
                                  Save time, get more done, and boost your team's creativity.
                                </div>
                                <img
                                    src="@/assets/images/icons/decor-v1.svg"
                                    alt=""
                                    class="pricing-v2-wave"
                                />
                                <div class="small-bg-elements">
                                    <div class="small-bg-element-5"></div>
                                    <div class="small-bg-element-6"></div>
                                    <div class="small-bg-element-4"></div>
                                </div>
                            </div>
                            <div class="pricing-v2-tag-2">
                                <div>{{ plans[1].amount }}</div>
                                <div class="pricing-v2-billing-2">
                                    per month/5 users
                                </div>
                            </div>
                            <div class="pricing-v2-card-info">
                                <div class="pricing-v2-features">
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Multiple Users</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Unlimited Runs</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Real-time collaboration</div>
                                    </div>
                                    <div class="pricing-feature-2">
                                        <img
                                            src="~@/assets/images/icons/checkcircle-pricing.png"
                                        />
                                        <div>Lifetime Updates</div>
                                        <div class="info">
                                            <div class="info-icon"></div>
                                            <div class="tooltip-2 hidden">
                                                <div>
                                                    Writing result-oriented ad
                                                    copy is difficult, as it
                                                    must appeal to, entice, and
                                                    convince consumers to take
                                                    action.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    @click.prevent="toggleSelected(plans[1])"
                                    v-bind:class="{
                                        'btn-danger': plans[1] === activePlan,
                                    }"
                                    class="btn btn-outline-danger btn-block"
                                >
                                    {{
                                        plans[1] === activePlan
                                            ? "Selected"
                                            : "Select"
                                    }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="next-step-billing">
            <a @click="next_clicked"
                >Next: Confirm payments details
                <img src="~@/assets/images/icons/arrow-nexxt.png"
            /></a>
        </div>
    </div>
</template>
<script>
import * as paymentService from "../../../services/PaymentService";
export default {
    name: "SubscriptionPlans",
    props: ["plan"],
    data() {
        return {
            isMonthly: true,
            loaded: false,
            activePlan: this.plan,
        };
    },
    beforeCreate: function () {
        paymentService
            .getHelloScribePlans()
            .then(
                function (response) {
                    if (response) {
                        this.plans = response.data.product.plans;
                        this.loaded = true;
                    }
                }.bind(this)
            )
            .catch(function (error) {
                console.error(error);
            });
    },
    methods: {
        toggleSelected: function (item) {
            this.activePlan = item;
            this.$emit("toggleSelected", item);
        },
        next_clicked() {
            this.$emit("next_clicked");
        },
    },
};
</script>

<style lang="scss" scoped>
a {
    cursor: pointer;
}
</style>
