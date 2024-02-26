import FileIcon from "../icons/file";

export default function FileItem({item, parent, level}) {
    const styleColor = `var(--${item.name[0].toUpperCase()})`;
    const filePath = `${parent}${parent ? "/" : ""}${item.name}`;

    const handleClick = () => {
        console.log(`Selected ${filePath}`);
    };
    return (
        <li
            id={filePath}
            style={{
                marginLeft: `${level * 16 + 4}px`,
            }}
            className="p-1 cursor-pointer rounded-lg hover:bg-slate-700"
            draggable
            onClick={handleClick}
        >
            <div className="w-fit flex items-center">
                <FileIcon color={styleColor} />
                {item.name}
            </div>
        </li>
    );
}
