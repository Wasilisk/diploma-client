import {ReactElement} from "react";

export enum ContentStateEnum {
    showLoadingPlaceholder,
    showEmptyPlaceholder,
    showContent,
    showError,
}

export interface ContentStateProps {
    state: ContentStateEnum
    loadingPlaceholderComponent: ReactElement
    emptyPlaceholderComponent?: ReactElement
    errorComponent?: ReactElement
    children: ReactElement | ReactElement[];
    onReload?: () => void;
}