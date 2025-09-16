export interface IBaseButtonProps {
    isActive?: boolean;
    action?: () => void;
}

export interface ILogoButtonProps extends IBaseButtonProps {
    route?: string;
}

export interface IAuthButtonProps extends IBaseButtonProps {
    route?: string;
}
