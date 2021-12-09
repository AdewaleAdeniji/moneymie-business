import { createStandaloneToast } from '@chakra-ui/react'

const toast = createStandaloneToast()
// const customToast = createStandaloneToast({ theme: yourCustomTheme })

export const showToast = (status, title) => {
    toast({
        position: "top-right",
        title,
        status,
        duration: 2000,
    })
}
