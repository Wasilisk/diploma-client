import {Role} from "shared/utils/types";

export const profileMenuConfig = [
    {
        label: 'Мої замовлення',
        to: '/profile/orders',
        role: [Role.USER],
    },
    {
        label: 'Мої екскурсії',
        to: '/profile/my-tours',
        role: [Role.GUIDE, Role.MODERATOR],
    },
    {
        label: 'Налаштування профілю',
        to: '/profile/account-settings',
        role: [Role.USER, Role.MODERATOR, Role.GUIDE, Role.ADMIN],
    },
    {
        label: 'Написати в підтримку',
        to: '/profile/support',
        role: [Role.USER, Role.GUIDE],
    },
    {
        label: 'Керування користувачами',
        to: '/profile/user-management',
        role: [Role.ADMIN, Role.MODERATOR],
    },
    {
        label: 'Технічна підтримка',
        to: '/profile/technical-support',
        role: [Role.MODERATOR, Role.ADMIN],
    },
    {
        label: 'Запити на гіда',
        to: '/profile/guide-permission-requests',
        role: [Role.MODERATOR, Role.ADMIN],
    },
];