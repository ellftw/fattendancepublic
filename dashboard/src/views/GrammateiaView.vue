<template>
    <div>
        <h3>
            Interface grammateias mhxanikwn plhroforikhs
        </h3>
        <h4>
            Grammateas : {{grammateas}}
        </h4>
            <li class="li"  v-for="student in registratedStudents" :key="student" v-bind:style="[student.present ? {'color': 'green'} : {'color':'red'}]">
                {{student.surname}}
                {{student.name}}
                {{student.arithmosMitroou}}
            </li>
        Vres mathiti : {{parwnSearch}}
        <p v-bind:class="parwnSearch">
            <input type="text" v-on:input="parwnSearch = $event.target.value"/>
        </p>
        <p>
  <v-flex text-xs-center>
    <v-btn round
      :loading="loading"
      :disabled="loading"
      color="blue-grey"
      class="white--text"
      @click="loader = 'loading'"
    >
      Εκτύπωση Βεβαίωσης Σπουδών
      <v-icon right dark>mdi-printer</v-icon>
    </v-btn>
    <v-btn round
      :loading="loading1"
      :disabled="loading1"
      color="blue-grey"
      class="white--text"
      @click="loader = 'loading1'"
    >
    Εμφάνισε Όλα Τα Μαθήματαa
      <v-icon right dark>mdi-book-variant</v-icon>
    </v-btn>
  </v-flex>
</p>
    </div>
</template>

<script>
export default {
  name: 'grammateia',
  data () {
    return {
      loader: null,
      loading: false,
      loading1: false,
      registratedStudents: [
        {
          'name': 'alex',
          'surname': 'kalaitzidis',
          'arithmosMitroou': '3253',
          'present': true
        },
        {
          'name': 'rafahl',
          'surname': 'savvidis',
          'arithmosMitroou': '3254',
          'present': false
        }
      ],
      grammateas: 'kyrafrosw'
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    }
  }
}
</script>

<style scoped>

</style>
