var currentTab = 0;
document.addEventListener("DOMContentLoaded", function () {
  showTab(currentTab);
});
function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n);
}
function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab == 2) {
    var book_count = document.getElementById("book_count");
    book_count = Number(book_count.options[book_count.selectedIndex].value);
    var book_count_tab = document.getElementsByClassName("book_count_tab")[0];
    var headerDiv = document.createElement("div");
    headerDiv.style.display = "flex";
    headerDiv.style.width = "100%";
    headerDiv.style.justifyContent = "space-around";
    var spanText = ["Name", "Genre", "Price"];
    for (var i = 0; i < 3; i++) {
      var spanNode = document.createElement("span");
      spanNode.innerText = spanText[i];
      spanNode.style.fontSize = "1.5rem";
      spanNode.style.fontWeight = "500";
      headerDiv.append(spanNode);
    }
    book_count_tab.appendChild(headerDiv);
    for (i = 0; i < book_count; i++) {
      generateNode(i, book_count_tab);
    }
  } else {
    var book_count_tab = document.getElementsByClassName("book_count_tab")[0];
    while (book_count_tab.firstChild) {
      book_count_tab.removeChild(book_count_tab.lastChild);
    }
  }
  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

var genre = [
  "Fantacy",
  "Science_Fiction",
  "Action",
  "Romance",
  "Horror",
  "History",
  "Others",
];

function generateNode(i, node) {
  var mainNode = document.createElement("div");
  var inputNode = document.createElement("input");
  mainNode.className += "book_details_div";
  mainNode.style.padding = "0.5rem";
  inputNode.placeholder = "Enter book name";
  inputNode.name = `book_name${i}`;
  inputNode.oninput = "this.className=''";
  inputNode.style.height += "1.5rem";
  var selectNode = document.createElement("select");
  var defaultOpt = document.createElement("option");
  defaultOpt.disabled = true;
  defaultOpt.selected = true;
  defaultOpt.value = "default";
  defaultOpt.innerText = "Select book genre";
  selectNode.add(defaultOpt);
  for (var index in genre) {
    var opt = document.createElement("option");
    opt.value = genre[index].toLowerCase();
    opt.innerHTML = genre[index];
    selectNode.appendChild(opt);
  }
  selectNode.name = `book_genre_${i}`;
  selectNode.id = `book_genre_${i}`;
  selectNode.style.height = "auto";
  selectNode.placeholder = "Select book genre";
  var secondInputNode = document.createElement("input");
  secondInputNode.name = `book_price_${i}`;
  secondInputNode.id = `book_price_${i}`;
  secondInputNode.type = "number";

  mainNode.appendChild(inputNode);
  mainNode.appendChild(selectNode);
  mainNode.appendChild(secondInputNode);

  node.append(mainNode);
}
