<template>
  <v-layout>
    <v-flex xs8 offset-xs2 pt-3>
      <v-card>
        <v-card-title>
          Πίνακας Καθηγητών γραμματείας
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="teachers" :search="search">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.surname}}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.teachingCourses }}</td>
            <td class="text-xs-left">
              <v-btn round small @click="cemail(props.item.email)">Διαγραφη</v-btn>
            </td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="mdi-alert"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
      </v-card>
      <v-dialog v-model="dialog1" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Διαγραφη χρηστη</v-card-title>
          <v-card-text>ΠΡΟΣΟΧΗ! Ειστε σιγουροι οτι θελετε να διαγραψετε τον συγκεκριμενο χρηστη;</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink darken-1" flat @click="dialog1 = false">Disagree</v-btn>
            <v-btn color="pink darken-1" flat @click="deleteTeacher(email)">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Παρακαλω εισαγετε δακτυλικο αποτυπωμα</v-card-title>
          <v-card-text class="text-xs-center">
            <v-icon x-large>{{fingericon}}</v-icon>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import TeacherService from '@/services/TeacherService'
import FingerprintService from '@/services/FingerprintService'
import util from '@/utils/util.js'

export default {
  name: 'Teachers',
  data () {
    return {
      dialog: false,
      dialog1: false,
      response1: '',
      fingericon: 'fas fa-fingerprint',
      email: '',
      loader: null,
      loading: false,
      loading1: false,
      search: '',
      headers: [
        {
          text: 'Επίθετο',
          align: 'left',
          sortable: true,
          value: 'surname'
        },
        { text: 'Όνομα', value: 'name' },
        { text: 'Διδάσκοντα Μαθήματα', value: 'teachingCourses' },
        { text: 'Επιλογές', value: '' }
      ],
      teachers: []

    }
  },
  watch: {},
  mounted () {
    this.getAllTeachers()
  },
  methods: {
    async getAllTeachers () {
      try {
        this.teachers = await TeacherService.getAllTeachers()
      } catch (error) {
        window.alert(error)
      }
    },
    async deleteTeacher (email) {
      try {
        // eslint-disable-next-line
        if (this.response1.fingerprint[0].fid == this.$store.getters.user.fingerprintID) {
          let response = await TeacherService.deleteTeacher(email)
          if (response.deletedCount === 1) {
            await FingerprintService.cleanFingerprint()
            location.reload(true)
          }
        } else {
          await FingerprintService.cleanFingerprint()
          this.dialog1 = false
          window.alert('not correct fingerprint')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async cemail (email) {
      try {
        this.dialog = true
        this.response1 = await FingerprintService.getFingerprint()
        this.email = email
        while (this.response1.fingerprint.length === 0) {
          let toConfirm = await FingerprintService.getFingerprint()
          if (toConfirm.fingerprint !== undefined) {
            this.response1 = toConfirm
          }
          await util.sleep(1500)
        }
        if (this.response1.fingerprint.length !== 0) {
          this.dialog = false
          await FingerprintService.cleanFingerprint()
          this.dialog1 = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
