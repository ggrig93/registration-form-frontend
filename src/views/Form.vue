<template>
    <div>
        <v-app id="inspire" dark>
            <v-layout justify-center>
                <v-flex xs12 sm10 md8 lg6>
                    <v-card class="mt-5">
                        <v-card-text>
                            <div>
                                <v-list-item-content>Name</v-list-item-content>
                                <v-text-field
                                    ref="name"
                                    v-model="form.name"
                                    placeholder="name"
                                    required
                                ></v-text-field>
                              <span class="errorMessage" v-if="errorStatus.name">{{errorStatus.name[0]}}</span>

                            </div>
                            <div>
                                <div class="search-wrap">
                                    <v-list-item-content>Country</v-list-item-content>
                                    <v-autocomplete
                                        v-model="countryItem"
                                        :items="countries"
                                        item-text="name"
                                        return-object
                                    >
                                    </v-autocomplete>
                                </div>
                            </div>

                            <div class="phone-input_wrap">
                                <v-list-item-content>Phone</v-list-item-content>
                                <span class="country-code" v-if="countryItem">{{countryItem.idd}}</span>
                                <v-text-field
                                    @input="acceptNumber"
                                    :rules="[v => !!v || 'This field is required',
                                    v => /^(\d+-?)+\d+$/.test(v) || 'This field only accept numbers']"
                                    v-model="form.phone"
                                    type="text"
                                    class="phone-input"
                                    required
                                ></v-text-field>

                            </div>
                            <div>
                                <v-list-item-content>Email</v-list-item-content>
                                <v-text-field
                                    ref="name"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    :rules="[v => !!v || 'This field is required']"
                                ></v-text-field>
                              <span class="errorMessage" v-if="errorStatus.email">{{errorStatus.email[0]}}</span>
                            </div>
                            <div>
                                <v-list-item-content>Password</v-list-item-content>
                                <v-text-field
                                    ref="name"
                                    v-model="form.password"
                                    type="password"
                                    required
                                    :rules="[v => !!v || 'This field is required']"
                                ></v-text-field>
                              <span class="errorMessage" v-if="errorStatus.password">{{errorStatus.password[0]}}</span>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary"  @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-app>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default {
    name:"Form",
    data(){
        return {
            allowSpaces: false,
            match: 'Foobar',
            max: 0,
            model: 'Foobar',
            countryItem:'',
            form:{
                name: "",
                email: "",
                phone: "",
                password: ""
            }
        }
    },
    async mounted() {
      await this.getCountries()
    },
    methods:{
        ...mapActions(['getCountries','userCreate']),
      acceptNumber() {
        let x = this.form.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,6})/);
        this.form.phone = !x[2] ? x[1] :  x[1] + '-' + x[2] + '-' + (x[3] ? '-' + x[3] : '');
      },
        save() {
            const data = {...this.form}
            data.country_id = this.countryItem.id
            data.phone =  this.countryItem.idd + data.phone.split("-").join("")
            this.userCreate(data)
        },
    },
    computed:{
        ...mapGetters(['countries','errorStatus']),
    }

}
</script>

<style scoped>
.form-parent {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form {
    padding: 30px 20px ;
    background: #F2F2F2;
    width: 300px;
}
.form div {
 display: flex;
 flex-direction: column;
}
.form div:not(:last-child){
    margin-bottom: 30px;
}
.form div label {
    color: #434850;
    margin-bottom: 8px;

}
.form div input {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 15px;
}
.form div select {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 15px;
}
.phone-input_wrap {
    position: relative;
}
.country-code {
    position: absolute;
    left: 5px;
    top: 55%;
}
.phone-input {
    padding-left: 50px!important;
}
.phone-input input[type='number'] {
    -moz-appearance:textfield;
}
.phone-input >>> input::-webkit-outer-spin-button,
.phone-input >>> input::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}
.errorMessage {
  font-size: 12px;
  color: red;
}
</style>