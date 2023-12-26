import {useUserProfile} from "shared/utils/hooks/use-user-profile";
import {Role} from "shared/utils/types";

export const useRole = () => {
    const data = useUserProfile()

    return data.data?.role || Role.USER
}