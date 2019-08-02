<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Παρουσίες:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.attends }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Βαθμολογία:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.examRating }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
          name: 'Μαθημα',
          attends: 9,
          examRating: 6.0,
        },
        {
          name: 'Μαθημα',
          attends: 7,
          examRating: 9.0,
        },
        {
          name: 'Μαθημα',
          attends: 2,
          examRating: 16.0,
        },
        {
          name: 'Μαθημα',
          attends: 5,
          examRating: 3.7,

        },
        {
          name: 'Μαθημα',
          attends: 6,
          examRating: 16.0,

        },
        {
          name: 'Μαθημα',
          attends: 5,
          examRating: 0.0,

        },
        {
          name: 'Μαθημα',
          attends: 2,
          examRating: 0.2,
        },
        {
          name: 'Μαθημα',
          attends: 8,
          examRating: 3.2,

        },
        {
          name: 'Μαθημα',
          attends: 2,
          examRating: 25.0,
        },
        {
          name: 'Μαθημα',
          attends: 8,
          examRating: 26.0,
        }
      ]
    }),
  
  }
</script>