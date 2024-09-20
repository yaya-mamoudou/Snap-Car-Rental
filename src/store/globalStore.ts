import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ActiveBookingType, ProfileType } from '~/types';

type State = {
    user: Partial<ProfileType>,
    activeBookingDetails: Partial<ActiveBookingType>
}

type Actions = {
    setUser: (user: ProfileType) => void
    setActiveBooking: (bookingInfo: ActiveBookingType) => void
}

const defaultState: State = {
    user: {
    },
    activeBookingDetails: {}

}

export const useGlobalStore = create<{ state: State } & Actions>()(
    persist(
        immer((set) => ({
            state: defaultState,
            setUser(user) {
                set(({ state }) => {
                    state.user = user
                })
            },
            setActiveBooking(bookingInfo) {
                set(({ state }) => {
                    state.activeBookingDetails = bookingInfo
                })
            },
        })),
        { name: 'get-started' },
    )
)