interface IconProps {
    icon: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className = '' }) => {
    return (
        <span className={`material-symbols-outlined ${className}`}>
            {icon}
        </span>
    );
};

export default Icon;
