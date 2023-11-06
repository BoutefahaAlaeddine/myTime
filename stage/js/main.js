//select Elements

let tabs = document.querySelectorAll(".skills .tabs li");
let skill = document.querySelectorAll(".skills .customScroll");

let percent = document.querySelector(".mySkills .statistics .percent span");
let numberOfSkills = document.querySelector(".mySkills .statistics h3");
let allSkills = document.querySelectorAll(".mySkills .skills .skill input");

let theCanvas = document.getElementById("ourCanvas");

let percentCircle = document.querySelector(
  ".mySkills .statistics .percent-circle"
);

//Variables
let totalChecked = 0;
let arrIndexOfSkills = [];
let counterSkillCat = 0;

//change tabs
Array.from(tabs).forEach((ele) => {
  ele.addEventListener("click", function (e) {
    Array.from(tabs).forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    Array.from(skill).forEach((div) => {
      div.style.display = "none";
    });
    document.querySelector(e.currentTarget.dataset.skill).style.display =
      "grid";
  });
});

// Show percentages for categories
document.body.addEventListener("click", (e) => {
  if (e.target.classList.item(0) == "more") {
    e.target.classList.toggle("open");
    e.target.classList.toggle("close");

    if (e.target.classList[1] == "open") {
      percentCircle.style.display = "flex";
      e.target.textContent = "اقل...";
    } else {
      percentCircle.style.display = "none";
      e.target.textContent = "المزيد...";
    }
  }
});

//Fetch skill percentage from Local Storage
let skillChecked = localStorage.getItem("skillChecked");
if (skillChecked !== null) {
  if (skillChecked !== "") {
    arrIndexOfSkills = localStorage.getItem("skillChecked").split(",");
    totalChecked = 0;
    arrIndexOfSkills.forEach((element) => {
      allSkills[parseInt(element)].checked = true;
      totalSkill(allSkills[element]);
      counterSkillCat = 0;
      categoryPercent(allSkills[element]);
    });
  }
}

//Change the proportions when assigning to skills
allSkills.forEach(function (ele) {
  ele.addEventListener("change", (e) => {
    //النسبة الاجمالية
    totalSkill(e.target);

    //نسبة كل فئة
    categoryPercent(e.target);

    //حفض التغيرات
    saveChange(e.target);
  });
});

//Total percentage
function totalSkill(select) {
  select.checked ? totalChecked++ : totalChecked--;

  percent.style = `width:${(totalChecked * 100) / allSkills.length}%`;

  numberOfSkills.textContent = `${parseInt(
    (totalChecked * 100) / allSkills.length
  )}%`;
}

// Percentage for each category
function categoryPercent(select) {
  className = select.parentElement.parentElement.classList[0];

  counterSkillCat = 0;

  let inputs = document.querySelectorAll("." + className + " input");

  inputs.forEach((element) => {
    element.checked ? counterSkillCat++ : "";
  });

  percentNumber = parseInt((counterSkillCat * 100) / inputs.length) + "%";
  document.querySelector(
    ".percent-circle #" + className
  ).style.backgroundImage = `linear-gradient(to left,
    #f4a460 ${percentNumber},
    #fff ${percentNumber}
  )`;

  document.querySelector(
    ".percent-circle #" + className + " .child span"
  ).textContent = percentNumber;
}

// Save percentages in Local Storage
function saveChange(select) {
  let targetIndex = [...allSkills].indexOf(select).toString();
  console.log(targetIndex);
  select.checked
    ? arrIndexOfSkills.push(targetIndex)
    : (arrIndexOfSkills = arrIndexOfSkills.filter(
        (item) => item !== targetIndex
      ));
  localStorage.setItem("skillChecked", arrIndexOfSkills);
}
