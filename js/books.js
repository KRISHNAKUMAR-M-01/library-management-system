"use strict";

//Book data
const BOOKS = [
  {
    title: "Database System Concepts",
    author: "Silberschatz",
    dept: "cs",
    file: "database-system-concepts.pdf",
    cover: "database-system-concepts.png",
  },
  {
    title: "Computer Networks",
    author: "Tanenbaum",
    dept: "cs",
    file: "computer-networks.pdf",
  },
  {
    title: "Introduction to Algorithms",
    author: "Cormen",
    dept: "cs",
    file: "introduction-to-algorithms.pdf",
  },
  {
    title: "Electronic Devices and Circuits",
    author: "Boylestad",
    dept: "ece",
    file: "electronic-devices-circuits.pdf",
  },
  {
    title: "Digital Design",
    author: "Morris Mano",
    dept: "ece",
    file: "digital-design.pdf",
  },
  {
    title: "Signals and Systems",
    author: "Oppenheim",
    dept: "ece",
    file: "signals-and-systems.pdf",
  },
  {
    title: "Engineering Thermodynamics",
    author: "P.K. Nag",
    dept: "mech",
    file: "engineering-thermodynamics.pdf",
  },
  {
    title: "Theory of Machines",
    author: "S.S. Rattan",
    dept: "mech",
    file: "theory-of-machines.pdf",
  },
  {
    title: "Fluid Mechanics",
    author: "R.K. Bansal",
    dept: "mech",
    file: "fluid-mechanics.pdf",
  },
  {
    title: "Structural Analysis",
    author: "R.C. Hibbeler",
    dept: "civil",
    file: "structural-analysis.pdf",
  },
  {
    title: "Soil Mechanics and Foundations",
    author: "B.C. Punmia",
    dept: "civil",
    file: "soil-mechanics.pdf",
  },
  {
    title: "Surveying",
    author: "N.N. Basak",
    dept: "civil",
    file: "surveying.pdf",
  },
];

//Department data
const DEPARTMENTS = [
  { key: "cs", name: "Computer Science" },
  { key: "ece", name: "Electronics" },
  { key: "mech", name: "Mechanical" },
  { key: "civil", name: "Civil" },
];

let activeDepartment = "all";
let searchText = "";

//Render department tabs dynamically
function renderTabs() {
  const tabs = [{ key: "all", name: "All" }].concat(DEPARTMENTS);
  const tabList = document.getElementById("departmentTabs");

  tabList.innerHTML = tabs
    .map(function (tab) {
      const activeClass = tab.key === activeDepartment ? "active" : "";
      return `<li class="nav-item">
      <button class="nav-link ${activeClass}" data-dept="${tab.key}">${tab.name}</button>
    </li>`;
    })
    .join("");
}

//Build book cards and append to the container
function createBookCard(book) {
  return `
    <div class="col-sm-6 col-lg-4 col-xl-3">
      <a class="book-card dept-${book.dept}" href="books/${book.file}" target="_blank" rel="noopener">
        <div class="book-cover">
          ${book.title}
          <img src="images/${book.cover}" alt="Cover of ${book.title}" onerror="this.remove()">
        </div>
        <div class="p-3">
          <h3 class="h6 mb-1">${book.title}</h3>
          <p class="small text-muted mb-2">${book.author}</p>
          <span class="read-link">Open PDF</span>
        </div>
      </a>
    </div>`;
}

//Show all books in the container
function renderBooks() {
  const visibleBooks = BOOKS.filter(function (book) {
    const matchesDept =
      activeDepartment === "all" || book.dept === activeDepartment;
    const matchesSearch = book.title.toLowerCase().includes(searchText);
    return matchesDept && matchesSearch;
  });

  const grid = document.getElementById("bookGrid");

  if (visibleBooks.length === 0) {
    grid.innerHTML =
      '<p class="text-muted">No books match your search. Try another title or department.</p>';
    return;
  }

  grid.innerHTML = visibleBooks.map(createBookCard).join("");
}

//Handle tab click event to filter books by department
function handleTabClick(event) {
  const button = event.target.closest("button[data-dept]");

  if (!button) {
    return;
  }

  activeDepartment = button.dataset.dept;
  renderTabs();
  renderBooks();
}

//Handle search input to filter books by title
function handleSearch(event) {
  searchText = event.target.value.trim().toLowerCase();
  renderBooks();
}

//Initialize the page by rendering tabs and books, and setting up event listeners
function init() {
  document
    .getElementById("departmentTabs")
    .addEventListener("click", handleTabClick);
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  renderTabs();
  renderBooks();
}

document.addEventListener("DOMContentLoaded", init);
