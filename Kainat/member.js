let members = [
    {
        id: 1,
        memberFullName: "Daniel Kjellid",
        memberInitials: "DK"
    },
    {
        id: 2,
        memberFullName: "Kainat Zahoor",
        memberInitials: "KZ"
    },
    {
        id: 3,
        memberFullName: "Linnea S. Fylling",
        memberInitials: "LF"
    },
    {
        id: 4,
        memberFullName: "Magomed Derbtichev",
        memberInitials: "MD"
    },
    {
        id: 5,
        memberFullName: "Sultan Khan",
        memberInitials: "SK"
    }
];

let getMemberContainer = document.getElementById("member-container");

for(i = 0; i < members.length; i++){
  let createMemberDiv = document.createElement("div");
  let createMemberInt = document.createElement("span");
  let createMemberName = document.createElement("span");
  
  createMemberDiv.className = "member-div";
  createMemberInt.className = "mini-member-tags";
  createMemberInt.innerHTML = members[i].memberInitials;
  createMemberName.className = "member-name";
  createMemberName.innerHTML = members[i].memberFullName;
  
  getMemberContainer.appendChild(createMemberDiv);
  createMemberDiv.appendChild(createMemberInt);
  createMemberDiv.appendChild(createMemberName);
}
