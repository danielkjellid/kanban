//data structure for existing tags
let tags = [
    {
        id: 1,
        tagName: "Plan",
        tagColor: "#dac4ff",
        tagTextColor: "#3a106b"
    },
    {
        id: 2,
        tagName: "Activity",
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
        tagName: "Campaign",
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
        tagName: "Goal",
        tagColor: "#ffd0b5",
        tagTextColor: "#7e3105"
    },
    {
        id: 7,
        tagName: "Content",
        tagColor: "#d1eefc",
        tagTextColor: "#13506e"
    }
];

//function to list tags in the front overeview
function listTagsOverview() {
    let getTagContainer = document.getElementById("tag-container");

    //For loop to traverse through the array
    for(var i = 0; i < tags.length; i++){
        let createTagDiv = document.createElement("div");
        let createTag = document.createElement("span");
        let createTagName = document.createElement("span");

        //set classnames and innerHTML
        createTagDiv.className = "tag-div";
        createTagName.className = "tag-name";
        createTagName.innerHTML = tags[i].tagName;

        //add atributes to make it WCAG
        createTagName.setAttribute("tabindex", "0");
        createTagName.setAttribute("aria-label", "Workflow: " + tags[i].tagName);
        
        createTag.setAttribute("style", "background-color: " + tags[i].tagColor + ";");
        createTag.className = "mini-tag-tag-list";

        getTagContainer.appendChild(createTagDiv);
        createTagDiv.appendChild(createTag);
        createTagDiv.appendChild(createTagName);
    }
}

//function for adding tagslist into the selector when adding tasks
function listTagsNewSelect() {
    
    //get select in add-new-modal
    let getSelect = document.getElementById("modal-add-new-task-tag");

    //travrese through array
    for (var i = 0; i < tags.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "tag-" + tags[i].tagName.toLowerCase();
        createOption.innerHTML = tags[i].tagName;

        getSelect.appendChild(createOption);
    }
}

//function for adding tagslist into the selector when editing existing tasks
function listTagsEditSelect() {
    
    //get select in edit-modal
    let getSelect = document.getElementById("modal-edit-task-tag");

    //traverese through array
    for (var i = 0; i < tags.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "edit-tag-" + tags[i].tagName.toLowerCase();
        createOption.innerHTML = tags[i].tagName;

        getSelect.appendChild(createOption);
    }
}

//function for adding new tags to the array
function addNewTag() {
    let newTag = document.getElementById("modal-add-new-tag").value;
    let newColorTag = document.getElementById("modal-add-new-color-tag").value;
    let newTextColorTag = document.getElementById("modal-add-new-textcolor-tag").value;

    //adding input values to array
    tags.push({
        Id: tags.length+1, 
        tagName: newTag, 
        tagColor: newColorTag, 
        tagTextColor: newTextColorTag
    });

    //delete overview list, before recreating it to not get the list twice.
    deleteTagListOverview();
    listTagsOverview();
}

//variables to prevent default reload after tag is added to array. Handleform is defined in utils.js
let tagForm = document.getElementById("add-new-member");

tagForm.addEventListener('submit', handleForm);