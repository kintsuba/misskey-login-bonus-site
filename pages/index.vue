<template>
  <v-container fill-height>
    <v-sheet elevation="2" class="pa-4">
      <v-row>
        <v-col>
          <div class="page-title">
            <v-icon color="primary">fas fa-crown</v-icon>
            <h1 class="page-title">
              ランキング
            </h1>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          ><v-text-field
            v-model="search"
            append-icon="fas fa-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :search="search"
        :items="users"
        sort-by="experience"
        sort-desc
        item-key="name"
      >
        <template v-slot:item.icon="{ item }">
          <v-img
            :src="item.avatarUrl"
            aspect-ratio="1"
            class="cursorPointer"
            @click="linkAccount(item.username, item.host)"
          ></v-img>
        </template>
        <template v-slot:item.account="{ item }">
          <p
            class="primary--text cursorPointer"
            @click="linkAccount(item.username, item.host)"
          >
            {{ item.username }}@{{ item.host }}
          </p>
        </template>
        <template v-slot:item.loginCheck="{ item }">
          <v-icon v-if="item.isLogin" dense>fas fa-check</v-icon>
        </template>
      </v-data-table>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import db from '~/plugins/firebase'

const getData = async () => {
  const users = await db.collectionGroup('users').get()
  const usersArray: firebase.firestore.DocumentData[] = []
  users.forEach((user) => {
    usersArray.push(user.data())
  })
  return usersArray
}

export interface DataType {
  users: firebase.firestore.DocumentData[]
  selected: any
  search: string
  headers: {
    value: string
    sortable?: boolean
    align?: string
    width?: number
    text?: string
  }[]
}

export default Vue.extend({
  components: {},
  async asyncData() {
    if (process.server) {
      return { users: await getData() }
    }
  },
  data(): DataType {
    return {
      users: [],
      selected: [],
      search: '',
      headers: [
        {
          value: 'icon',
          sortable: false,
          align: 'center',
          width: 90,
        },
        {
          text: '名前',
          align: 'center',
          sortable: false,
          value: 'name',
          width: 200,
        },
        {
          text: 'アカウント',
          value: 'account',
          align: 'center',
          sortable: false,
          width: 180,
        },
        { text: 'レベル', value: 'level', width: 100, align: 'center' },

        { text: '経験値', value: 'experience', width: 120, align: 'center' },
        {
          text: '次のレベルまで',
          value: 'experienceNextLevelNeed',
          width: 100,
          align: 'center',
        },
        {
          text: '連続ログイン日数',
          value: 'continuousloginDays',
          width: 100,
          align: 'center',
        },
        {
          text: '合計ログイン日数',
          value: 'totalLoginDays',
          width: 100,
          align: 'center',
        },
        {
          text: '今日のログイン',
          value: 'loginCheck',
          width: 85,
          align: 'center',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    cardClass() {
      return this.$vuetify.theme.dark ? 'dark-card' : 'light-card'
    },
  },
  async created() {
    if (!process.server) {
      this.users = await getData()
    }
  },
  methods: {
    linkAccount(username: string, host: string) {
      window.open('https://' + host + '/@' + username, '_blank')
    },
  },
  head() {
    return {
      title: 'ログボ for Misskey',
    }
  },
})
</script>

<style lang="scss" scoped>
.title-logo {
  font-size: 5.5rem;
  font-family: 'Concert One', 'Nico Moji', cursive !important;
  color: rgba(244, 67, 54);
}

.page-title {
  display: inline;
  vertical-align: middle;
  margin: 0 auto;
}

.cursorPointer {
  cursor: pointer;
}
</style>
