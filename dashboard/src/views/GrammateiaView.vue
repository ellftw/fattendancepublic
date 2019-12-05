<template>
  <v-flex xs8 offset-xs2 pt-3>
    <v-card>
      <v-card-title>
        Πίνακας σπουδαστών γραμματείας
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.surname }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.arithmosMitroou }}</td>
          <td class="text-xs-left">{{ props.item.semester }}</td>
          <td style="padding:0 0 0 0 ">
            <v-btn round small @click="sd(props.item.arithmosMitroou)">Διαγραφη</v-btn>
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
    <v-btn @click="dialog = true" round>Εκκινηση νεου εξαμηνου</v-btn>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Εκκινηση νεου εξαμηνου</v-card-title>
        <v-card-text>ΠΡΟΣΟΧΗ! Αν επιβεβαιωσετε το εξαμηνο θα ανεβει κατα ενα και θα επηρεασει ολα τα δεδομενα. Ειστε σιγουροι για την ανανεωση του εξαμηνου</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" flat @click="dialog = false">Disagree</v-btn>
          <v-btn color="pink darken-1" flat @click="semesterBegin()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Διαγραφη χρηστη</v-card-title>
        <v-card-text class="pa-5">ΠΡΟΣΟΧΗ! Ειστε σιγουροι οτι θελετε να διαγραψετε τον συγκεκριμενο χρηστη;</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="pink darken-1" flat @click="dialog1 = false">Disagree</v-btn>
          <v-btn color="pink darken-1" flat @click="deleteStudent(studentNumber)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290">
      <v-card>
        <v-card-title class="headline">Παρακαλω εισαγετε δακτυλικο αποτυπωμα</v-card-title>
        <v-card-text class="text-xs-center"><v-icon x-large>{{fingericon}}</v-icon></v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import StudentService from '@/services/StudentService'
import UserService from '@/services/UserService'
import FingerprintService from '@/services/FingerprintService'
import util from '@/utils/util.js'

export default {
  name: 'grammateia',
  data () {
    return {
      dialog: false,
      dialog1: false,
      dialog3: false,
      response1: '',
      fingericon: 'fas fa-fingerprint',
      loader: null,
      studentNumber: 0,
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
        { text: 'Αριθμός Μητρώου', value: 'arithmosMitroou' },
        { text: 'Εξάμηνο', value: 'semester' },
        { text: 'Επιλογες', value: '', sortable: false }
        // { text: 'Περασμένα Μαθήματα', value: 'perasmena' }
      ],
      students: []
    }
  },
  watch: {},
  mounted () {
    this.getAllStudents()
  },
  methods: {
    async getAllStudents () {
      try {
        this.students = await StudentService.getAllStudents()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteStudent (arithmosMitroou) {
      try {
        // eslint-disable-next-line
        if (this.response1.fingerprint[0].fid == this.$store.getters.user.fingerprintID) {
          let response = await StudentService.deleteStudent(arithmosMitroou)
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
    async semesterBegin () {
      try {
        let semester = await UserService.semesterBegin()
        if (semester.data.success === true) {
          location.reload(true)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async sd (sn) {
      try {
        this.dialog3 = true
        this.response1 = await FingerprintService.getFingerprint()
        this.studentNumber = sn
        while (this.response1.fingerprint.length === 0) {
          let toConfirm = await FingerprintService.getFingerprint()
          if (toConfirm.fingerprint !== undefined) {
            this.response1 = toConfirm
          }
          await util.sleep(1500)
        }
        if (this.response1.fingerprint.length !== 0) {
          this.dialog3 = false
          this.dialog1 = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
