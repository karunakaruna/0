import { useSyncState } from 'hyperfy'

export default function Box() {
  const [blue, dispatch] = useSyncState(state => state.blue)

  return (
    <app>
      <box color={blue ? 'blue' : 'red'} onClick={() => dispatch('toggle')} />
    </app>
  )
}

const initialState = {
  blue: false,
}

export function getStore(state = initialState) {
  return {
    state,
    actions: {
      toggle(state) {
        state.blue = !state.blue
      },
    },
  }
}