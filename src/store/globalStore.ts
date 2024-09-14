import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ProfileType } from '~/types';

type State = {
    user: Partial<ProfileType>
}

type Actions = {
    setUser: (user: ProfileType) => void
}

const defaultState: State = {
    user: {
    }
}

export const useGlobalStore = create<{ state: State } & Actions>()(
    persist(
        immer((set) => ({
            state: defaultState,
            setUser: (user) => set(({ state }) => {
                state.user = user
            })
        })),
        { name: 'get-started' },
    )
)