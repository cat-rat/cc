import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserInfo {
  openid: string
  appid: string
  nickName: string
  avatarUrl: string
  gender: number
  phone: string
  creditScore: number
}

interface UserState {
  userInfo: UserInfo | null
  isLoggedIn: boolean
  setUserInfo: (info: UserInfo) => void
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      isLoggedIn: false,

      setUserInfo: (info) =>
        set({
          userInfo: info,
          isLoggedIn: true
        }),

      clearUserInfo: () =>
        set({
          userInfo: null,
          isLoggedIn: false
        })
    }),
    {
      name: 'user-storage'
    }
  )
)
