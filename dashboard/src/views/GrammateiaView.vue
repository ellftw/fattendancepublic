<template style="background-image: linear-gradient(#999 , #fff);">
    <div>
        <!-- <h3>
            Interface grammateias mhxanikwn plhroforikhs
        </h3>
        <h4>
            Grammateas : {{grammateas}}
        </h4>
            <li class="li"  v-for="student in registratedStudents" :key="student" v-bind:style="[student.present ? {'color': 'green', 'textShadow': '0px 0px 4px white'} : {'color':'red', 'textShadow': '0px 0px 4px black'}]">
                {{student.surname}}
                {{student.name}}
                {{student.arithmosMitroou}}
            </li>
        Vres mathiti : {{parwnSearch}}
        <p v-bind:class="parwnSearch">
            <input type="text" v-on:input="parwnSearch = $event.target.value"/>
        </p>
        <p>
            <button class="button" > Ektupwse bebaiwsh spoudwn
            </button>
            <button class="button" > Emfanise mathimata
            </button>
        </p> -->
    </div>
</template>

<script>
export default {
  name: 'grammateia',
  data () {
    return {
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
  }
}
</script>

<style scoped>

</style>
