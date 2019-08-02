<template>
    <v-layout>
        <v-flex>
            <v-data-iterator row wrap :items="items">
                <v-card>
                    <v-card-title>
                        <h1>{{title}}</h1>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                        <v-list-tile-content>{{props.item.studentCourses.name}}</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{props.item.attends.numberOfAttends}}</v-list-tile-content>
                    </v-list>
                </v-card>
            </v-data-iterator>
        </v-flex>
    </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>
