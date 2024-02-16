import FileIcon from "../icons/file";

export default function FileItem({name, parent, level}) {
    const styleColor = `var(--${name[0].toUpperCase()})`;
    return (
        <li
            style={{
                marginLeft: `${level * 16 + 4}px`,
            }}
            className="p-1 cursor-pointer rounded"
            draggable
        >
            <div className="w-fit flex items-center space-x-1">
                <FileIcon color={styleColor} />
                <span className="select-none">{`${parent}/${name}`}</span>
            </div>
        </li>
    );
}
