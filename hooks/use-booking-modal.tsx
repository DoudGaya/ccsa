import { SanityTypes } from "@/@types"
import { create } from "zustand"
// import type { Events } from "@/types"

interface BookingModalStore {
  isOpen: boolean
  event: SanityTypes.Events | null
  onOpen: (event: SanityTypes.Events) => void
  onClose: () => void
}

export const useBookingModal = create<BookingModalStore>((set) => ({
  isOpen: false,
  event: null,
  onOpen: (event) => set({ isOpen: true, event }),
  onClose: () => set({ isOpen: false }),
}))

