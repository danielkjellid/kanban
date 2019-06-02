//creating objects that holds all information 
let tags = [
    {
        id: 1,
        tagName: "Markedsplan",
        tagColor: "#dac4ff",
        tagTextColor: "#3a106b"
    },
    {
        id: 2,
        tagName: "Markedsaktivitet",
        tagColor: "#ffbdbd",
        tagTextColor: "#850303"
    },
    {
        id: 3,
        tagName: "SoMe",
        tagColor: "#c1fef6",
        tagTextColor: "#166b6e"
    },
    {
        id: 4,
        tagName: "Kampanje",
        tagColor: "#c1eac5",
        tagTextColor: "#38763e"
    },
    {
        id: 5,
        tagName: "PR",
        tagColor: "#fff3c4",
        tagTextColor: "#745e08"
    },
    {
        id: 6,
        tagName: "Mål",
        tagColor: "#ffd0b5",
        tagTextColor: "#7e3105"
    },
    {
        id: 7,
        tagName: "Innhold",
        tagColor: "#d1eefc",
        tagTextColor: "#13506e"
    }
];

let getTagContainer = document.getElementById("tag-container");

//For loop to traverse through the array
for(i = 1; i<tags.length; i++){
    let createTagDiv = document.createElement("div");
    let createTag = document.createElement("span");
    let createTagName = document.createElement("span");

    createTagDiv.className = "tag-div";
    createTagName.className = "tag-name";
    createTagName.innerHTML = tags[i].tagName;
    
    
    createTag.setAttribute("style", "background-color: " + tags[i].tagColor + ";");
    createTag.className = "mini-tag";
    getTagContainer.appendChild(createTagDiv);
    createTagDiv.appendChild(createTag);
    createTagDiv.appendChild(createTagName);
}