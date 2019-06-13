<template>
<v-flex xs6 offset-xs3 pb-5 mb-5>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstname"
      :counter="30"
      :rules="nameRules"
      label="First Name"
      required
    ></v-text-field>

      <v-text-field
      v-model="lastname"
      :counter="30"
      :rules="nameRules"
      label="Last Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Department is required']"
      label="Department"
      required
    ></v-select>
<template>
          <v-text-field
            v-model="date"
            label="Ημερομηνία Γέννησης"
            prepend-icon=" mdi-calendar"
          ></v-text-field>
</template>
          <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-form>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    valid: true,
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

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
