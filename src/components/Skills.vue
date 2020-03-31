<template>
    <div class="hello">
        <h1>Skills</h1>
        {{ name }}

        {{ btnState ? 'The button is disabled' : 'The button is active' }}

        <button v-bind:disabled="btnState">Change Name</button> <!-- v-on:click="changename"  -->

        <br>
        <hr>

        <div class="holder">
            <form @submit.prevent="addSkill">
                <div style="position: relative;">
                    <input type="text" placeholder="Enter a skill you have.." v-model="skill"
                           v-validate="'min:2'" name="skill"/>

                    <transition name="alert-in" enter-active-class="animated fadeInDown"
                                leave-active-class="animated fadeOutDown">
                    <span style="position: absolute; bottom: -20px; left: 0;" class="alert"
                          v-if="errors.has('skill')">
                        {{ errors.first('skill') }}
                    </span>
                    </transition>
                </div>
                <!-- <input type="checkbox" v-model="checked" /> -->
            </form>
            <ul>
                <transition-group name="list" enter-active-class="animated bounceInUp"
                                  leave-active-class="animated bounceOutDown">
                    <li v-for="(data, index) in skills" :key="index">
                        <div v-if="data.edit" class="space-between">
                            <input type="text" placeholder="Enter a skill you have.." v-model="data.skill"
                                   v-validate="'min:2'" name="skill" style="width: 50%; height: .5rem;"
                                   @keyup.enter="saveEditSkill(data)"/>

                            <div class="center-vertical">
                                <i class="fas fa-save skill-minus"
                                   v-on:click="saveEditSkill(data)"></i>
                                <i class="fas fa-stop-circle skill-minus"
                                   v-on:click="cancelEditSkill(data.id)"></i>
                            </div>
                        </div>
                        <div v-else class="space-between">
                            {{ data.skill }}
                            <div class="center-vertical">
                                <i class="fas fa-pencil-alt skill-minus"
                                   v-on:click="setEditSkill(data.id)"></i>
                                <i class="fas fa-times-circle skill-minus"
                                   v-on:click="removeSkill(data.id)"></i>
                            </div>
                        </div>
                    </li>
                </transition-group>
            </ul>
            <p>These are the skills that you possess.</p>

            <div v-bind:class="alertObject"></div>
            <br>

            <div v-bind:class="{ alert2: !showAlert, 'another-class2': !showClass }"></div>
            <br>

            <div v-bind:style="{ backgroundColor: bgColor, width: bgWidth, height: bgHeight }">
            </div>
        </div>
    </div>
</template>

<script>
    import {db} from "../firebase";

    export default {
        name: 'Skills',
        data() {
            return {
                name: 'Dallin Johnson',
                btnState: true,
                // checked: false,
                skill: '',
                // skills: [
                //     {'skill': 'Vue.js'},
                //     {'skill': 'Ruby'},
                //     {'skill': 'Python'},
                //     {'skill': 'Web2py'},
                //     {'skill': 'Django'}
                // ],
                skills: [],
                alertObject: {
                    alert1: true,
                    'another-class1': true
                },
                showAlert: false,
                showClass: false,
                bgColor: 'yellow',
                bgWidth: '100%',
                bgHeight: '30px'
            }
        },
        firestore: {
            skills: db.collection('skills').orderBy('createdAt'),
        },
        methods: {
            addSkill() {
                // this.$validator.validateAll().then((result) => {
                //     if (result) {
                //         this.skills.push({skill: this.skill});
                //         this.skill = '';
                //         // console.log(this.checked);
                //     } else {
                //         console.log('Not Valid')
                //     }
                // })
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        db.collection('skills').add({
                            skill: this.skill,
                            edit: false,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                        this.skill = '';
                        // console.log(this.checked);
                    } else {
                        console.log('Not Valid')
                    }
                })
            },
            removeSkill(id) {
                // this.skills.splice(id, 1);
                db.collection('skills').doc(id).delete();
            },
            setEditSkill(id) {
                db.collection('skills').doc(id).update({edit: true});
            },
            cancelEditSkill(id) {
                db.collection('skills').doc(id).update({edit: false});
            },
            saveEditSkill(data) {
                data.edit = false;
                db.collection('skills').doc(data.id).update(data);
            }
        },
        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .alert1 {
        background-color: yellow;
        height: 100px;
    }

    .another-class1 {
        border: 3px solid black;
    }

    .alert2 {
        background-color: black;
        height: 100px;
    }

    .another-class2 {
        border: 3px solid blue;
    }

    .holder {
        background: #fff;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    ul li {
        padding: 20px;
        font-size: 1.3em;
        background-color: #E0EDF4;
        border-left: 5px solid #3EB3F6;
        margin-bottom: 2px;
        color: #3E5252;
    }

    p {
        text-align: center;
        padding: 30px 0;
        color: gray;
    }

    .container {
        box-shadow: 0px 0px 40px lightgray;
    }

    input {
        width: calc(100% - 40px);
        border: 0;
        padding: 20px;
        font-size: 1.3em;
        background-color: #323333;
        color: #687F7F;
    }

    .alert {
        background: #fdf2ce;
        font-weight: bold;
        display: inline-block;
        padding: 5px;
        margin-top: -1px;
    }

    .alert-in-enter-active {
        animation: bounce-in .7s;
    }

    .alert-in-leave-active {
        animation: bounce-in .7s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }

    i.skill-minus {
        /*float: right;*/
        cursor: pointer;
        margin-right: 1rem;
    }

    .space-between {
        display: flex;
        justify-content: space-between;
    }

    .center-vertical {
        display: flex;
        align-self: center;
    }
</style>
