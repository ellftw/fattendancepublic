<template>
<v-container>
  <v-layout column justify-space-between align-space-between>
    <v-flex v-if="isLoggedIn && userType === 'γραμματέας'">
      <v-text-field v-model="createAnnouncement.title" label="Τίτλος Ανακοίνωσης" solo class="pt-3 mt-3"></v-text-field>
      <v-textarea v-model="createAnnouncement.content" class="pt-2 mt-2" outline name="input-7-4" label="Ανακοίνωση"></v-textarea>
      <v-btn @click="createAnAnnouncement(createAnnouncement)" round>Ανάρτηση</v-btn>
    </v-flex>
    <v-flex pt-3 mt-3 >
      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <!-- eslint-disable-next-line -->
            <v-flex v-for="ann in announcements" xs3>
              <v-card color="blue-grey darken-2" class="white--text" height="200">
                <v-card-title primary-title>
                  <div>
                    <div class="headline pb-3">{{ann.title}}</div>
                    <div class="content" ><span>{{ann.content.substring(0,75)+ '...'}}</span></div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn @click="showFull(ann.title, ann.content)" flat dark>See full post</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex pa-3 ma-3 v-if="fullAnnouncement">
      <v-card color="blue-grey darken-2" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline pb-3">{{fullAnnouncementTitle}}</div>
            <div><span>{{fullAnnouncement}}</span></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>

</template>

<script>
/* eslint-disable */

import AnnouncementService from '@/services/AnnouncementService'
export default {
  data () {
    return {
      announcements: [],
      fullAnnouncementTitle: '',
      fullAnnouncement: '',
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
      let response = await AnnouncementService.createAnnouncement(ann)
      if (response.success === true) {
        this.createAnnouncement = {
          title: '',
          content: ''
        }
      }
    },
    async showFull (title, content) {
      this.fullAnnouncement = content
      this.fullAnnouncementTitle = title
    }
  }
}
</script>

<style>
.content {
  word-break: break-word;
}

.v-card__actions{
  position:absolute;
  bottom: 0px;
}
</style>
