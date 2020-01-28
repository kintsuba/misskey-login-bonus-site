<template>
  <v-container fill-height>
    <v-card>
      <v-card-title>
        👑 ランキング
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :search="search"
        :items="users"
        sort-by="level"
        sort-desc
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item.icon="{ item }">
          <v-img :src="item.avatarUrl" aspect-ratio="1"></v-img>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import db from '~/plugins/firebase'

export default Vue.extend({
  components: {},
  async asyncData() {
    const users = await db.collectionGroup('users').get()
    const usersArray: firebase.firestore.DocumentData[] = []
    users.forEach((user) => {
      usersArray.push(user.data())
    })
    return { users: usersArray }
  },
  data() {
    return {
      selected: [],
      search: '',
      headers: [
        { text: 'アイコン', value: 'icon', align: 'center' },
        {
          text: '名前',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        { text: 'アカウント', value: 'username', align: 'center' },
        { text: 'レベル', value: 'level', width: 100, align: 'center' },

        { text: '経験値', value: 'experience', width: 150, align: 'center' },
        {
          text: '次のレベルまで必要な経験値',
          value: 'experienceNextLevelNeed',
          width: 150,
          align: 'center'
        },
        {
          text: '連続ログイン日数',
          value: 'continuousloginDays',
          width: 100,
          align: 'center'
        },
        {
          text: '合計ログイン日数',
          value: 'totalLoginDays',
          width: 100,
          align: 'center'
        }
      ]
    }
  },
  computed: {
    cardClass() {
      return this.$vuetify.theme.dark ? 'dark-card' : 'light-card'
    }
  },
  created() {
    this.$store.dispatch('setHostsRef', db.collection('users'))
  },
  head: {
    title: 'ログボ for Misskey'
  }
})
</script>

<style lang="scss" scoped>
.title-logo {
  font-size: 5.5rem;
  font-family: 'Concert One', 'Nico Moji', cursive !important;
  color: rgba(244, 67, 54);
}
.title-lead {
  font-size: 1.1rem;
  line-height: 1.8rem;
}
#title-card {
  border-radius: 5px;
  padding-top: 120px;
  padding-bottom: 120px;
}
.light-card {
  background-color: rgba(255, 255, 255, 0.7);
}
.dark-card {
  background-color: #454545;
}
</style>
