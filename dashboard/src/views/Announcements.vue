<template>
  <v-layout v-if="isLoggedIn && userType === 'γραμματέας'">
    <v-flex xs8 offset-xs2>
      <v-text-field v-model="createAnnouncement.title" label="Τίτλος Ανακοίνωσης" solo class="pt-3 mt-3"></v-text-field>
      <v-textarea v-model="createAnnouncement.content" class="pt-2 mt-2" outline name="input-7-4" label="Ανακοίνωση"></v-textarea>
      <v-btn @click="createAnAnnouncement(createAnnouncement)" round>Ανάρτηση</v-btn>
    </v-flex>
  </v-layout>
  <v-layout v-else>
    <v-flex xs10 offset-xs1>
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex v-for="ann in announcements" :key="ann" xs3>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline pb-3">{{ann.title}}</div>
                    <div class="content"><span>{{ann.content.substring(0,150)+ '...'}}</span></div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="ann.content" flat dark>See full post</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AnnouncementService from '@/services/AnnouncementService'
export default {
  data () {
    return {
      announcements: [],
      createAnnouncement: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    this.getAllAnnouncements()
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    userType: function () {
      return this.$store.getters.user.userType
    }
  },
  methods: {
    async getAllAnnouncements () {
      try {
        this.announcements = await AnnouncementService.getAllAnnouncement()
      } catch (error) {
        window.alert(error)
      }
    },
    async createAnAnnouncement () {
      let ann = {
        title: this.createAnnouncement.title,
        content: this.createAnnouncement.content
      }
      console.log(ann)
      await AnnouncementService.createAnnouncement(ann)
    }
  }
}
</script>

<style>
.content {
  word-break: break-word;
}
</style>
