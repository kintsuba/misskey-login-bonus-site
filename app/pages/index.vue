<template>
  <UContainer>
    <h2 class="mt-8 text-primary font-bold text-4xl">ログボメンバー</h2>
    <p class="my-4 text-gray-400 text-sm">
      1ヶ月以内に1回以上ログインしている人のみ表示しています。
    </p>

    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput v-model="q" placeholder="ユーザーを検索" />
    </div>
    <UTable
      v-model:sort="sort"
      sort-mode="manual"
      :rows="pagedRows"
      :columns="columns"
    >
      <template #avatar-data="{ row }">
        <NuxtImg :src="row.avatarUrl" loading="lazy" fit="fill" />
      </template>
      <template #username-data="{ row }">
        <ULink
          :to="`https://${row.host}/@${row.username}`"
          active-class="text-primary-700"
          inactive-class="text-primary"
          target="_blank"
        >
          {{ `${row.username}@${row.host}` }}
        </ULink>
      </template>
      <template #lastLoginDate-data="{ row }">
        {{ formatDate(row.lastLoginDate.toDate()) }}
      </template>
    </UTable>
    <div
      class="mb-8 flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="users.length"
      />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import {
  collectionGroup,
  query,
  type Timestamp,
  where,
} from "firebase/firestore";
import { type User } from "~/types/user";

const sort = ref({
  column: "lastLoginDate",
  direction: "desc" as "asc" | "desc",
});

const columns = [
  {
    key: "avatar",
    rowClass: "w-16",
  },
  {
    key: "name",
    label: "名前",
    rowClass: "max-w-60 truncate",
  },
  {
    key: "username",
    label: "アカウント",
    class: "hidden md:table-cell",
    rowClass: "hidden lg:table-cell min-w-20 max-w-60 truncate",
  },
  {
    key: "totalLoginDays",
    label: "合計ログイン日数",
    sortable: true,
    direction: "desc" as const,
    rowClass: "min-w-24 text-center",
  },
  {
    key: "continuousloginDays",
    label: "連続ログイン日数",
    sortable: true,
    direction: "desc" as const,
    rowClass: "min-w-24 text-center",
  },
  {
    key: "lastLoginDate",
    label: "最終ログイン日時",
    sortable: true,
    rowClass: "min-w-36 text-center",
  },
];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 月は0始まりのため+1する
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

const db = useFirestore();

const now = new Date();
const baseDate = new Date(now.setMonth(now.getMonth() - 1)); // 1か月以内にログインしていない人のデータは取得しない
const users = useCollection<User>(
  query(collectionGroup(db, "users"), where("lastLoginDate", ">=", baseDate))
);

const q = ref("");

const compareNumber = (
  a: number | undefined,
  b: number | undefined,
  isDesc = false
) => {
  if (!a || !b) return 0;
  if (!isDesc) {
    return a - b;
  } else {
    return b - a;
  }
};
const compareTimestamp = (
  a: Timestamp | undefined,
  b: Timestamp | undefined,
  isDesc = false
) => {
  if (!a || !b) return 0;

  if (!isDesc) {
    return a.seconds - b.seconds;
  } else {
    return b.seconds - a.seconds;
  }
};

const compareUser = (a: User, b: User) => {
  const isDesc = sort.value.direction === "desc" ? true : false;

  switch (sort.value.column) {
    case "totalLoginDays":
      return compareNumber(a.totalLoginDays, b.totalLoginDays, isDesc);
    case "continuousloginDays":
      if (!a.totalLoginDays || !b.totalLoginDays) return 0;
      return compareNumber(a.totalLoginDays, b.totalLoginDays, isDesc);
    case "lastLoginDate":
      return compareTimestamp(a.lastLoginDate, b.lastLoginDate, isDesc);
    default:
      return 0;
  }
};

const searchedRows = computed(() => {
  if (!q.value) {
    return users.value.toSorted(compareUser);
  }

  return users.value.toSorted(compareUser).filter((user) => {
    return Object.values(user).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const page = ref(1);
const pageCount = 10;

const pagedRows = computed(() => {
  return searchedRows.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});
</script>
