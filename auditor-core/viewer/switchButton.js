export function mountSwitchButton(root, callback) {

    const button = document.createElement("button");

    button.innerText = "Switch Mode";

    button.onclick = () => {
        callback("portable");
    };

    root.appendChild(button);
}