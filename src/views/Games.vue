<template>
  <div class="w-full flex justify-center px-3 sm:px-6">
    <div
      class="container w-full flex flex-col space-y-32 sm:space-y-14 md:space-y-0 md:flex-row justify-between md:space-x-8 lg:space-x-14 xl:space-x-20"
    >
      <form
        class="flex flex-col space-y-6 bg-app-card-bg p-4 mb-auto md:w-64 xl:w-72"
        @input="filterEntries"
      >
        <h2 class="font">Filter Results</h2>
        <DefaultInput
          v-model="name"
          label="Name (contains)"
          placeholder="Text string"
        />
        <div
          class="flex flex-col justify-between space-y-6 sm:flex-row md:flex-col sm:space-y-0 sm:space-x-4 md:space-x-0 md:space-y-6"
        >
          <DefaultInput
            v-model="minScore"
            label="Minimum Score"
            placeholder="1 - 10"
          />
          <DefaultSelect
            v-model="orderBy"
            class="sm:flex-1 md:flex-auto"
            label="Order By"
            :options="orderByOptions"
          >
            <SlotButton>
              <Arrow />
            </SlotButton>
          </DefaultSelect>
          <div class="flex">
            <SlotButton
              class="mt-auto md:mt-0 md:ml-auto text-sm"
              @click="clearFilter"
            >
              <span>Clear</span>
            </SlotButton>
          </div>
        </div>
      </form>
      <div v-if="loading" class="w-full flex">
        <span class="m-auto">Loading...</span>
      </div>
      <div v-else-if="error" class="w-full flex">
        <span class="text-red-500 m-auto">{{ error }}</span>
      </div>
      <div
        v-else-if="displayGames.length"
        class="flex-1 flex flex-col space-y-32 sm:space-y-4 md:space-y-3"
      >
        <div
          v-for="(game, index) in displayGames"
          :key="index"
          class="relative bg-app-card-bg p-4 flex sm:space-x-4"
        >
          <div class="flex-1">
            <h3 class="text-lg">{{ game.name }}</h3>
            <p>Release Date: {{ getDate(game.first_release_date) }}</p>
            <p class="text-cs">{{ game.summary }}</p>
          </div>
          <div
            class="absolute right-2 -top-20 sm:static flex h-10 w-10 text-lg bg-app-btn-default rounded-full p-2 ml-auto my-auto"
          >
            <span class="m-auto font-heading">{{
              Math.floor(game.rating / 10)
            }}</span>
          </div>
        </div>
      </div>
      <div v-else class="w-full flex">
        <span class="m-auto">There are no entries to show.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultInput from '../components/inputs/DefaultInput.vue'
import DefaultSelect from '../components/inputs/DefaultSelect.vue'
import SlotButton from '../components/buttons/SlotButton.vue'
import Arrow from '../components/graphics/Arrow.vue'
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'

interface Game {
  id: number
  first_release_date: number
  name: string
  rating: number
  summary: string
}

const games = ref<Game[]>([])
const displayGames = ref<Game[]>([])

const loading = ref(false)
const error = ref('')
onMounted(async () => {
  loading.value = true
  games.value = await axios
    .get<Game[]>('http://public.connectnow.org.uk/applicant-test/')
    .then((res) => res.data)
    .catch((err) => (error.value = err.message))
    .finally(() => (loading.value = false))
})

watch(games, () => filterEntries())

const orderByOptions = [
  { name: 'Release Date', value: 'date' },
  { name: 'Score', value: 'score' },
  { name: 'Name', value: 'name' }
]
const name = ref('')
const minScore = ref('')
const orderBy = ref('date')

const filterEntries = async () => {
  await nextTick()
  let filteredGames = games.value
  if (name.value) {
    filteredGames = filteredGames.filter((games) =>
      games.name.toLowerCase().includes(name.value.toLowerCase())
    )
  }
  if (minScore.value) {
    filteredGames = filteredGames.filter(
      (game) => Math.floor(game.rating / 10) >= Number(minScore.value)
    )
  }
  if (orderBy.value) {
    switch (orderBy.value) {
      case 'date':
        filteredGames = filteredGames.sort((a, b) =>
          a.first_release_date > b.first_release_date ? -1 : 1
        )
        break
      case 'score':
        filteredGames = filteredGames.sort((a, b) =>
          Math.floor(a.rating / 10) > Math.floor(b.rating / 10) ? -1 : 1
        )
        break
      case 'name':
        filteredGames = filteredGames.sort((a, b) => (a.name > b.name ? 1 : -1))
        break
    }
  }
  displayGames.value = filteredGames
}

const clearFilter = () => {
  name.value = ''
  minScore.value = ''
  orderBy.value = 'date'
  displayGames.value = games.value
  filterEntries()
}

const getDate = (n: number) => {
  const date = new Date(n)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return day + '/' + month + '/' + year
}
</script>
