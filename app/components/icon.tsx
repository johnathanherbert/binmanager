interface IconProps {
    icon: string;
    className?: string;
    href: string;
}

const Icon: React.FC<IconProps> = ({ icon, className = '', href = '' }) => {
    return (
        <span className={`material-symbols-outlined ${className} ${href}`}>
            {icon}
        </span>
    );
};

export default Icon;
