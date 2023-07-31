import './topBar.css';

interface Props {
    title: string;
}

export default function TopBar({title}: Props) {
    return (
        <>
            <div className="topbar">
                <h3>{title}</h3>
            </div>
        </>
    );
}