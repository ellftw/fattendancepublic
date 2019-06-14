<template>
  <v-flex xs6 offset-xs3 pb-5 mb-5>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="firstname"
        :counter="30"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field v-model="lastname" :counter="30" :rules="nameRules" label="Last Name" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Department is required']"
        label="Department"
        required
      ></v-select>
      <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-account"
          readonly
        ></v-text-field>
        <v-date-picker
          :rules="ageRules"
          ref="picker"
          v-model="date"
          :max="new Date().toISOString().substr(0, 10)"
          min="1970-01-01"
          @change="save"
        ></v-date-picker>
      </v-menu>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn round :disabled="!valid" color="success" @click="validate">Validate</v-btn>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 30) || 'Name must be less than 30 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'Μηχανικών Πληροφορικής',
      'Λογιστική',
      'Διοίκηση Επιχειρήσεων',
      'Φυσικού αερίου και πετρελαίου',
      'Διαχείρηση Πληροφοριών',
      'Ηλεκτρολόγων Μηχανικών'
    ],
    age: '',
    ageRules: [
      v => !!v || 'Age is required',
      v => (v && v > 16) || 'You should be over 16 years old'
    ],
    checkbox: false
  }),
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        console.log('validated')
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
