<template>
    <b-modal
        id="InviteMemberModal"
        ref="InviteMemberModal"
        hide-footer
        hide-header
        title="Add new member"
        @shown="init"
    >
        <b-form @submit.stop.prevent="inviteMember">
            <div class="tab-content-body">
                <h3 class="mb-3">Add new member</h3>
                <b-form-group label="Name">
                    <b-form-input
                        v-model="member_name"
                        placeholder="Name of team member"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Email">
                    <b-form-input
                        v-model="member_email"
                        placeholder="e.g. example@gmail.com"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Role">
                    <b-form-input
                        v-model="member_role"
                        placeholder="e.g. owner"
                    ></b-form-input>
                </b-form-group>
                
                <div class="d-flex justify-content-between my-2 float-right">
                    <b-button
                        pill
                        type="submit"
                        variant="primary"
                        class="min-w-150px"
                        :disabled="creating"
                    >
                        <b-spinner small class="mr-2" v-if="creating" />
                        Add
                    </b-button>
                </div>
            </div>
        </b-form>
    </b-modal>
</template>
<script>

import { http } from '../../../services/HttpService';

export default {
    name: "InviteMemberModal",
    props: {
        project: Object,
    },
    data() {
        return {
            member_name: '',
            member_email: '',
            member_role: '',
            creating: false,
        };
    },
    methods: {
        async inviteMember() {
            
        },
        init() {
            
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped></style>
