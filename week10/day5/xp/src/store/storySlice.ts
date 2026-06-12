import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Story = {
  id: number
  title: string
  content: string
}

type StoriesState = {
  items: Story[]
  selected?: Story | null
}

const initialState: StoriesState = {
  items: [],
  selected: null,
}

const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories(state, action: PayloadAction<Story[]>) {
      state.items = action.payload
    },
    setSelectedStory(state, action: PayloadAction<Story | null | undefined>) {
      state.selected = action.payload ?? null
    },
  },
})

export const { setStories, setSelectedStory } = storySlice.actions
export default storySlice.reducer

