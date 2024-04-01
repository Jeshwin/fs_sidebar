export default function InteractionBlanket() {
    return (
        <div
            style={{
                zIndex: 10,
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                display: "var(--interactionBlanketDisplay)",
            }}
        ></div>
    );
}
