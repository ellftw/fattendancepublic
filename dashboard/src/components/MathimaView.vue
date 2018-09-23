<template>
    <div>
        <h3>
            Mathima - 05568 Athlitiki Eidiseografia II
        </h3>
        <h4>
            Kathigitis : {{teacher}}
            </h4>
        <ul>
            <li  v-for="student in registratedStudents" :key="student" v-bind:style="[student.present ? {'color': 'green'} : {'color':'red'}]">
                {{student.name}}
                {{student.arithmosMitroou}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'MathimaView',
  data () {
    return {
      registratedStudents: [ {'name': 'kalaitzidis', 'arithmosMitroou': '4ABB', 'present': true}, {'name': 'gkikas', 'arithmosMitroou': '4ABC', 'present': false} ],
      teacher: 'Raptopoulos'
    }
  }
}
</script>

<style scoped>
.present {
    color: green;
}
.not-present {
    color: red;
}

</style>
